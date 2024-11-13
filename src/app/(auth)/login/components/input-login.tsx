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
  ...props
}: InputLoginProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input {...props} />
    </div>
  )
}

export default InputLogin;