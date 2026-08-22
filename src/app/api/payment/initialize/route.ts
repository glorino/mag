import { NextResponse } from "next/server";
import { getProductById } from "@/lib/queries";
import { getUserFromRequest } from "@/lib/auth";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { items, email, name, phone, address } = await request.json();

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
      const qty = item.quantity || 1;
      
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

    const flutterwaveSecret = process.env.FLWSECK;
    if (!flutterwaveSecret) {
      return NextResponse.json({ error: "Payment system not configured" }, { status: 500 });
    }

    // Generate unique tx_ref using UUID to prevent collision
    const txRef = `magre-${crypto.randomUUID()}`;
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://www.magre.com.ng";

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
        amount: serverTotal,
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
        },
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({ url: data.data.link, tx_ref: txRef, serverTotal });
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
