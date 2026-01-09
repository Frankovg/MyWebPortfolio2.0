"use client";
import { Controller } from "react-hook-form";

import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_FILE_URL, getImageUrlPlaceholder, IMAGE_URL_PREFIXES, isValidImageUrl } from "@/lib/constants";
import { useDownloadFormStore } from "@/stores/use-download-form-store";

import { LabelLink } from "../../label-link";

export function FileSection() {
  const { register, getValues, watch, control, errors } =
    useDownloadFormStore();

  if (!register || !getValues || !watch || !control) {
    return null;
  }

  const imageUrl = watch("imageUrl");
  const fileHref = watch("fileHref");

  const hasImage = isValidImageUrl(imageUrl);
  const hasFile =
    fileHref?.includes(DEFAULT_FILE_URL) &&
    fileHref?.length > DEFAULT_FILE_URL.length;

  return (
    <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-bold">File details</h2>
        <div className="flex flex-col justify-end items-start gap-2 ">
          <Controller
            name="isActive"
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <div className="flex flex-row-reverse gap-2 items-center">
                <Label htmlFor="isActive">Publish the file</Label>
                <Checkbox
                  defaultChecked={true}
                  checked={field.value}
                  {...register("isActive")}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="relative flex flex-col gap-2 w-full lg:w-2/5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <RequiredInputLabel htmlFor="name" label="Name" />
                <Input id="name" {...field} />
                {errors.name && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.name.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full lg:w-2/5">
          <Controller
            name="fileHref"
            control={control}
            rules={{
              validate: (value) => value.includes(DEFAULT_FILE_URL),
            }}
            render={({ field }) => (
              <>
                <RequiredInputLabel
                  htmlFor="fileHref"
                  label={
                    <>
                      File url
                      {hasFile && (
                        <LabelLink
                          href={getValues("fileHref") || ""}
                          label="Open file"
                        />
                      )}
                    </>
                  }
                />
                <Input
                  id="fileHref"
                  placeholder={DEFAULT_FILE_URL}
                  {...field}
                />
                {errors.fileHref && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.fileHref.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full lg:w-1/5">
          <Controller
            name="format"
            control={control}
            render={({ field }) => (
              <>
                <RequiredInputLabel htmlFor="format" label="Format" />
                <Input id="format" {...field} />
                {errors.format && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.format.message}
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
            name="imageUrl"
            control={control}
            rules={{
              validate: (value) => IMAGE_URL_PREFIXES.some(prefix => value.startsWith(prefix)),
            }}
            render={({ field }) => (
              <>
                <RequiredInputLabel
                  htmlFor="imageUrl"
                  label={
                    <>
                      Hero image url
                      {hasImage && (
                        <LabelLink
                          href={getValues("imageUrl") || ""}
                          label="Open image"
                        />
                      )}
                    </>
                  }
                />
                <Input
                  id="imageUrl"
                  placeholder={getImageUrlPlaceholder()}
                  {...field}
                />
                {errors.imageUrl && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.imageUrl.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
          <Controller
            name="alt"
            control={control}
            render={({ field }) => (
              <>
                <RequiredInputLabel htmlFor="alt" label="Alternative text" />
                <Input id="alt" {...field} value={field.value ?? ""} />
                {errors.alt && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.alt.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="relative flex flex-col gap-2 w-full">
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
    </section>
  );
}
