import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";

export async function POST(request) {
    const { token } = await request.json(); // Destructure token directly
    console.log(token);
    await connectToDatabase();
    const user= await User.findOne({ verifyToken: token });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(user.email);
    return NextResponse.json({ email: user.email });
}
