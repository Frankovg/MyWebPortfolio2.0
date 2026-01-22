import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const PasswordInput = ({ id, label, register, error }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col gap-2 w-full lg:w-1/3">
      <RequiredInputLabel htmlFor={id} label={label} />
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          {...register}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <span className="absolute -bottom-4 text-secondary text-xs">
          {error.message}
        </span>
      )}
    </div>
  );
};
