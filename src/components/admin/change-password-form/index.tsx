import { ChangePasswordFormInitializer } from "./change-password-form-initializer";
import { ChangePasswordFormWrapper } from "./sections/change-password-form-wrapper";

export const ChangePasswordForm = () => {
  return (
    <ChangePasswordFormInitializer>
      <ChangePasswordFormWrapper />
    </ChangePasswordFormInitializer>
  );
};
