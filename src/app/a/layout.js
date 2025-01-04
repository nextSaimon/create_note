'use client';
 
import {  SessionProvider } from 'next-auth/react';
 
export default function RootLayout({ children }) {
  return (
    <SessionProvider>
    
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  
  
    </SessionProvider>
  );
}
