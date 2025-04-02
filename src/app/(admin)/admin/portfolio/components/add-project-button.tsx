"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import ButtonMinimal from "@/components/button-minimal";

function AddProjectButton() {
  const params = useSearchParams();
  const category = params.get("category") || "web-development";

  return (
    <Link href={`/admin/portfolio/add?category=${category}`}>
      <ButtonMinimal title="+ Add new project" />
    </Link>
  );
}

export default AddProjectButton;
