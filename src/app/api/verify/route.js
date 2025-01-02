// api/verify/route.js
import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";


export async function POST(request) {
  const { token } = await request.json(); // Destructure token directly
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
