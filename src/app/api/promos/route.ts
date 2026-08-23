import { NextResponse } from "next/server";
import getSql from "@/lib/database";

export async function POST(request: Request) {
  try {
    const { code, orderAmount } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Promo code is required" }, { status: 400 });
    }

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
      WHERE code = ${code.toUpperCase()} AND is_active = true
    `;

    if (!promo) {
      return NextResponse.json({ error: "Invalid promo code" }, { status: 400 });
    }

    if (promo.expires_at && new Date(promo.expires_at) < new Date()) {
      return NextResponse.json({ error: "This promo code has expired" }, { status: 400 });
    }

    if (promo.max_uses && promo.used_count >= promo.max_uses) {
      return NextResponse.json({ error: "This promo code has been fully redeemed" }, { status: 400 });
    }

    if (orderAmount && Number(promo.min_order_amount) > orderAmount) {
      return NextResponse.json(
        { error: `Minimum order amount is ₦${Number(promo.min_order_amount).toLocaleString()}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      code: promo.code,
      discountPercent: promo.discount_percent,
    });
  } catch {
    return NextResponse.json({ error: "Failed to validate promo code" }, { status: 500 });
  }
}
