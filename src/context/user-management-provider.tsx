"use client";

import { User } from "@prisma/client";
import { createContext, useOptimistic } from "react";
import { toast } from "sonner";

import { activateAccount } from "@/actions/index";
import { showErrorMessage } from "@/utils/showErrorMessage";

type UserManagementProviderProps = {
  data: User[];
  children: React.ReactNode;
};

type TUserManagementContext = {
  users: User[];
  handleActiveAccount: (userId: User["id"], isActive: boolean) => Promise<void>;
};

export const UserManagementContext =
  createContext<TUserManagementContext | null>(null);

const UserManagementProvider = ({
  data,
  children,
}: UserManagementProviderProps) => {
  const [optimisticUsers, setOptimisticUsers] = useOptimistic(
    data,
    (prev, { action, payload }) => {
      if (action === "edit") {
        return prev.map((user) => {
          if (user.id === payload.id) {
            return { ...user, ...payload.newUserData };
          }
          return user;
        });
      }
      return prev;
    }
  );

  const handleActiveAccount = async (userId: User["id"], isActive: boolean) => {
    setOptimisticUsers({ action: "edit", payload: { id: userId, isActive } });
    const error = await activateAccount(userId, isActive);
    if (!!error) {
      showErrorMessage(error)
      return;
    }
    const successMessage = isActive
      ? "Account activated successfully"
      : "Account deactivated successfully";
    toast.success(successMessage);
  };

  return (
    <UserManagementContext.Provider
      value={{
        users: optimisticUsers,
        handleActiveAccount,
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
};

export default UserManagementProvider;
