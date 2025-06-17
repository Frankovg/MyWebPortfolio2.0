"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useTransition } from "react";
import { flushSync } from "react-dom";
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

import { useUserDataContext } from "@/hooks/use-user-data-context";
import {
  changePasswordFormSchema,
  TChangePasswordForm,
} from "@/lib/validations";

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
  const {} = useUserDataContext();

  const router = useRouter();

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

      flushSync(() => {
        router.push("/admin/change-password/success");
      });

      //Logic
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
