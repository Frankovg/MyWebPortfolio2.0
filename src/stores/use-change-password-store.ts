"use client";

import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "sonner";
import { create } from "zustand";

import { changePassword } from "@/actions/index";
import { TChangePasswordForm } from "@/lib/validations";
import { showErrorMessage } from "@/utils/showErrorMessage";

type ChangePasswordState = {
  isPending: boolean;
  register: UseFormRegister<TChangePasswordForm> | null;
  control: Control<TChangePasswordForm> | null;
  errors: FieldErrors<TChangePasswordForm>;
  watch: UseFormWatch<TChangePasswordForm> | null;
  getValues: UseFormGetValues<TChangePasswordForm> | null;
  trigger: UseFormTrigger<TChangePasswordForm> | null;
};

type ChangePasswordActions = {
  setIsPending: (isPending: boolean) => void;
  setFormMethods: (methods: {
    register: UseFormRegister<TChangePasswordForm>;
    control: Control<TChangePasswordForm>;
    errors: FieldErrors<TChangePasswordForm>;
    watch: UseFormWatch<TChangePasswordForm>;
    getValues: UseFormGetValues<TChangePasswordForm>;
    trigger: UseFormTrigger<TChangePasswordForm>;
  }) => void;
  setErrors: (errors: FieldErrors<TChangePasswordForm>) => void;
  onSubmit: () => Promise<void>;
  reset: () => void;
};

type ChangePasswordStore = ChangePasswordState & ChangePasswordActions;

const initialState: ChangePasswordState = {
  isPending: false,
  register: null,
  control: null,
  errors: {},
  watch: null,
  getValues: null,
  trigger: null,
};

export const useChangePasswordStore = create<ChangePasswordStore>(
  (set, get) => ({
    ...initialState,

    setIsPending: (isPending) => set({ isPending }),

    setFormMethods: (methods) =>
      set({
        register: methods.register,
        control: methods.control,
        errors: methods.errors,
        watch: methods.watch,
        getValues: methods.getValues,
        trigger: methods.trigger,
      }),

    setErrors: (errors) => set({ errors }),

    onSubmit: async () => {
      const { trigger, getValues } = get();

      if (!trigger || !getValues) {
        if (process.env.NODE_ENV === "development") {
          console.error("Form methods not initialized");
        }
        return;
      }

      set({ isPending: true });

      try {
        const result = await trigger();
        if (!result) {
          const errorMessage =
            "Form validation failed. Please check the highlighted fields and try again.";
          toast.error(errorMessage);
          console.warn(errorMessage);
          return;
        }

        const passwordValues = getValues();
        if (passwordValues.password === passwordValues.confirmPassword) {
          const error = await changePassword(passwordValues);
          if (error) {
            showErrorMessage(error);
            return;
          }
          toast.success("Password changed successfully");
        } else {
          toast.error("Passwords do not match");
          console.warn("Passwords do not match");
        }
      } finally {
        set({ isPending: false });
      }
    },

    reset: () => set(initialState),
  })
);
