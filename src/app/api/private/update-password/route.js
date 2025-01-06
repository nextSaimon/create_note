import {NextResponse} from 'next/server'
import {auth} from '@/auth'
import { connectToDatabase } from "@/lib/db";
import users from "@/models/user";
import { cookieCheck } from "@/helper/cookieCheck";

export async function POST(req) {
     const isAuthenticated = await cookieCheck(req);

     if (!isAuthenticated) {
       // Redirect to login if the cookie is not valid
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
    // get session
    const session=await auth()
    if(!session){
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const email=session.user.email;
    const {oldPassword, password, confirmPassword} = await req.json();
    if(password!==confirmPassword){
        return NextResponse.json({error:"Passwords do not match"},{status:400})
    }
    connectToDatabase();
    const user=await users.findOne({email});
    if(!user){
        return NextResponse.json({error:"User not found"},{status:404})
    }
    if(user.password!==oldPassword){
        return NextResponse.json({error:"Old password is incorrect"},{status:400})
    }
  
    user.password=password;
    await user.save();
    return NextResponse.json({message:"hello"})
}