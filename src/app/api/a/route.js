import { NextResponse } from "next/server";

export async function POST(req) {
  const cookie = req.cookies.get("isBrowser");
  console.log("cookies",req.cookies);
  
//   if(!cookie) {
//     //redirect to login
//     return NextResponse.redirect(new URL("/signin", req.url));
//   }
  return NextResponse.json({ message: "hello", cookieName: cookie?.name||"null" });
}
