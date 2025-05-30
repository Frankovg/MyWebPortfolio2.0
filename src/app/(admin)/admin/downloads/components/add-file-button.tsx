import ButtonMinimal from "@/components/primitives/button-minimal";
import Link from "next/link";

export const AddFileButton = () => {
  return (
    <Link href={`/admin/downloads/add`}>
      <ButtonMinimal title="+ Add new file" />
    </Link>
  );
};
