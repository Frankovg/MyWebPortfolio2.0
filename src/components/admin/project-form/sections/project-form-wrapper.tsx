"use client";

import { useRouter } from "next/navigation";

import ButtonForm from "@/components/primitives/button-form";
import ButtonMinimal from "@/components/primitives/button-minimal";
import { Action } from "@/lib/types";
import { useProjectFormStore } from "@/stores/use-project-form-store";

import { EntitiesSection } from "../sections/entities-section";
import { ExtraContentSection } from "../sections/extra-content-section";
import { ImagesSection } from "../sections/images-section";
import { ProjectDetailsSection } from "../sections/project-details-section";
import { RolesSection } from "../sections/roles-section";
import { TechStackSection } from "../sections/tech-stack-section";

type ProjectFormWrapperProps = {
  actionType: Action;
  categoryId: string;
};

export default function ProjectFormWrapper({
  actionType,
  categoryId,
}: ProjectFormWrapperProps) {
  const router = useRouter();
  const { onSubmit, isPending } = useProjectFormStore();

  const goBack = () => {
    router.back();
  };

  return (
    <form
      className="relative flex flex-wrap gap-6"
      action={() => onSubmit(actionType, categoryId, router)}
    >
      <ProjectDetailsSection />
      <ImagesSection />
      <TechStackSection />
      <RolesSection />
      <EntitiesSection />
      <ExtraContentSection />

      <div className="w-full flex flex-col items-center gap-4 mt-10 mb-14">
        <ButtonForm
          actionType={actionType}
          className="w-full! max-w-72"
          loading={isPending}
        />
        <ButtonMinimal
          title="Cancel"
          onClick={goBack}
          className="w-full! max-w-72 text-base"
        />
      </div>
    </form>
  );
}
