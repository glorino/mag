import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount, email, name, phone, items, address } = await request.json();

    if (!amount || !email || !name || !items || !address) {
      return NextResponse.json(
        { error: "Amount, email, name, items, and address are required" },
        { status: 400 }
      );
    }

    const flutterwaveSecret = process.env.FLWSECK;

    const txRef = `magre-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${flutterwaveSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: txRef,
        amount,
        currency: "NGN",
        redirect_url: `${request.headers.get("origin") || "http://localhost:3000"}/checkout/verify`,
        customer: {
          email,
          name,
          phonenumber: phone || "",
        },
        customizations: {
          title: "MAGRE Store",
          description: `Payment for ${items.length} item(s)`,
          logo: "",
        },
        meta: {
          items: JSON.stringify(items),
          address,
        },
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({ url: data.data.link, tx_ref: txRef });
    }

    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Payment init error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
