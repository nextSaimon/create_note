import {NextResponse} from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
    const{password, confirmPassword, token} = await req.json();
    if (password !== confirmPassword) {
        return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }
    await connectToDatabase();
    const user = await User.findOne({ forgotPasswordToken: token });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    
  return NextResponse.json({ message: "Password reset successfully" });
    
}