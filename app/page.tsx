'use client'
import { signOut, useSession } from "next-auth/react"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import loadingIcon from '@iconify/icons-line-md/loading-alt-loop';
import Image from "next/image";


export default function Home() {

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-24">
      {status === 'loading' && <Icon icon={loadingIcon} width={60} height={60} />}
      {session &&
        <div className="flex flex-col gap-4 shadow py-12 px-8 border rounded-lg">
          <div className="flex items-center justify-center gap-2">
            {
              session.user?.image &&
              <Image
                src={session.user.image} alt="avatar"
                width={60} height={60}
                className="rounded-full"
              />
            }
            <h3>
              {session.user?.name}
            </h3>
          </div>
          <h3>
            {session.user?.email}
          </h3>
          <button className="bg-rose-600 hover:opacity-80 px-4 py-2 text-white border rounded-lg" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      }
    </main>
  )
}
