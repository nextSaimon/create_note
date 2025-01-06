import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import notes from "@/models/note";

//delete note api
export async function DELETE(req, { params }) { 
    const  id  = params.id;
    await connectToDatabase();
    const note = await notes.findOneAndDelete({ _id: id });
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    console.log("Note deleted successfully");
    
    return NextResponse.json({ message: "Note deleted successfully" });
}