import { Action } from "@/lib/types";

import ButtonWhite from "./button-white";

function ButtonForm({
  actionType,
  loading = false,
  className,
}: {
  actionType: Action;
  loading: boolean;
  className?: string;
}) {
  return (
    <ButtonWhite
      text={actionType === "add" ? "Create" : "Save"}
      type="submit"
      className={className}
      loading={loading}
    />
  );
}

export default ButtonForm;
