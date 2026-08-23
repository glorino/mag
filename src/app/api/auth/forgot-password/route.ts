import { NextResponse } from "next/server";
import { findUserByEmail, createPasswordResetToken } from "@/lib/queries";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const users = await findUserByEmail(email);
    const user = users;

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists, a password reset link has been sent.",
      });
    }

    // Generate reset token
    const token = await createPasswordResetToken(user.id);
    
    // TODO: Send email with reset link using an email service (e.g., Resend, SendGrid)
    // const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.magre.com.ng"}/reset-password?token=${token}`;

    return NextResponse.json({
      success: true,
      message: "If an account exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}