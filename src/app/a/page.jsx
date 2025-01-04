'use client';
import { useState, useEffect } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
// import loading
import Loading from '@/app/loading';
export default function Page() {
   const  {data: session ,status }= useSession(); // Destructure session and status

  const [name, setUser] = useState(null);
  console.log({session,status});
  console.log(status);

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user.name);
    } else {
      setUser(null);
    }
  }, [session]);
 
  if (status === 'loading') {
    return <Loading />;
  }
  return (
    <div>
      {name ? <p>Welcome, {name}!</p> : <p>Welcome, Guest!</p>}
    </div>
    
  );
}
