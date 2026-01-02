"use client";

import ButtonForm from "@/components/primitives/button-form";
import { useChangePasswordContext } from "@/hooks/use-change-password-context";

import { NewPasswordSection } from "./new-password-section";

export const ChangePasswordFormWrapper = () => {
  const { isPending, onSubmit } = useChangePasswordContext();

  return (
    <form className="relative flex flex-wrap gap-6" action={onSubmit}>
      <div className="w-full flex flex-col items-center gap-4 mt-10 mb-14">
        <NewPasswordSection />
        <ButtonForm
          actionType="edit"
          className="w-full! max-w-72"
          loading={isPending}
        />
      </div>
    </form>
  );
};
