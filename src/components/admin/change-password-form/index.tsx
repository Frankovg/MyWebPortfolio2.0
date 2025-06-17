import { ChangePasswordProvider } from "@/context/change-password-provider";
import { ChangePasswordFormWrapper } from "./sections/change-password-form-wrapper";

export const ChangePasswordForm = () => {
  return (
    <ChangePasswordProvider>
      <ChangePasswordFormWrapper />
    </ChangePasswordProvider>
  );
};
