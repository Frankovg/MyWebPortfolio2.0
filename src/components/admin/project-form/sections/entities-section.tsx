"use client";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LabelLink } from "@/components/admin/label-link";
import { useProjectFormContext } from "@/hooks/use-project-form";

export function EntitiesSection() {
  const { control, errors, watch, getValues } = useProjectFormContext();

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
                <Input id="company" {...field} value={field.value ?? ""} />
                {errors.company && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.company.message}
                  </span>
                )}
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
                <Input id="companyUrl" {...field} value={field.value ?? ""} />
                {errors.companyUrl && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.companyUrl.message}
                  </span>
                )}
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
                <Input id="client" {...field} value={field.value ?? ""} />
                {errors.client && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.client.message}
                  </span>
                )}
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
                <Input id="clientUrl" {...field} value={field.value ?? ""} />
                {errors.clientUrl && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.clientUrl.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      </div>
    </section>
  );
}
