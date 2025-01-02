import { NextResponse } from 'next/server'
import { PUBLIC_ROUTES } from './lib/routs'
import { authConfig } from './auth.config'
import NextAuth from 'next-auth'


const {auth}=NextAuth(authConfig)
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const session= await auth()
  console.log(session);
  
  const isAuthenticated=!!session?.user
  const {nextUrl}=request

  const isPublicRoute=PUBLIC_ROUTES.find(route=>route===nextUrl.pathname)
  if(!isAuthenticated && !isPublicRoute){
    return NextResponse.redirect(new URL('/signin',request.url))
  }
  if ( isAuthenticated && (nextUrl.pathname === '/signup' || nextUrl.pathname === '/signin'|| nextUrl.pathname === '/verify/:path*')) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}
 
export const config = {
  matcher: ['/',],
}