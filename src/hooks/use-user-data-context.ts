import { UserDataContext } from "@/context/user-data-provider";
import { useContext } from "react";

export function useUserDataContext() {
  const context = useContext(UserDataContext)
  if (!context) {
    throw new Error('useUserDataContext must be used within a UserDataContextProvider')
  }

  return context
}