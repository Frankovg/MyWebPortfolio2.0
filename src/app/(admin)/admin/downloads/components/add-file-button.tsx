import Link from "next/link";

import ButtonMinimal from "@/components/primitives/button-minimal";

export const AddFileButton = () => {
  return (
    <Link href={`/admin/downloads/add`}>
      <ButtonMinimal title="+ Add new file" />
    </Link>
  );
};
