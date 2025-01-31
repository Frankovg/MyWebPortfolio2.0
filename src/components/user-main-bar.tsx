'use client'

import { useTransition } from "react"
import Link from "next/link"

//Utils
import { cn } from "@/lib/utils"

//Actions
import { logOut } from "@/actions/actions"

//Hooks
import { UserSession } from "@/lib/types"

//Components
import LanguageSelector from "./language-selector"
import LogOutOverlay from "./logout-overlay"

type UserMainBarContentProps = {
  isLogged: boolean
  isAdmin: boolean
}

type UserMainBarProps = {
  session: UserSession
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
  const mobileMessage = isAdmin ? 'Admin access.' : 'Demo account'

  return (
    <>
      {isPending && <LogOutOverlay />}
      <p
        data-mobile={mobileMessage}
        data-desktop={message}
        className="before:content-[attr(data-mobile)] md:before:content-none md:before:hidden md:after:content-[attr(data-desktop)] before:block after:hidden md:after:block"
      />
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

  return (
    <div className={cn("absolute top-0 w-screen h-6 z-50 flex items-center", styles)}>
      <div className={cn("flex items-center w-full max-w-fa mx-auto pl-4 pr-6", isLogged ? 'justify-between' : 'justify-end')}>
        <UserMainBarContent isLogged={isLogged} isAdmin={isAdmin} />
      </div>
    </div>
  )
}

export default UserMainBar