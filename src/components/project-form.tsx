"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, PlusIcon, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import { useProjectContext } from "@/hooks/use-project-context";
import {
  DEFAULT_IMAGE_URL,
  FALLBACK_IMG,
  TECH_STACK_DATA,
} from "@/lib/constants";
import { Action } from "@/lib/types";
import { cn } from "@/lib/utils";
import { projectFormSchema, TProjectForm } from "@/lib/validations";

import { MultiSelect } from "./multi-select";
import ButtonForm from "./primitives/button-form";
import ButtonMinimal from "./primitives/button-minimal";
import ImageWithFallback from "./primitives/image-with-fallback";
import RequiredInputLabel from "./primitives/required-input-label";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

type ProjectFormProps = {
  actionType: Action;
  categoryId: string;
  onFormSubmission: VoidFunction;
};

const getDefaultTechStack = () => {
  return TECH_STACK_DATA.map((tech) => ({
    label: tech.name,
    value: tech.value,
  }));
};
const DEFAULT_TECH_STACK = getDefaultTechStack();

function ProjectForm({
  actionType,
  categoryId,
  onFormSubmission,
}: ProjectFormProps) {
  const router = useRouter();

  const { createProjectByCategoryId } = useProjectContext();

  const {
    register,
    trigger,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<TProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      image: "",
      title: "",
      shortDescription: "",
      description: "",
      slug: "",
      gallery: [
        {
          imageUrl: "",
          alt: "",
          description: null,
        },
      ],
      date: new Date(),
      repository: null,
      websiteUrl: null,
      videoUrl: null,
      videoTitle: null,
      videoDescription: null,
      company: null,
      companyUrl: null,
      client: null,
      clientUrl: null,
      techStack: [
        {
          value: "",
        },
      ],
      roles: [
        {
          label: "",
          value: "",
          percentage: 50,
        },
      ],
      published: true,
    },
  });

  // TODO: More info at https://react-hook-form.com/docs/usefieldarray
  // TODO: Watch example at https://codesandbox.io/p/sandbox/usefieldarray-llp6lw?file=%2Fsrc%2FApp.tsx
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

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form
      className="flex flex-wrap gap-6"
      action={async () => {
        const result = await trigger();
        if (!result) return;

        const project = getValues();
        project.image = project.image || FALLBACK_IMG;

        if (actionType === "add") {
          await createProjectByCategoryId(project, categoryId);
        } else if (actionType === "edit") {
          //TODO: Add edit project by categoryId
        }
      }}
    >
      <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
        <h2 className="text-xl font-bold">Project details</h2>
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
            <RequiredInputLabel htmlFor="title" label="Title" />
            <Input id="title" {...register("title")} />
            {errors.title && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
            <RequiredInputLabel
              htmlFor="image"
              label={
                <>
                  Hero image url
                  {watch("image").includes(DEFAULT_IMAGE_URL) &&
                    watch("image").length > DEFAULT_IMAGE_URL.length && (
                      <span>
                        {" > "}
                        <Link
                          href={getValues("image") || ""}
                          target="_blank"
                          className="text-primary hover:underline"
                        >
                          Open image
                        </Link>
                      </span>
                    )}
                </>
              }
            />
            <Input
              id="image"
              placeholder={DEFAULT_IMAGE_URL}
              {...register("image", {
                validate: (value) => value.includes(DEFAULT_IMAGE_URL),
              })}
            />
            {errors.image && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.image.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="relative flex flex-col gap-2 w-full lg:w-1/3">
            <RequiredInputLabel htmlFor="slug" label="Unique identifier" />
            <Input id="slug" {...register("slug")} />
            {errors.slug && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.slug.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-1/3">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <>
                  <Label htmlFor="date">Release Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !getValues("date") && "text-muted-foreground"
                        )}
                      >
                        {getValues("date") ? (
                          format(getValues("date"), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <span className="text-danger">{errors.date.message}</span>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex flex-col justify-end items-start gap-2 w-full lg:w-1/3 mb-4">
            <Controller
              name="published"
              control={control}
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
            <RequiredInputLabel
              htmlFor="shortDescription"
              label="Short description"
            />
            <Textarea
              maxLength={200}
              id="shortDescription"
              {...register("shortDescription")}
              className="bg-transparent min-h-36"
            />
            {errors.shortDescription && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.shortDescription.message}
              </span>
            )}
          </div>
          <div className="relative flex flex-col gap-2 w-full xl:w-1/2">
            <RequiredInputLabel htmlFor="description" label="Description" />
            <Textarea
              id="description"
              {...register("description")}
              className="bg-transparent min-h-36"
            />
            {errors.description && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
        <h2 className="text-xl font-bold">Images</h2>
        <ul className="w-full space-y-12 lg:space-y-6">
          {galleryFields.map((field, index) => (
            <li
              key={field.id}
              className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-end w-full"
            >
              <div className="relative w-full flex flex-col gap-2">
                <RequiredInputLabel htmlFor="image-url" label="Url" />
                <Input
                  id="image-url"
                  placeholder={DEFAULT_IMAGE_URL}
                  {...register(`gallery.${index}.imageUrl`)}
                />
                {errors.gallery?.[index]?.imageUrl && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.gallery?.[index]?.imageUrl.message}
                  </span>
                )}
              </div>
              <div className="relative w-full flex flex-col gap-2">
                <RequiredInputLabel htmlFor="image-alt" label="Alt" />
                <Input id="image-alt" {...register(`gallery.${index}.alt`)} />
                {errors.gallery?.[index]?.alt && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.gallery?.[index]?.alt.message}
                  </span>
                )}
              </div>
              <div className="relative w-full flex flex-col gap-2">
                <Label htmlFor="image-description">Description</Label>
                <Input
                  id="image-description"
                  {...register(`gallery.${index}.description`)}
                />
                {errors.gallery?.[index]?.description && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.gallery?.[index]?.description.message}
                  </span>
                )}
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
          {(watch("gallery")?.length &&
            watch("gallery")[0].imageUrl !== "" &&
            watch("gallery").map((image, index) => {
              //TODO: Make this works for guest users and allow to upload images from other sites
              //TODO: Add a script to modify the default drive url to the good one
              if (
                !image.imageUrl ||
                !image.imageUrl.includes(DEFAULT_IMAGE_URL) ||
                image.imageUrl.length === DEFAULT_IMAGE_URL.length
              ) {
                return (
                  <div
                    key={index}
                    className="aspect-video max-sm:w-full sm:min-w-42 border border-darkPrimary flex items-center justify-center"
                  />
                );
              }
              return (
                <div
                  key={`${image.imageUrl}-${index}`}
                  className="aspect-video w-full sm:w-42"
                >
                  <ImageWithFallback
                    src={image.imageUrl}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    width={0}
                    height={0}
                    sizes={"100%"}
                    quality={40}
                    fallbackSrc="/images/error-placeholder.svg"
                  />
                </div>
              );
            })) || <></>}
        </div>
      </section>

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
                // defaultValue={field.value?.map((item) => item.value)}
                placeholder=">"
                maxCount={10}
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

      <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
        <h2 className="text-xl font-bold">Roles</h2>
        <ul className="w-full space-y-12 lg:space-y-6">
          {rolesFields.map((field, index) => (
            <li
              key={field.id}
              className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-end w-full"
            >
              <div className="relative w-full flex flex-col gap-2">
                <RequiredInputLabel htmlFor="role-label" label="Name" />
                <Input id="role-label" {...register(`roles.${index}.label`)} />
                {errors.roles?.[index]?.label && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.roles?.[index]?.label.message}
                  </span>
                )}
              </div>
              <div className="relative w-full flex flex-col gap-2">
                <RequiredInputLabel htmlFor="role-value" label="Value" />
                <Input id="role-value" {...register(`roles.${index}.value`)} />
                {errors.roles?.[index]?.value && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.roles?.[index]?.value.message}
                  </span>
                )}
              </div>
              <div className="relative w-full flex flex-col gap-2 max-w-18">
                <Label htmlFor="role-percentage">%</Label>
                <Input
                  id="role-percentage"
                  type="number"
                  min={1}
                  max={100}
                  {...register(`roles.${index}.percentage`, {
                    min: 1,
                    max: 100,
                    valueAsNumber: true,
                  })}
                />
                {errors.roles?.[index]?.percentage && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.roles?.[index]?.percentage.message}
                  </span>
                )}
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
          {watch("roles")?.map((role, index) => {
            if (!role.value) return null;
            return (
              <div
                key={`${role.value}-${index}`}
                className="aspect-video w-full sm:w-42"
              >
                <Badge
                  onClick={(event) => {
                    event.stopPropagation();
                    rolesRemove(index);
                  }}
                  className="p-3 text-sm bg-darkPrimary cursor-pointer"
                >
                  {role.label}
                  <XCircle className="ml-2 size-6 cursor-pointer" />
                </Badge>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
        <h2 className="text-xl font-bold">Entities</h2>
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
            <Label htmlFor="company">Company name</Label>
            <Input id="company" {...register("company")} />
            {errors.company && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.company.message}
              </span>
            )}
          </div>
          <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
            <Label htmlFor="companyUrl">
              Company Url
              {watch("companyUrl")?.includes("https://") && (
                <span>
                  {" > "}
                  <Link
                    href={getValues("companyUrl") || ""}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Open Website
                  </Link>
                </span>
              )}
            </Label>
            <Input id="companyUrl" {...register("companyUrl")} />
            {errors.companyUrl && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.companyUrl.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
            <Label htmlFor="client">Client name</Label>
            <Input id="client" {...register("client")} />
            {errors.client && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.client.message}
              </span>
            )}
          </div>
          <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
            <Label htmlFor="clientUrl">
              Client Url
              {watch("clientUrl")?.includes("https://") && (
                <span>
                  {" > "}
                  <Link
                    href={getValues("clientUrl") || ""}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Open Website
                  </Link>
                </span>
              )}
            </Label>
            <Input id="clientUrl" {...register("clientUrl")} />
            {errors.clientUrl && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.clientUrl.message}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
        <h2 className="text-xl font-bold">Extra content</h2>
        <div className="relative flex flex-col gap-2">
          <Label htmlFor="repository">
            Github Repository Url
            {watch("repository")?.includes("https://github.com/") && (
              <span>
                {" > "}
                <Link
                  href={getValues("repository") || ""}
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  Explore project
                </Link>
              </span>
            )}
          </Label>
          <Input id="repository" {...register("repository")} />
          {errors.repository && (
            <span className="absolute -bottom-4 text-secondary text-xs">
              {errors.repository.message}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-2">
          <Label htmlFor="websiteUrl">
            Website Url
            {watch("websiteUrl")?.includes("https://") && (
              <span>
                {" > "}
                <Link
                  href={getValues("websiteUrl") || ""}
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  Open Website
                </Link>
              </span>
            )}
          </Label>
          <Input id="websiteUrl" {...register("websiteUrl")} />
          {errors.websiteUrl && (
            <span className="absolute -bottom-4 text-secondary text-xs">
              {errors.websiteUrl.message}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
            <Label htmlFor="videoTitle">Video Title</Label>
            <Input id="videoTitle" {...register("videoTitle")} />
            {errors.videoTitle && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.videoTitle.message}
              </span>
            )}
          </div>
          <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
            <Label htmlFor="videoDescription">Video Description</Label>
            <Input id="videoDescription" {...register("videoDescription")} />
            {errors.videoDescription && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.videoDescription.message}
              </span>
            )}
          </div>
        </div>
        <div className="relative flex flex-col gap-2">
          <Label htmlFor="videoUrl">
            Youtube Video Url
            {watch("videoUrl")?.includes("https://www.youtube.com/") && (
              <span>
                {" > "}
                <Link
                  href={getValues("videoUrl") || ""}
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  Watch video
                </Link>
              </span>
            )}
          </Label>
          <Input id="videoUrl" {...register("videoUrl")} />
          {errors.videoUrl && (
            <span className="absolute -bottom-4 text-secondary text-xs">
              {errors.videoUrl.message}
            </span>
          )}
        </div>
      </section>

      <div className="w-full flex flex-col items-center gap-4 mt-10 mb-14">
        <ButtonForm actionType={actionType} className="!w-full max-w-72" />
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
