import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

// JWT oluşturmak için gizli anahtar binary formatında olmalıdır
// Bu anahtar, JWT'yi imzalamak için kullanılacak ve güvenli bir şekilde saklanmalıdır
// Gerçek uygulamalarda, bu anahtarın güvenli bir şekilde saklanması önemlidir
// Örneğin, bir çevresel değişken olarak saklanabilir

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "gizliAnahtar123");

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // JWT oluştur (JOSE ile)
  const token = await new SignJWT({ email,name:user.name })
  
    .setProtectedHeader({ alg: "HS512" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(JWT_SECRET);
      
  const response = NextResponse.json({ message: "Login successful", token }, { status: 200 });

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
