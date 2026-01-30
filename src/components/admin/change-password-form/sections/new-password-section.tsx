"use client";

import { useChangePasswordStore } from "@/stores/use-change-password-store";

import { PasswordInput } from "./password-input";

export const NewPasswordSection = () => {
  const { register, errors } = useChangePasswordStore();

  if (!register) return null;

  return (
    <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <PasswordInput
          id="currentPassword"
          label="Current Password"
          register={register("currentPassword")}
          error={errors.currentPassword}
        />
        <PasswordInput
          id="password"
          label="New Password"
          register={register("password")}
          error={errors.password}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />
      </div>
    </section>
  );
};
