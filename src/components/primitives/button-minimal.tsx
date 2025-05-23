import { ButtonHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


function ButtonMinimal({
  title,
  className,
  onClick,
  type = "button",
}: {
  title: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}) {
  return (
    <Button
      className={cn(
        "font-normal border border-whiteText hover-table-buttons",
        className
      )}
      variant="outline"
      size="default"
      onClick={onClick}
      type={type}
    >
      {title}
    </Button>
  );
}

export default ButtonMinimal;
