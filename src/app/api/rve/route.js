// /api/rve/route.js

import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";
import { generateToken } from "@/helper/generateToken";
import { sendEmail } from "@/helper/mail";


export async function POST(req) {
  const { email } = await req.json();
  console.log(email);
  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User is not registered" }, { status: 404 });
  }
  if (user.isVerified) {
    return NextResponse.json({ error: "User is already verified" }, { status: 400 });
  }
  const verifyTokenExpiry = new Date(Date.now() + 6 * 60 * 60 * 1000);
  const verifyToken = user.verifyToken|| await generateToken(email);
  user.verifyTokenExpiry = verifyTokenExpiry;
  await user.save();
  await sendEmail(email, verifyToken, "verify");
  return NextResponse.json({ message: "Email sent" });
}
