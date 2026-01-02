import { User } from "@prisma/client";
import { toast } from "sonner";
import { create } from "zustand";

import { activateAccount } from "@/actions/index";
import { showErrorMessage } from "@/utils/showErrorMessage";

type UserManagementState = {
  users: User[];
  originalUsers: User[];
};

type UserManagementActions = {
  setUsers: (users: User[]) => void;
  applyOptimisticUpdate: (userId: User["id"], newUserData: Partial<User>) => void;
  rollback: () => void;
  handleActiveAccount: (userId: User["id"], isActive: boolean) => Promise<void>;
  reset: () => void;
};

type UserManagementStore = UserManagementState & UserManagementActions;

const initialState: UserManagementState = {
  users: [],
  originalUsers: [],
};

export const useUserManagementStore = create<UserManagementStore>((set, get) => ({
  ...initialState,

  setUsers: (users) =>
    set({
      users,
      originalUsers: users,
    }),

  applyOptimisticUpdate: (userId, newUserData) =>
    set((state) => ({
      originalUsers: state.users,
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...newUserData } : user
      ),
    })),

  rollback: () =>
    set((state) => ({
      users: state.originalUsers,
    })),

  handleActiveAccount: async (userId, isActive) => {
    const { applyOptimisticUpdate, rollback } = get();

    applyOptimisticUpdate(userId, { isActive });

    const error = await activateAccount(userId, isActive);
    if (error) {
      rollback();
      showErrorMessage(error);
      return;
    }

    const successMessage = isActive
      ? "Account activated successfully"
      : "Account deactivated successfully";
    toast.success(successMessage);
  },

  reset: () => set(initialState),
}));
