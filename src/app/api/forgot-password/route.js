import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";
import crypto from "crypto";
import { sendEmail } from "@/helper/mail";
import { generateToken } from "@/helper/generateToken";
import { cookieCheck } from "@/helper/cookieCheck";

export async function POST(req) {
   const isAuthenticated = await cookieCheck(req);

   if (!isAuthenticated) {
     // Redirect to login if the cookie is not valid
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
  const { email } = await req.json();

  // Log the email for debugging
  console.log(email);

  // Connect to the database
  await connectToDatabase();

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found");
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  // Check if the user is verified
  if (!user.isVerified) {
    return NextResponse.json({ error: "User not verified" }, { status: 400 });
  }

  // Generate a token and set expiry for the password reset link
  const forgotPasswordTokenExpiry = new Date(Date.now() + 6 * 60 * 60 * 1000); // 6 hours
  const forgotPasswordToken = await generateToken(email);

  // Save the token and expiry date to the user
  user.forgotPasswordToken = forgotPasswordToken;
  user.forgotPasswordTokenExpiry = forgotPasswordTokenExpiry;
  await user.save();

  // Send the reset password email (you need to define this function in your helper)
  await sendEmail(email, forgotPasswordToken, "forgotPassword");

  // Return success response
  return NextResponse.json({ message: "Password reset email sent" });
}
