// api/verify/route.js
import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";
import { cookieCheck } from "@/helper/cookieCheck";

export async function POST(req) {
  const isAuthenticated = await cookieCheck(req);

  if (!isAuthenticated) {
    // Redirect to login if the cookie is not valid
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { token } = await req.json(); // Destructure token directly
  console.log(token);

  await connectToDatabase();
  const user = await User.findOne({ verifyToken: token });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.verifyTokenExpiry < new Date()) {
    return NextResponse.json({ message: "Token expired" }, { status: 400 });
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;
  console.log(user);
  await user.save();
  console.log("User verified");
  return NextResponse.json({ message: "User verified" });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  await connectToDatabase();
  const user = await User.findOne({ verifyToken: token });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ email: user.email });
}
