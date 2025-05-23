import { ButtonHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Spinner } from "./spinner";

type ButtonWhiteProps = {
  text: string;
  loading: boolean;
  disabled?: boolean;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

function ButtonWhite({
  text,
  disabled = false,
  className,
  type = "button",
  loading = false,
}: ButtonWhiteProps) {
  return (
    <Button
      className={cn(
        "group relative bg-white text-lg font-semibold py-[18px] px-[34px] overflow-hidden w-full md:w-fit rounded-sm",
        className
      )}
      disabled={disabled}
      type={type}
    >
      {loading ? (
        <Spinner size="sm" className="text-darkGrey" />
      ) : (
        <>
          <span className="absolute inset-0 bg-primary transform w-0 transition-all duration-300 ease-in-out group-hover:w-full" />
          <span className="relative z-10 text-darkGrey">{text}</span>
        </>
      )}
    </Button>
  );
}

export default ButtonWhite;
