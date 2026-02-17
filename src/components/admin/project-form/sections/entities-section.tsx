"use client";

import { Controller } from "react-hook-form";

import { LabelLink } from "@/components/admin/label-link";
import FormFieldError from "@/components/primitives/form-field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectFormStore } from "@/stores/use-project-form-store";

export function EntitiesSection() {
  const { control, watch, getValues, errors } = useProjectFormStore();

  if (!control || !watch || !getValues) return null;

  return (
    <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
      <h2 className="text-xl font-bold">Entities</h2>
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <>
                <Label htmlFor="company">Company name</Label>
                <Input
                  id="company"
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? "company-error" : undefined}
                />
                <FormFieldError
                  id="company-error"
                  message={errors.company?.message}
                  className="absolute -bottom-4 text-secondary text-xs"
                />
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
          <Controller
            name="companyUrl"
            control={control}
            render={({ field }) => (
              <>
                <Label htmlFor="companyUrl">
                  Company Url
                  {watch("companyUrl")?.includes("https://") && (
                    <LabelLink
                      href={getValues("companyUrl") || ""}
                      label="Open Website"
                    />
                  )}
                </Label>
                <Input
                  id="companyUrl"
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={!!errors.companyUrl}
                  aria-describedby={errors.companyUrl ? "companyUrl-error" : undefined}
                />
                <FormFieldError
                  id="companyUrl-error"
                  message={errors.companyUrl?.message}
                  className="absolute -bottom-4 text-secondary text-xs"
                />
              </>
            )}
          />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <>
                <Label htmlFor="client">Client name</Label>
                <Input
                  id="client"
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={!!errors.client}
                  aria-describedby={errors.client ? "client-error" : undefined}
                />
                <FormFieldError
                  id="client-error"
                  message={errors.client?.message}
                  className="absolute -bottom-4 text-secondary text-xs"
                />
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
          <Controller
            name="clientUrl"
            control={control}
            render={({ field }) => (
              <>
                <Label htmlFor="clientUrl">
                  Client Url
                  {watch("clientUrl")?.includes("https://") && (
                    <LabelLink
                      href={getValues("clientUrl") || ""}
                      label="Open Website"
                    />
                  )}
                </Label>
                <Input
                  id="clientUrl"
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={!!errors.clientUrl}
                  aria-describedby={errors.clientUrl ? "clientUrl-error" : undefined}
                />
                <FormFieldError
                  id="clientUrl-error"
                  message={errors.clientUrl?.message}
                  className="absolute -bottom-4 text-secondary text-xs"
                />
              </>
            )}
          />
        </div>
      </div>
    </section>
  );
}
