import { NextResponse } from "next/server";
import getSql from "@/lib/database";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    const sql = getSql();

    if (productId) {
      const reviews = await sql`
        SELECT r.*, u.name as user_name
        FROM reviews r
        LEFT JOIN users u ON r.user_id = u.id
        WHERE r.product_id = ${Number(productId)} AND r.is_approved = true
        ORDER BY r.created_at DESC
      `;
      return NextResponse.json(reviews);
    }

    const reviews = await sql`
      SELECT r.*, u.name as user_name, p.name as product_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN products p ON r.product_id = p.id
      ORDER BY r.created_at DESC
      LIMIT 50
    `;
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { productId, rating, comment } = await request.json();

    if (!productId || !rating) {
      return NextResponse.json({ error: "Product ID and rating are required" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const sql = getSql();
    let userId: number | null = null;
    let customerName = "Anonymous";

    const user = await getUserFromRequest(request);
    if (user) {
      userId = user.userId;
      const users = await sql`SELECT name FROM users WHERE id = ${user.userId}`;
      if (users.length > 0) customerName = users[0].name;
    }

    const [review] = await sql`
      INSERT INTO reviews (product_id, user_id, customer_name, rating, comment)
      VALUES (${productId}, ${userId}, ${customerName}, ${rating}, ${comment || ""})
      RETURNING *
    `;

    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
