import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import users from "@/models/user";
import cloudinary from "@/lib/cloudinary";
import crypto from "crypto";
import { sendEmail } from "@/helper/mail";
import {generateToken} from '@/helper/generateToken'
import { cookieCheck } from "@/helper/cookieCheck";


export async function POST(req) {
   const isAuthenticated = await cookieCheck(req);

   if (!isAuthenticated) {
     // Redirect to login if the cookie is not valid
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image"); // Image should be a file

    if (!name || !email || !password || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "12",
    });
    const publicId = uploadResponse.public_id;
    // verifyTokenExpiry 6 hours
    const verifyTokenExpiry = new Date(Date.now() + 6 * 60 * 60 * 1000);

    // create verify token
    const verifyToken = await generateToken(email);
    //send email
    try {
      await sendEmail(email, verifyToken, "verify");
      console.log("Mail sent successfully");
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Error sending email" },
        { status: 500 }
      );
    }
    await connectToDatabase();

    const user = await users.create({
      name,
      email,
      password,
      image: publicId,
      verifyToken,
      verifyTokenExpiry,
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error uploading image" }, { status: 500 });
  }
}
