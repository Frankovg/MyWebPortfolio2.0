"use client";

import { PlusIcon } from "lucide-react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";

import MediaPickerModal from "@/components/admin/media-picker/media-picker-modal";
import ButtonMinimal from "@/components/primitives/button-minimal";
import FormFieldError from "@/components/primitives/form-field-error";
import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IMAGE_PLACEHOLDER } from "@/lib/constants";
import { useProjectFormStore } from "@/stores/use-project-form-store";

import { ProjectFormImagesViewer } from "./project-form-images-viewer";


export function ImagesSection() {
  const { control, errors } = useProjectFormStore();

  const {
    fields: galleryFields,
    append: galleryAppend,
    remove: galleryRemove,
  } = useFieldArray({
    rules: { minLength: 1, required: "Please add at least 1 picture." },
    name: "gallery",
    control: control ?? undefined,
  });

  if (!control) return null;

  const galleryValue = useWatch({ control, name: "gallery" });
  const hasGallery =
    galleryValue?.length && galleryValue?.[0].imageUrl !== "";

  const handleSelectMultipleImages = (urls: string[]) => {
    const lastIndex = galleryFields.length - 1;
    if (lastIndex >= 0 && !galleryValue?.[lastIndex]?.imageUrl) {
      galleryRemove(lastIndex);
    }
    urls.forEach((url) =>
      galleryAppend({ description: "", imageUrl: url, alt: "" })
    );
  }

  return (
    <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl font-bold">Images</h2>
        <MediaPickerModal
          multiple
          onSelectMultiple={handleSelectMultipleImages}
          trigger={
            <Button variant="ghost" className="p-0 hover:underline">
              + Add Images
            </Button>
          }
        />
      </div>
      <ul className="w-full space-y-12 lg:space-y-6">
        {galleryFields.map((field, index) => (
          <li
            key={field.id}
            className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-end w-full"
          >
            <div className="relative w-full flex flex-col gap-2">
              <Controller
                name={`gallery.${index}.imageUrl`}
                control={control}
                render={({ field }) => (
                  <>
                    <RequiredInputLabel
                      htmlFor={`image-url-${index}`}
                      label="Url"
                    />
                    <div className="relative">
                      <Input
                        id={`image-url-${index}`}
                        placeholder={IMAGE_PLACEHOLDER}
                        className="pr-10"
                        aria-invalid={!!errors.gallery?.[index]?.imageUrl}
                        aria-describedby={errors.gallery?.[index]?.imageUrl ? `gallery-${index}-imageUrl-error` : undefined}
                        {...field}
                      />
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-background">
                        <MediaPickerModal onSelect={(url) => field.onChange(url)} />
                      </div>
                    </div>
                    <FormFieldError id={`gallery-${index}-imageUrl-error`} message={errors.gallery?.[index]?.imageUrl?.message} className="absolute -bottom-4 text-secondary text-xs" />
                  </>
                )}
              />
            </div>

            <div className="relative w-full flex flex-col gap-2">
              <Controller
                name={`gallery.${index}.alt`}
                control={control}
                render={({ field }) => (
                  <>
                    <RequiredInputLabel
                      htmlFor={`image-alt-${index}`}
                      label="Alt"
                    />
                    <Input
                      id={`image-alt-${index}`}
                      aria-invalid={!!errors.gallery?.[index]?.alt}
                      aria-describedby={errors.gallery?.[index]?.alt ? `gallery-${index}-alt-error` : undefined}
                      {...field}
                    />
                    <FormFieldError id={`gallery-${index}-alt-error`} message={errors.gallery?.[index]?.alt?.message} className="absolute -bottom-4 text-secondary text-xs" />
                  </>
                )}
              />
            </div>

            <div className="relative w-full flex flex-col gap-2">
              <Controller
                name={`gallery.${index}.description`}
                control={control}
                render={({ field }) => (
                  <>
                    <Label htmlFor={`image-description-${index}`}>
                      Description
                    </Label>
                    <Input
                      id={`image-description-${index}`}
                      aria-invalid={!!errors.gallery?.[index]?.description}
                      aria-describedby={errors.gallery?.[index]?.description ? `gallery-${index}-description-error` : undefined}
                      {...field}
                      value={field.value ?? ""}
                    />
                    <FormFieldError id={`gallery-${index}-description-error`} message={errors.gallery?.[index]?.description?.message} className="absolute -bottom-4 text-secondary text-xs" />
                  </>
                )}
              />
            </div>

            <ButtonMinimal
              className="w-full lg:w-auto h-full"
              title="Delete"
              onClick={() => galleryRemove(index)}
            />
          </li>
        ))}
      </ul>
      <p className="text-secondary text-xs">{errors.gallery?.root?.message}</p>

      <div className="w-full flex justify-center items-center">
        <ButtonMinimal
          title={<PlusIcon className="size-4" />}
          className="size-10 max-lg:my-6"
          onClick={() =>
            galleryAppend({
              description: "",
              imageUrl: "",
              alt: "",
            })
          }
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {hasGallery ? (
          galleryValue?.map((image, index) => (
            <ProjectFormImagesViewer
              key={galleryFields[index]?.id ?? image.imageUrl}
              imageUrl={image.imageUrl}
              imageAlt={image.alt}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
