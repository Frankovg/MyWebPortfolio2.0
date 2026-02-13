import { cn } from "@/lib/utils";

type FormFieldErrorProps = {
  id: string;
  message?: string;
  className?: string;
};

function FormFieldError({ id, message, className }: FormFieldErrorProps) {
  if (!message) return null;

  return (
    <span
      id={id}
      role="alert"
      className={cn("text-error", className)}
    >
      {message}
    </span>
  );
}

export default FormFieldError;
