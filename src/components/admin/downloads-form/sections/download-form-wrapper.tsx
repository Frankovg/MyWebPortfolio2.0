"use client";

import ButtonForm from "@/components/primitives/button-form";
import ButtonMinimal from "@/components/primitives/button-minimal";
import { useDownloadFormContext } from "@/hooks/use-download-form";
import { Action } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FileSection } from "./file-section";

export default function DownloadFormWrapper({
  actionType,
}: {
  actionType: Action;
}) {
  const router = useRouter();

  const { isPending, onSubmit } = useDownloadFormContext();

  const goBack = () => {
    router.back();
  };

  return (
    <form className="relative flex flex-wrap gap-6" action={() => onSubmit()}>
      <div className="w-full flex flex-col items-center gap-4 mt-10 mb-14">
        <FileSection />
        <ButtonForm
          actionType={actionType}
          className="!w-full max-w-72"
          loading={isPending}
        />
        <ButtonMinimal
          title="Cancel"
          onClick={goBack}
          className="!w-full max-w-72 text-base"
        />
      </div>
    </form>
  );
}
