"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { useProjectContext } from "@/hooks/use-project-context";
import {
  DEFAULT_IMAGE_URL,
  DEFAULT_PROJECT_FORM,
  DEFAULT_TECH_STACK,
  FALLBACK_IMG,
} from "@/lib/constants";
import { Action } from "@/lib/types";
import { projectFormSchema, TProjectForm } from "@/lib/validations";

import { MultiSelect } from "../multi-select";
import ButtonForm from "../primitives/button-form";
import ButtonMinimal from "../primitives/button-minimal";
import RequiredInputLabel from "../primitives/required-input-label";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { LabelLink } from "./label-link";
import { DatePicker } from "../ui/date-picker";
import { ProjectFormImagesViewer } from "./project-form-images-viewer";
import { ProjectFormRolesViewer } from "./project-form-roles-viewer";
import { toast } from "sonner";

type ProjectFormProps = {
  actionType: Action;
  categoryId: string;
  onFormSubmission: VoidFunction;
};

function ProjectForm({
  actionType,
  categoryId,
  onFormSubmission,
}: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { createProjectByCategoryId } = useProjectContext();

  const {
    register,
    trigger,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<TProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: DEFAULT_PROJECT_FORM,
  });

  const {
    fields: galleryFields,
    append: galleryAppend,
    remove: galleryRemove,
  } = useFieldArray({
    rules: { minLength: 1, required: "Please add at least 1 picture." },
    name: "gallery",
    control,
  });

  const {
    fields: rolesFields,
    append: rolesAppend,
    remove: rolesRemove,
  } = useFieldArray({
    rules: { minLength: 1, required: "Please add at least 1 role." },
    name: "roles",
    control,
  });

  const hasImage =
    watch("image")?.includes(DEFAULT_IMAGE_URL) &&
    watch("image")?.length > DEFAULT_IMAGE_URL.length;

  const hasGallery =
    watch("gallery")?.length && watch("gallery")?.[0].imageUrl !== "";

  return (
    <form
      className="relative flex flex-wrap gap-6"
      action={async () => {
        startTransition(async () => {
          const result = await trigger();
          if (!result) {
            const errorMessage =
              "Form validation failed. Please check the highlighted fields and try again.";
            toast.error(errorMessage);
            console.warn(errorMessage);
            return;
          }

          onFormSubmission();

          const project = getValues();
          project.image = project.image || FALLBACK_IMG;

          if (actionType === "add") {
            await createProjectByCategoryId(project, categoryId);
          } else if (actionType === "edit") {
            //TODO: Add edit project by categoryId
          }
        });
      }}
    >
      {/* Project details */}
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
              rules={{ validate: (value) => value.includes(DEFAULT_IMAGE_URL) }}
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
                  <Input
                    id="image"
                    placeholder={DEFAULT_IMAGE_URL}
                    {...field}
                  />
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
                  <RequiredInputLabel
                    htmlFor="slug"
                    label="Unique identifier"
                  />
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
                    <span className="text-secondary">
                      {errors.date.message}
                    </span>
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
                  <RequiredInputLabel
                    htmlFor="description"
                    label="Description"
                  />
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

      {/* Images */}
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
        <p className="text-secondary text-xs">
          {errors.gallery?.root?.message}
        </p>

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

      {/* Tech stack */}
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

      {/* Roles */}
      <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
        <h2 className="text-xl font-bold">Roles</h2>
        <ul className="w-full space-y-12 lg:space-y-6">
          {rolesFields.map((field, index) => (
            <li
              key={field.id}
              className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-end w-full"
            >
              <div className="relative w-full flex flex-col gap-2">
                <Controller
                  name={`roles.${index}.label`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <RequiredInputLabel
                        htmlFor={`role-label-${index}`}
                        label="Name"
                      />
                      <Input id={`role-label-${index}`} {...field} />
                      {errors.roles?.[index]?.label && (
                        <span className="absolute -bottom-4 text-secondary text-xs">
                          {errors.roles?.[index]?.label.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="relative w-full flex flex-col gap-2">
                <Controller
                  name={`roles.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <RequiredInputLabel
                        htmlFor={`role-value-${index}`}
                        label="Value"
                      />
                      <Input id={`role-value-${index}`} {...field} />
                      {errors.roles?.[index]?.value && (
                        <span className="absolute -bottom-4 text-secondary text-xs">
                          {errors.roles?.[index]?.value.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="relative w-full flex flex-col gap-2 max-w-18">
                <Controller
                  name={`roles.${index}.percentage`}
                  control={control}
                  rules={{ min: 1, max: 100 }}
                  render={({ field }) => (
                    <>
                      <Label htmlFor={`role-percentage-${index}`}>%</Label>
                      <Input
                        id={`role-percentage-${index}`}
                        type="number"
                        min={1}
                        max={100}
                        {...field}
                        value={field.value ?? 0}
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "."].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          let value = parseInt(e.target.value);
                          if (isNaN(value)) value = 0;
                          if (value > 100) value = 100;
                          field.onChange(value);
                        }}
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                      />
                      {errors.roles?.[index]?.percentage && (
                        <span className="absolute -bottom-4 text-secondary text-xs">
                          {errors.roles?.[index]?.percentage.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <ButtonMinimal
                className="w-full lg:w-auto"
                title="Delete"
                onClick={() => rolesRemove(index)}
              />
            </li>
          ))}
        </ul>
        <p className="text-secondary text-xs">{errors.roles?.root?.message}</p>

        <div className="w-full flex justify-center items-center">
          <ButtonMinimal
            title={<PlusIcon className="w-6 h-auto" />}
            className="py-6 max-lg:my-6"
            onClick={() =>
              rolesAppend({
                label: "",
                value: "",
                percentage: 50,
              })
            }
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {watch("roles")?.map((role, index) => (
            <ProjectFormRolesViewer
              key={`${role.value}-${index}`}
              role={role.value}
              label={role.label}
              remove={() => rolesRemove(index)}
            />
          ))}
        </div>
      </section>

      {/* Entities */}
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

      {/* Extra content */}
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
                <Input id="repository" {...field} value={field.value ?? ""} />
                {errors.repository && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.repository.message}
                  </span>
                )}
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
                <Input id="websiteUrl" {...field} value={field.value ?? ""} />
                {errors.websiteUrl && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.websiteUrl.message}
                  </span>
                )}
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
                  <Input id="videoTitle" {...field} value={field.value ?? ""} />
                  {errors.videoTitle && (
                    <span className="absolute -bottom-4 text-secondary text-xs">
                      {errors.videoTitle.message}
                    </span>
                  )}
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
                  />
                  {errors.videoDescription && (
                    <span className="absolute -bottom-4 text-secondary text-xs">
                      {errors.videoDescription.message}
                    </span>
                  )}
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
                <Input id="videoUrl" {...field} value={field.value ?? ""} />
                {errors.videoUrl && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.videoUrl.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      </section>

      <div className="w-full flex flex-col items-center gap-4 mt-10 mb-14">
        <ButtonForm
          actionType={actionType}
          className="!w-full max-w-72"
          loading={isPending}
        />
        <ButtonMinimal
          title="Cancel"
          onClick={() => router.back()}
          className="!w-full max-w-72 text-base"
        />
      </div>
    </form>
  );
}

export default ProjectForm;
