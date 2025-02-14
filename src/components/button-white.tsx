import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

type ButtonWhiteProps = {
  text: string,
  disabled?: boolean,
  className?: string,
}

function ButtonWhite({
  text,
  disabled = false,
  className
}: ButtonWhiteProps) {
  return (
    <Button
      className={cn("group relative bg-white text-lg font-semibold py-[18px] px-[34px] overflow-hidden w-full md:w-fit rounded-sm", className)}
      disabled={disabled}
    >
      <span className="absolute inset-0 bg-primary transform w-0 transition-all duration-300 ease-in-out group-hover:w-full" />
      <span className="relative z-10 text-darkGrey">
        {text}
      </span>
    </Button>
  )
}

export default ButtonWhite