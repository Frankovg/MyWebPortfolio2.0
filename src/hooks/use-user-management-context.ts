

import { UserManagementContext } from "@/app/(admin)/admin/user-management/context/user-management-provider";
import { useContext } from "react";

export function useUserManagementContext() {
  const context = useContext(UserManagementContext)
  if (!context) {
    throw new Error('useUserManagementContext must be used within a useUserManagementProvider')
  }

  return context
}