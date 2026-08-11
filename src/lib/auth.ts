import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "magre-secret-key-2026"
);

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  address?: string;
  created_at: string;
}

export interface AuthPayload {
  userId: number;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function generateToken(payload: AuthPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AuthPayload;
  } catch {
    return null;
  }
}

export async function getUserFromRequest(
  request: Request
): Promise<AuthPayload | null> {
  const authHeader = request.headers.get("Authorization");
  let token: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  if (!token) {
    const cookieHeader = request.headers.get("Cookie") || "";
    const match = cookieHeader.match(/token=([^;]+)/);
    if (match) {
      token = match[1];
    }
  }

  if (!token) return null;
  return verifyToken(token);
}
