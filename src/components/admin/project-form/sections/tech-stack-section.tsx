"use client";

import { Controller } from "react-hook-form";

import { MultiSelect } from "@/components/multi-select";
import RequiredInputLabel from "@/components/primitives/required-input-label";
import { useProjectFormContext } from "@/hooks/use-project-form";
import { DEFAULT_TECH_STACK } from "@/lib/constants";

export function TechStackSection() {
  const { control, errors } = useProjectFormContext();

  return (
    <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
      <h2 className="text-xl font-bold">Tech stack</h2>
      <div className="relative flex flex-col gap-2">
        <RequiredInputLabel htmlFor="techStack" label="Select technologies" />
        <Controller
          control={control}
          name="techStack"
          render={({ field }) => (
            <MultiSelect
              options={DEFAULT_TECH_STACK}
              onValueChange={(values) => {
                const techStackValues =
                  values?.map((value) => ({ value })) || [];
                field.onChange(techStackValues);
              }}
              placeholder=">"
              maxCount={10}
              value={field.value?.map((item) => item.value)}
            />
          )}
        />
        {errors.techStack?.[0]?.value && (
          <span className="absolute -bottom-4 text-secondary text-xs">
            {errors.techStack?.[0]?.value.message}
          </span>
        )}
      </div>
    </section>
  );
}
