import { NextResponse } from "next/server";
import { createOrder } from "@/lib/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get("transaction_id");

    if (!transactionId) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    const flutterwaveSecret = process.env.FLWSECK;

    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${flutterwaveSecret}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.status !== "success" || data.data.status !== "successful") {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }

    const txData = data.data;
    let items: unknown[] = [];
    let address = "";

    try {
      if (txData.meta?.items) {
        items = JSON.parse(txData.meta.items);
      }
      if (txData.meta?.address) {
        address = txData.meta.address;
      }
    } catch {
      // ignore parse errors
    }

    const order = await createOrder({
      customer_name: txData.customer?.name || "Unknown",
      email: txData.customer?.email || txData.customer?.email_address || "",
      phone: txData.customer?.phonenumber || "",
      address: address || "Not provided",
      items,
      total: txData.amount,
      payment_ref: transactionId,
      payment_status: "paid",
    });

    return NextResponse.json({
      success: true,
      order: order[0],
    });
  } catch (error) {
    console.error("Payment verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
