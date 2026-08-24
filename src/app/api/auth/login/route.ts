import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/queries";
import { comparePassword, generateToken } from "@/lib/auth";
import { getUserCart, saveUserCart } from "@/lib/queries";

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  image: string;
  quantity: number;
  size?: string;
}

export async function POST(request: Request) {
  try {
    const { email, password, cart } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
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
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Merge carts: if user has a saved cart and anonymous cart is provided, merge them
    let mergedCart: CartItem[] = [];
    if (cart && Array.isArray(cart) && cart.length > 0) {
      const savedCart = await getUserCart(user.id);
      const savedMap = new Map(savedCart.map((item: CartItem) => [`${item.id}-${item.size || ''}`, item]));
      
      for (const item of cart as CartItem[]) {
        const key = `${item.id}-${item.size || ''}`;
        if (savedMap.has(key)) {
          // Merge quantities
          const savedItem = savedMap.get(key)!;
          savedItem.quantity += item.quantity;
        } else {
          savedMap.set(key, { ...item });
        }
      }
      mergedCart = Array.from(savedMap.values());
      await saveUserCart(user.id, mergedCart);
    }

    const token = await generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
        created_at: user.created_at,
      },
      cart: mergedCart,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to login. Please try again." },
      { status: 500 }
    );
  }
}
