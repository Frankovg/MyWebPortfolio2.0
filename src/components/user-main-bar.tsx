'use client'

import Link from "next/link"
import LanguageSelector from "./language-selector"
import { cn } from "@/lib/utils"
import { useTransition } from "react"
import { logOut } from "@/actions/actions"
import { UserSession } from "@/lib/types"

type UserMainBarContentProps = {
  isLogged: boolean
  isAdmin: boolean
}

type UserMainBarProps = {
  session: UserSession
}

const LogOutOverlay = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-background z-50 opacity-[0.98] animate-fadeIn">
      <div className="w-full h-full flex items-center justify-center text-whiteText">
        <p className="text-5xl font-semibold animate-slideUp">
          Good Bye!
        </p>
      </div>
    </div>
  )
}

const LanguageSelectorContainer = () => {
  return (
    <>
      <LanguageSelector />
      <span>|</span>
    </>
  )
}

const UserMainBarContent = ({ isLogged, isAdmin }: UserMainBarContentProps) => {
  const [isPending, startTransition] = useTransition()

  const hoverStyle = 'hover:underline'
  const wrapperStyle = 'space-x-2.5 flex'

  if (!isLogged) {
    return (
      <div className={wrapperStyle}>
        <LanguageSelectorContainer />
        <Link href='/login' className={hoverStyle}>
          <span>Login</span>
        </Link>
      </div>
    )
  }

  const message = isAdmin ? 'Welcome back! You have admin access.' : 'Welcome! This is a demo account with restricted access.'

  return (
    <>
      {isPending && <LogOutOverlay />}
      <p>{message}</p>
      <div className={wrapperStyle}>
        <LanguageSelectorContainer />
        <Link href='/admin' className={hoverStyle} >
          <span>Admin</span>
        </Link>
        <button
          className={hoverStyle}
          onClick={async () => {
            startTransition(async () => {
              await logOut()
            })
          }}
        >
          <span>Logout</span>
        </button>
      </div>
    </>
  )
}

function UserMainBar({ session }: UserMainBarProps) {
  const user = session?.user

  const isLogged = !!user
  const isAdmin = user?.isAdmin ?? false
  const styles = isLogged ? 'bg-primary text-darkPrimary' : 'bg-transparent text-whiteText'
  console.log("isLogged", isLogged);

  return (
    <div className={cn("absolute top-0 w-screen h-6 z-50 flex items-center", styles)}>
      <div className={cn("flex items-center w-full max-w-fa mx-auto pl-4 pr-6", isLogged ? 'justify-between' : 'justify-end')}>
        <UserMainBarContent isLogged={isLogged} isAdmin={isAdmin} />
      </div>
    </div>
  )
}

export default UserMainBar