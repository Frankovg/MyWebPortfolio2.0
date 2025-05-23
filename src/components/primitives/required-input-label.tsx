import { Label } from "../ui/label";

type RequiredInputLabelProps = {
  htmlFor: string;
  label: React.ReactNode;
};

function RequiredInputLabel({ htmlFor, label }: RequiredInputLabelProps) {
  return (
    <Label htmlFor={htmlFor}>
      <span className="text-secondary">* </span>
      {label}
    </Label>
  );
}

export default RequiredInputLabel;
