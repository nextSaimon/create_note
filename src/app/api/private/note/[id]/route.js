import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import notes from "@/models/note";
import { cookieCheck } from "@/helper/cookieCheck";

//delete note api
export async function DELETE(req, { params }) {
  const isAuthenticated = await cookieCheck(req);

  if (!isAuthenticated) {
    // Redirect to login if the cookie is not valid
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = params.id;
  await connectToDatabase();
  const note = await notes.findOneAndDelete({ _id: id });
  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }
  console.log("Note deleted successfully");

  return NextResponse.json({ message: "Note deleted successfully" });
}

//update note api
export async function PUT(req, { params }) {
  const isAuthenticated = await cookieCheck(req);

  if (!isAuthenticated) {
    // Redirect to login if the cookie is not valid
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = params.id;
  const { title, description } = await req.json();
  await connectToDatabase();
  const note = await notes.findOneAndUpdate(
    { _id: id },
    { title, description },
    { new: true }
  );
  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Note updated successfully" });
}
