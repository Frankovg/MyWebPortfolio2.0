"use client";

import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Input } from "@/components/ui/input";
import { useChangePasswordStore } from "@/stores/use-change-password-store";

export const NewPasswordSection = () => {
  const { register, errors } = useChangePasswordStore();

  if (!register) return null;

  return (
    <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="relative flex flex-col gap-2 w-full lg:w-1/3">
          <RequiredInputLabel
            htmlFor="currentPassword"
            label="Current Password"
          />
          <Input
            id="currentPassword"
            type="password"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <span className="absolute -bottom-4 text-secondary text-xs">
              {errors.currentPassword.message}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-2 w-full lg:w-1/3">
          <RequiredInputLabel htmlFor="password" label="New Password" />
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <span className="absolute -bottom-4 text-secondary text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-2 w-full lg:w-1/3">
          <RequiredInputLabel
            htmlFor="confirmPassword"
            label="Confirm Password"
          />
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="absolute -bottom-4 text-secondary text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
