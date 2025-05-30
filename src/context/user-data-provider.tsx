"use client";

import { Download } from "@prisma/client";
import { createContext } from "react";

type UserDataContextProviderProps = {
  data: {
    userData: {
      downloads: Download[];
    };
  };
  children: React.ReactNode;
};

type TUserDataContext = {
  downloads: Download[];
};

export const UserDataContext = createContext<TUserDataContext | null>(null);

const UserDataContextProvider = ({
  data,
  children,
}: UserDataContextProviderProps) => {
  return (
    <UserDataContext.Provider
      value={{
        downloads: data.userData.downloads,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
