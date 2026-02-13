"use client";

import { Controller } from "react-hook-form";

import { LabelLink } from "@/components/admin/label-link";
import FormFieldError from "@/components/primitives/form-field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectFormStore } from "@/stores/use-project-form-store";

export function ExtraContentSection() {
  const { control, watch, getValues, errors } = useProjectFormStore();

  if (!control || !watch || !getValues) return null;

  return (
    <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
      <h2 className="text-xl font-bold">Extra content</h2>
      <div className="relative flex flex-col gap-2">
        <Controller
          name="repository"
          control={control}
          render={({ field }) => (
            <>
              <Label htmlFor="repository">
                Github Repository Url
                {watch("repository")?.includes("https://github.com/") && (
                  <LabelLink
                    href={getValues("repository") || ""}
                    label="Explore project"
                  />
                )}
              </Label>
              <Input
                id="repository"
                {...field}
                value={field.value ?? ""}
                aria-invalid={!!errors.repository}
                aria-describedby={errors.repository ? "repository-error" : undefined}
              />
              <FormFieldError
                id="repository-error"
                message={errors.repository?.message}
                className="absolute -bottom-4 text-secondary text-xs"
              />
            </>
          )}
        />
      </div>

      <div className="relative flex flex-col gap-2">
        <Controller
          name="websiteUrl"
          control={control}
          render={({ field }) => (
            <>
              <Label htmlFor="websiteUrl">
                Website Url
                {watch("websiteUrl")?.includes("https://") && (
                  <LabelLink
                    href={getValues("websiteUrl") || ""}
                    label="Open Website"
                  />
                )}
              </Label>
              <Input
                id="websiteUrl"
                {...field}
                value={field.value ?? ""}
                aria-invalid={!!errors.websiteUrl}
                aria-describedby={errors.websiteUrl ? "websiteUrl-error" : undefined}
              />
              <FormFieldError
                id="websiteUrl-error"
                message={errors.websiteUrl?.message}
                className="absolute -bottom-4 text-secondary text-xs"
              />
            </>
          )}
        />
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
          <Controller
            name="videoTitle"
            control={control}
            render={({ field }) => (
              <>
                <Label htmlFor="videoTitle">Video Title</Label>
                <Input
                  id="videoTitle"
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={!!errors.videoTitle}
                  aria-describedby={errors.videoTitle ? "videoTitle-error" : undefined}
                />
                <FormFieldError
                  id="videoTitle-error"
                  message={errors.videoTitle?.message}
                  className="absolute -bottom-4 text-secondary text-xs"
                />
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
          <Controller
            name="videoDescription"
            control={control}
            render={({ field }) => (
              <>
                <Label htmlFor="videoDescription">Video Description</Label>
                <Input
                  id="videoDescription"
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={!!errors.videoDescription}
                  aria-describedby={errors.videoDescription ? "videoDescription-error" : undefined}
                />
                <FormFieldError
                  id="videoDescription-error"
                  message={errors.videoDescription?.message}
                  className="absolute -bottom-4 text-secondary text-xs"
                />
              </>
            )}
          />
        </div>
      </div>

      <div className="relative flex flex-col gap-2">
        <Controller
          name="videoUrl"
          control={control}
          render={({ field }) => (
            <>
              <Label htmlFor="videoUrl">
                Youtube Video Url
                {watch("videoUrl")?.includes("https://www.youtube.com/") && (
                  <LabelLink
                    href={getValues("videoUrl") || ""}
                    label="Watch video"
                  />
                )}
              </Label>
              <Input
                id="videoUrl"
                {...field}
                value={field.value ?? ""}
                aria-invalid={!!errors.videoUrl}
                aria-describedby={errors.videoUrl ? "videoUrl-error" : undefined}
              />
              <FormFieldError
                id="videoUrl-error"
                message={errors.videoUrl?.message}
                className="absolute -bottom-4 text-secondary text-xs"
              />
            </>
          )}
        />
      </div>
    </section>
  );
}
