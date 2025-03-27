"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

function AddProjectButton() {
  const params = useSearchParams();
  const category = params.get("category") || "web-development";

  return (
    <Link href={`/admin/portfolio/add?category=${category}`}>
      <Button
        className="font-normal border border-whiteText hover-table-buttons"
        variant="outline"
        size="default"
      >
        + Add new project
      </Button>
    </Link>
  );
}

export default AddProjectButton;
