"use client";

import { Controller } from "react-hook-form";

import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IMAGE_PLACEHOLDER, IMAGE_URL_PREFIXES } from "@/lib/constants";
import { isValidImageUrl } from "@/lib/validations";
import { useProjectFormStore } from "@/stores/use-project-form-store";

import { LabelLink } from "../../label-link";

export function ProjectDetailsSection() {
  const { control, register, watch, getValues, errors } = useProjectFormStore();

  if (!control || !register || !watch || !getValues) return null;

  const hasImage = isValidImageUrl(watch("image"));

  return (
    <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
      <h2 className="text-xl font-bold">Project details</h2>
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <>
                <RequiredInputLabel htmlFor="title" label="Title" />
                <Input id="title" {...field} />
                {errors.title && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.title.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
          <Controller
            name="image"
            control={control}
            rules={{ validate: (value) => IMAGE_URL_PREFIXES.some(prefix => value.startsWith(prefix)) }}
            render={({ field }) => (
              <>
                <RequiredInputLabel
                  htmlFor="image"
                  label={
                    <>
                      Hero image url
                      {hasImage && (
                        <LabelLink
                          href={getValues("image") || ""}
                          label="Open image"
                        />
                      )}
                    </>
                  }
                />
                <Input id="image" placeholder={IMAGE_PLACEHOLDER} {...field} />
                {errors.image && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.image.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="relative flex flex-col gap-2 w-full lg:w-1/3">
          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <>
                <RequiredInputLabel htmlFor="slug" label="Unique identifier" />
                <Input id="slug" {...field} />
                {errors.slug && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.slug.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-2 w-full lg:w-1/3">
          <Controller
            name="date"
            control={control}
            defaultValue={new Date()}
            render={({ field }) => (
              <>
                <Label htmlFor="date">Release Date</Label>
                <DatePicker
                  defaultValue={getValues("date")}
                  selectedDate={field.value}
                  onChange={field.onChange}
                />
                {errors.date && (
                  <span className="text-secondary">{errors.date.message}</span>
                )}
              </>
            )}
          />
        </div>

        <div className="flex flex-col justify-end items-start gap-2 w-full lg:w-1/3 mb-4">
          <Controller
            name="published"
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <div className="flex flex-row-reverse gap-2 items-center">
                <Label htmlFor="published">Publish the project</Label>
                <Checkbox
                  defaultChecked={true}
                  checked={field.value}
                  {...register("published")}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-6">
        <div className="relative flex flex-col gap-2 w-full xl:w-1/2">
          <Controller
            name="shortDescription"
            control={control}
            render={({ field }) => (
              <>
                <RequiredInputLabel
                  htmlFor="shortDescription"
                  label="Short description"
                />
                <Textarea
                  maxLength={200}
                  id="shortDescription"
                  {...field}
                  className="bg-transparent min-h-36"
                />
                {errors.shortDescription && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.shortDescription.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full xl:w-1/2">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <RequiredInputLabel htmlFor="description" label="Description" />
                <Textarea
                  id="description"
                  {...field}
                  className="bg-transparent min-h-36"
                />
                {errors.description && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.description.message}
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
