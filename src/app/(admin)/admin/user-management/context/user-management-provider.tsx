'use client'

import { activateAccount } from "@/actions/actions"
import { User } from "@prisma/client"
import { createContext, useState } from "react"
import { useOptimistic } from "react"
import { toast } from "sonner"

type UserManagementProviderProps = {
  data: User[],
  children: React.ReactNode,
}

type TUserManagementContext = {
  users: User[],
  handleActiveAccount: (userId: User['id'], isActive: boolean) => Promise<void>
}

export const UserManagementContext = createContext<TUserManagementContext | null>(null)

const UserManagementProvider = ({ data, children }: UserManagementProviderProps) => {
  const [optimisticUsers, setOptimisticUsers] = useOptimistic(
    data,
    (prev, { action, payload }) => {
      if (action === "edit") {
        return prev.map(user => {
          if (user.id === payload.id) {
            return { ...user, ...payload.newUserData }
          }
          return user
        })
      }
      return prev
    }
  )

  const handleActiveAccount = async (userId: User['id'], isActive: boolean) => {
    setOptimisticUsers({ action: "edit", payload: { id: userId, isActive } })
    const error = await activateAccount(userId, isActive)
    if (error) {
      toast.warning(error.message)
      return
    }
  }

  return (
    <UserManagementContext.Provider value={{
      users: optimisticUsers,
      handleActiveAccount
    }}>
      {children}
    </UserManagementContext.Provider>
  )
}

export default UserManagementProvider
