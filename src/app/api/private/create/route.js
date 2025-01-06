import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import users from "@/models/user";
import notes from "@/models/note";
import { cookieCheck } from "@/helper/cookieCheck";


export async function POST(req) {
   const isAuthenticated = await cookieCheck(req);

   if (!isAuthenticated) {
     // Redirect to login if the cookie is not valid
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
  const session = await auth();
  if (!session) {
    console.log("Unauthorized");

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.log("session", session);

  const email = session.user.email;
  const { title, description } = await req.json();
  console.log(title, description);

  if (!title || !description) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  await connectToDatabase();
  const user = await users.findOne({ email });
  console.log(user);

  const note = await notes.create({
    title,
    description,
    user: user._id,
  });
  console.log(note);

  return NextResponse.json({ note }, { status: 200 });
}
