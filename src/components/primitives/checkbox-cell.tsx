import { Checkbox } from "../ui/checkbox";

import { Spinner } from "./spinner";

type CheckboxCellProps = {
  loading: boolean;
  disabled: boolean;
  checked: boolean;
  id: string;
  handleCheckboxChange: (id: string, value: boolean) => Promise<void>;
};

const CheckboxContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-center items-center">{children}</div>;
};

const CheckboxCell = ({
  loading,
  disabled,
  checked,
  id,
  handleCheckboxChange,
}: CheckboxCellProps) => {
  if (loading) {
    return (
      <CheckboxContainer>
        <Spinner size="sm" className="text-white" />
      </CheckboxContainer>
    );
  }

  return (
    <CheckboxContainer>
      <Checkbox
        disabled={disabled}
        checked={checked}
        onCheckedChange={(value) => handleCheckboxChange(id, !!value)}
      />
    </CheckboxContainer>
  );
};

export default CheckboxCell;
