import { useContext } from "react";

import { ChangePasswordContext } from "@/context/change-password-provider";

export function useChangePasswordContext() {
  const context = useContext(ChangePasswordContext);

  if (!context) {
    throw new Error(
      "useChangePasswordContext must be used within a ChangePasswordProvider"
    );
  }

  return context;
}
