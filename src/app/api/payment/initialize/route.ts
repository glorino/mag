import { NextResponse } from "next/server";
import { getProductById } from "@/lib/queries";
import { getUserFromRequest } from "@/lib/auth";
import getSql from "@/lib/database";
import { BUSINESS } from "@/lib/constants";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { items, email, name, phone, address, promoCode } = await request.json();

    if (!email || !name || !items?.length || !address) {
      return NextResponse.json(
        { error: "Email, name, items, and address are required" },
        { status: 400 }
      );
    }

    // Server-side price validation: recalculate total from DB
    let serverTotal = 0;
    const validatedItems = [];
    for (const item of items) {
      const product = await getProductById(item.id);
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
      }
      const qty = Number(item.quantity) || 1;
      if (!Number.isInteger(qty) || qty < 1) {
        return NextResponse.json({ error: `Invalid quantity for ${product.name}` }, { status: 400 });
      }
      
      // Stock validation
      const availableStock = product.stock || 0;
      if (qty > availableStock) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}. Available: ${availableStock}` },
          { status: 400 }
        );
      }
      
      serverTotal += Number(product.price) * qty;
      validatedItems.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: qty,
        size: item.size || "",
        color: item.color || "",
        category: product.category_name || "",
        image: product.image_url || "",
      });
    }

    // Server-side promo code validation and discount
    let discountAmount = 0;
    let appliedPromoCode = "";
    if (promoCode) {
      try {
        const sql = getSql();
        await sql`
          CREATE TABLE IF NOT EXISTS promo_codes (
            id SERIAL PRIMARY KEY,
            code VARCHAR(50) UNIQUE NOT NULL,
            discount_percent INT NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
            min_order_amount DECIMAL(10, 2) DEFAULT 0,
            max_uses INT DEFAULT NULL,
            used_count INT DEFAULT 0,
            expires_at TIMESTAMP,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW()
          )
        `;
        const [promo] = await sql`
          SELECT * FROM promo_codes
          WHERE code = ${promoCode.toUpperCase()} AND is_active = true
        `;
        if (promo) {
          const valid = !promo.expires_at || new Date(promo.expires_at) > new Date();
          const notExhausted = !promo.max_uses || promo.used_count < promo.max_uses;
          const minMet = !promo.min_order_amount || serverTotal >= Number(promo.min_order_amount);
          if (valid && notExhausted && minMet) {
            discountAmount = Math.round((serverTotal * Number(promo.discount_percent)) / 100);
            appliedPromoCode = promo.code;
          }
        }
      } catch {
        // promo validation failed silently — charge full price
      }
    }

    const finalTotal = serverTotal - discountAmount;

    const flutterwaveSecret = process.env.FLWSECK;
    if (!flutterwaveSecret) {
      return NextResponse.json({ error: "Payment system not configured" }, { status: 500 });
    }

    // Generate unique tx_ref using UUID to prevent collision
    const txRef = `magre-${crypto.randomUUID()}`;
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || BUSINESS.siteUrl;

    // Get user_id if logged in
    let userId: number | undefined;
    const authUser = await getUserFromRequest(request);
    if (authUser) userId = authUser.userId;

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${flutterwaveSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: txRef,
        amount: finalTotal,
        currency: "NGN",
        redirect_url: `${origin}/checkout/verify`,
        customer: {
          email,
          name,
          phonenumber: phone || "",
        },
        customizations: {
          title: "MAGRE Store",
          description: `Payment for ${validatedItems.length} item(s)`,
          logo: "",
        },
        meta: {
          items: JSON.stringify(validatedItems),
          address,
          user_id: userId || "",
          promo_code: appliedPromoCode,
          discount_amount: discountAmount,
          original_total: serverTotal,
        },
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({ url: data.data.link, tx_ref: txRef, serverTotal: finalTotal });
    }

    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
