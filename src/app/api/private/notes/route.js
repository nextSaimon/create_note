// /api/private/notes/route.js
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import User from '@/models/user' // Assuming your user model is named 'User'
import Notes from '@/models/note'
import { auth } from '@/auth'
export async function GET(req) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const id = session.user._id;
  try {
    // Connect to the database
    await connectToDatabase()
    const notes = await Notes.find({ user: id },'title description _id')

    return NextResponse.json( notes)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
