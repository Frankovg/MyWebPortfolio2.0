import { useContext } from "react";

import { UserManagementContext } from "@/context/user-management-provider";

export function useUserManagementContext() {
  const context = useContext(UserManagementContext);
  if (!context) {
    throw new Error(
      "useUserManagementContext must be used within a useUserManagementProvider"
    );
  }

  return context;
}
