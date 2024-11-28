'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"

function UserMainBar() {
  const { data: session } = useSession()
  const user = session?.user

  const message = user?.isAdmin ? 'Welcome back! You have admin access.' : 'Welcome! This is a demo account with restricted access.'
  //TODO: Add a class for non logged users with the 'login' link
  //TODO: Add language button. Hide it until I have the translations
  return (
    <div className="absolute top-0 w-screen h-6 bg-primary z-50 flex items-center">
      <div className="text-darkPrimary flex items-center justify-between w-full max-w-fa mx-auto pl-4 pr-6">
        <p>{message}</p>
        <div className="space-x-2.5">
          <Link href='/admin' className="hover:underline" >
            <span>Admin</span>
          </Link>
          <button className="hover:underline">
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserMainBar