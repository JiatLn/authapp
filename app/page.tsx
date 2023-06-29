'use client'
import { signOut, useSession } from "next-auth/react"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {

  const { data: session, status } = useSession()
  const router = useRouter()

  function handleSignOut() {
    signOut()
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-24">
      {status === 'loading' && <p>Loading...</p>}
      {session &&
        <>
          <h3>
            {session.user?.email}
          </h3>
          <h3>
            {session.user?.name}
          </h3>
          <button className="bg-purple-600 hover:opacity-80 px-4 py-2 text-white border rounded-lg" onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      }
    </main>
  )
}
