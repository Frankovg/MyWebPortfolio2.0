"use client";

import { Controller, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RequiredInputLabel from "@/components/primitives/required-input-label";
import { ProjectFormImagesViewer } from "@/components/admin/project-form-images-viewer";
import { DEFAULT_IMAGE_URL } from "@/lib/constants";
import ButtonMinimal from "@/components/primitives/button-minimal";
import { PlusIcon } from "lucide-react";
import { useProjectFormContext } from "@/hooks/use-project-form";

export function ImagesSection() {
  const { control, errors, watch } = useProjectFormContext();

  const {
    fields: galleryFields,
    append: galleryAppend,
    remove: galleryRemove,
  } = useFieldArray({
    rules: { minLength: 1, required: "Please add at least 1 picture." },
    name: "gallery",
    control,
  });

  const hasGallery =
    watch("gallery")?.length && watch("gallery")?.[0].imageUrl !== "";

  return (
    <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
      <h2 className="text-xl font-bold">Images</h2>
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
                    <Input
                      id={`image-url-${index}`}
                      placeholder={DEFAULT_IMAGE_URL}
                      {...field}
                    />
                    {errors.gallery?.[index]?.imageUrl && (
                      <span className="absolute -bottom-4 text-secondary text-xs">
                        {errors.gallery?.[index]?.imageUrl.message}
                      </span>
                    )}
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
                    <Input id={`image-alt-${index}`} {...field} />
                    {errors.gallery?.[index]?.alt && (
                      <span className="absolute -bottom-4 text-secondary text-xs">
                        {errors.gallery?.[index]?.alt.message}
                      </span>
                    )}
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
                      {...field}
                      value={field.value ?? ""}
                    />
                    {errors.gallery?.[index]?.description && (
                      <span className="absolute -bottom-4 text-secondary text-xs">
                        {errors.gallery?.[index]?.description.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <ButtonMinimal
              className="w-full lg:w-auto"
              title="Delete"
              onClick={() => galleryRemove(index)}
            />
          </li>
        ))}
      </ul>
      <p className="text-secondary text-xs">{errors.gallery?.root?.message}</p>

      <div className="w-full flex justify-center items-center">
        <ButtonMinimal
          title={<PlusIcon className="w-6 h-auto" />}
          className="py-6 max-lg:my-6"
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
        {/* //TODO: Make this works for guest users and allow to upload images from other sites 
          //TODO: Add a script to modify the default drive url to the good one */}
        {hasGallery ? (
          watch("gallery")?.map((image, index) => (
            <ProjectFormImagesViewer
              key={`${image.imageUrl}-${index}`}
              imageUrl={image.imageUrl}
              imageAlt={image.alt}
              index={index}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
