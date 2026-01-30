"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputLoginProps extends InputProps {
  label: string,
  htmlFor?: string,
  className?: string
}

function InputLogin({
  label,
  htmlFor = '',
  className,
  id,
  type,
  ...props
}: InputLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = id === "password";

  return (
    <div className={cn('space-y-1', className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default InputLogin;