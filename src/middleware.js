import { NextResponse } from "next/server";
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from "./lib/routs";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const session = await auth();
  console.log(session);

  const isAuthenticated = !!session?.user;
  const { nextUrl } = request;

  // Check if user is authenticated
  const isPublicRoute = PUBLIC_ROUTES.find(
    (route) => route === nextUrl.pathname
  );

  // Set the cookie if not already set
  const cookie = request.cookies.get("__user__");
  const response = NextResponse.next();
  const token =
    "99318e5ef848336a82721f1625719f206aac86802e799468a61a8f9568ee9421";
  // If cookie is not set, set it
  if (!cookie) {
    response.cookies.set("__user__", token, {
      path: "/", // Make it available for all pages
      httpOnly: true, // Ensure it's only accessible from the server
      secure: process.env.NODE_ENV === "production", // Use secure flag in production
      maxAge: 60 * 60 * 24 * 30, // Set the expiry to 30 days
    });
    console.log("cookie set");
  }

  // Redirect if the user is not authenticated and is trying to access a private route
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Redirect if the user is authenticated but tries to access the sign-in or sign-up pages
  if (
    isAuthenticated &&
    (nextUrl.pathname === "/signup" ||
      nextUrl.pathname === "/signin" ||
      nextUrl.pathname === "/verify/:path*")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/signup", "/signin", "/api/private/:path*"],
};
