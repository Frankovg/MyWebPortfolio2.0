"use client";
import { Controller } from "react-hook-form";

import { LabelLink } from "@/components/admin/label-link";
import MediaPickerModal from "@/components/admin/media-picker/media-picker-modal";
import FormFieldError from "@/components/primitives/form-field-error";
import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FILE_PLACEHOLDER, IMAGE_PLACEHOLDER, IMAGE_URL_PREFIXES } from "@/lib/constants";
import { isValidFileUrl, isValidImageUrl } from "@/lib/validations";
import { useDownloadFormStore } from "@/stores/use-download-form-store";


export function FileSection() {
  const { register, getValues, watch, control, errors } =
    useDownloadFormStore();

  if (!register || !getValues || !watch || !control) {
    return null;
  }

  const imageUrl = watch("imageUrl");
  const fileHref = watch("fileHref");

  const hasImage = isValidImageUrl(imageUrl);
  const hasFile = isValidFileUrl(fileHref);

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
        <div className="relative flex flex-col gap-2 w-full lg:w-2/6">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <RequiredInputLabel htmlFor="name" label="Name" />
                <Input
                  id="name"
                  {...field}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                <FormFieldError id="name-error" message={errors.name?.message} className="absolute -bottom-4 text-secondary text-xs" />
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full lg:w-2/6">
          <Controller
            name="fileHref"
            control={control}
            rules={{
              validate: (value) => isValidFileUrl(value),
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

                <div className="relative">
                  <Input
                    id="fileHref"
                    placeholder={FILE_PLACEHOLDER}
                    {...field}
                    aria-invalid={!!errors.fileHref}
                    aria-describedby={errors.fileHref ? "fileHref-error" : undefined}
                  />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-background">
                    <MediaPickerModal fileFilter="pdf" onSelect={(url) => field.onChange(url)} />
                  </div>
                </div>
                <FormFieldError id="fileHref-error" message={errors.fileHref?.message} className="absolute -bottom-4 text-secondary text-xs" />
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full lg:w-1/6">
          <Controller
            name="format"
            control={control}
            render={({ field }) => (
              <>
                <RequiredInputLabel htmlFor="format" label="Format" />
                <Input
                  id="format"
                  {...field}
                  aria-invalid={!!errors.format}
                  aria-describedby={errors.format ? "format-error" : undefined}
                />
                <FormFieldError id="format-error" message={errors.format?.message} className="absolute -bottom-4 text-secondary text-xs" />
              </>
            )}
          />
        </div>

        <div className="relative flex flex-col gap-2 w-full lg:w-1/6">
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <>
                <RequiredInputLabel htmlFor="language" label="Language" />
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  {...register("language")}
                >
                  <SelectTrigger
                    id="language"
                    aria-invalid={!!errors.language}
                    aria-describedby={errors.language ? "language-error" : undefined}
                  >
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
                <FormFieldError id="language-error" message={errors.language?.message} className="absolute -bottom-4 text-secondary text-xs" />
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
                      Hero Image Url
                      {hasImage && (
                        <LabelLink
                          href={getValues("imageUrl") || ""}
                          label="Open image"
                        />
                      )}
                    </>
                  }
                />
                <div className="relative">
                  <Input
                    id="imageUrl"
                    placeholder={IMAGE_PLACEHOLDER}
                    {...field}
                    aria-invalid={!!errors.imageUrl}
                    aria-describedby={errors.imageUrl ? "imageUrl-error" : undefined}
                  />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-background">
                    <MediaPickerModal onSelect={(url) => field.onChange(url)} />
                  </div>
                </div>
                <FormFieldError id="imageUrl-error" message={errors.imageUrl?.message} className="absolute -bottom-4 text-secondary text-xs" />
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
                <Input
                  id="alt"
                  {...field}
                  value={field.value ?? ""}
                  aria-invalid={!!errors.alt}
                  aria-describedby={errors.alt ? "alt-error" : undefined}
                />
                <FormFieldError id="alt-error" message={errors.alt?.message} className="absolute -bottom-4 text-secondary text-xs" />
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
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? "description-error" : undefined}
              />
              <FormFieldError id="description-error" message={errors.description?.message} className="absolute -bottom-4 text-secondary text-xs" />
            </>
          )}
        />
      </div>
    </section>
  );
}
