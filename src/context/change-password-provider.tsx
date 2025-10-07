"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, ReactNode, useTransition } from "react";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "sonner";

import {
  changePasswordFormSchema,
  TChangePasswordForm,
} from "@/lib/validations";
import { showErrorMessage } from "@/utils/showErrorMessage";

import { changePassword } from "../actions";

type ChangePasswordContextType = {
  onSubmit: () => Promise<void>;
  isPending: boolean;
  register: UseFormRegister<TChangePasswordForm>;
  control: Control<TChangePasswordForm>;
  errors: FieldErrors<TChangePasswordForm>;
  watch: UseFormWatch<TChangePasswordForm>;
  getValues: UseFormGetValues<TChangePasswordForm>;
  trigger: UseFormTrigger<TChangePasswordForm>;
};

export const ChangePasswordContext = createContext<
  ChangePasswordContextType | undefined
>(undefined);

type ChangePasswordProviderProps = {
  children: ReactNode;
};

export function ChangePasswordProvider({
  children,
}: ChangePasswordProviderProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    trigger,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<TChangePasswordForm>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  const onSubmit = async () => {
    startTransition(async () => {
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
    });
  };

  return (
    <ChangePasswordContext.Provider
      value={{
        onSubmit,
        register,
        trigger,
        isPending,
        control,
        errors,
        watch,
        getValues,
      }}
    >
      {children}
    </ChangePasswordContext.Provider>
  );
}
