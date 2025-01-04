import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import User from '@/models/user' // Assuming your user model is named 'User'

export async function GET(req) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Fetch users with only name and email fields
    const users = await User.find({}, 'name email image password')
    console.log(users[0]);
    
    // Respond with the user data
    return NextResponse.json( {users} )
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
