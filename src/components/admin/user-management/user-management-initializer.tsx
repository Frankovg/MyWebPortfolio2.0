"use client";

import { User } from "@prisma/client";
import { useLayoutEffect, useRef } from "react";

import { useUserManagementStore } from "@/stores/use-user-management-store";

type UserManagementInitializerProps = {
  users: User[];
  children: React.ReactNode;
};

export function UserManagementInitializer({
  users,
  children,
}: UserManagementInitializerProps) {
  const isInitialized = useRef(false);
  const { setUsers, reset } = useUserManagementStore();

  useLayoutEffect(() => {
    if (!isInitialized.current) {
      setUsers(users);
      isInitialized.current = true;
    }

    return () => {
      reset();
      isInitialized.current = false;
    };
  }, [users, setUsers, reset]);

  if (!isInitialized.current) {
    return null;
  }

  return <>{children}</>;
}
