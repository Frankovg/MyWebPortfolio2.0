"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  changePasswordFormSchema,
  TChangePasswordForm,
} from "@/lib/validations";
import { useChangePasswordStore } from "@/stores/use-change-password-store";

type ChangePasswordFormInitializerProps = {
  children: React.ReactNode;
};

export function ChangePasswordFormInitializer({
  children,
}: ChangePasswordFormInitializerProps) {
  const setFormMethods = useChangePasswordStore((s) => s.setFormMethods);
  const setErrors = useChangePasswordStore((s) => s.setErrors);
  const reset = useChangePasswordStore((s) => s.reset);

  const [isInitialized, setIsInitialized] = useState(false);

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

  useLayoutEffect(() => {
    setFormMethods({
      register,
      control,
      errors,
      watch,
      getValues,
      trigger,
    });
    setIsInitialized(true);

    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    setErrors(errors);
  }, [errors, setErrors]);

  if (!isInitialized) return null;

  return <>{children}</>;
}
