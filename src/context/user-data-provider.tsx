'use client'

import { StaticImageData } from "next/image";
import { createContext, SVGProps } from "react"

type Download = {
  name: string;
  href: string | undefined;
  img: StaticImageData;
}

type UserDataContextProviderProps = {
  data: {
    downloads: Download[]
  },
  children: React.ReactNode,
}

type TUserDataContext = {
  downloads: Download[],
}

export const UserDataContext = createContext<TUserDataContext | null>(null)

const UserDataContextProvider = ({ data, children }: UserDataContextProviderProps) => {
  return (
    <UserDataContext.Provider value={{
      downloads: data.downloads,
    }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataContextProvider