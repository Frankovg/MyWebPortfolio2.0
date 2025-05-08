"use client";

import ButtonForm from "@/components/primitives/button-form";
import ButtonMinimal from "@/components/primitives/button-minimal";
import { useProjectFormContext } from "@/hooks/use-project-form";
import { ProjectDetailsSection } from "./sections/project-details-section";
import { ImagesSection } from "./sections/images-section";
import { TechStackSection } from "./sections/tech-stack-section";
import { RolesSection } from "./sections/roles-section";
import { EntitiesSection } from "./sections/entities-section";
import { ExtraContentSection } from "./sections/extra-content-section";

export function ProjectForm() {
  const { actionType, onSubmit, isPending, goBack } = useProjectFormContext();

  return (
    <form className="relative flex flex-wrap gap-6" action={onSubmit}>
      <ProjectDetailsSection />
      <ImagesSection />
      <TechStackSection />
      <RolesSection />
      <EntitiesSection />
      <ExtraContentSection />

      <div className="w-full flex flex-col items-center gap-4 mt-10 mb-14">
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
