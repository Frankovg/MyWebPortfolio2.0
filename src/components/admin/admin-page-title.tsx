"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import H1Main from "@/components/primitives/h1-main";
import { Button } from "@/components/ui/button";

type AdminPageTitleProps = {
  title: string;
  showGoBack?: boolean;
};

function AdminPageTitle({ title, showGoBack = false }: AdminPageTitleProps) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      {showGoBack && (
        <Button variant="ghost" className="p-0" onClick={() => router.back()}>
          <ChevronLeft />
        </Button>
      )}
      <H1Main>{title}</H1Main>
    </div>
  );
}

export default AdminPageTitle;
