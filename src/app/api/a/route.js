import { NextResponse } from "next/server";
import { cookieCheck } from "@/helper/cookieCheck";

export async function GET(req) {
  const isAuthenticated = await cookieCheck(req);

  if (!isAuthenticated) {
    // Redirect to login if the cookie is not valid
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Hello" });
}
