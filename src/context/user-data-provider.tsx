'use client'

import { StaticImageData } from "next/image";
import { createContext } from "react"

type Social = {
  name: string;
  value: string,
  href?: string;
  alt: string;
  icon: JSX.Element;
}

type Download = {
  name: string;
  href: string | undefined;
  img: StaticImageData;
}

type UserDataContextProviderProps = {
  data: {
    socials: Social[],
    downloads: Download[]
  },
  children: React.ReactNode,
}

type TUserDataContext = {
  socials: Social[],
  downloads: Download[],
}

export const UserDataContext = createContext<TUserDataContext | null>(null)

const UserDataContextProvider = ({ data, children }: UserDataContextProviderProps) => {
  return (
    <UserDataContext.Provider value={{
      socials: data.socials,
      downloads: data.downloads,
    }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataContextProvider