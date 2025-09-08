'use client'
import { useFormStatus } from "react-dom";

import ButtonWhite from "@/components/primitives/button-white";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <ButtonWhite
      loading={pending}
      disabled={pending}
      text="Log in"
      className="mt-4 md:w-full"
      type="submit"
    />
  );
};
