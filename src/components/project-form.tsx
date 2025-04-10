"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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

import ButtonMinimal from "./primitives/button-minimal";
import ImageWithFallback from "./primitives/image-with-fallback";
import { MultiSelect } from "./primitives/multi-select";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

type ProjectFormProps = {
  actionType: Action;
  categoryId: string;
};

const getDefaultTechStack = () => {
  return TECH_STACK_DATA.map((tech) => ({
    label: tech.name,
    value: tech.value,
  }));
};
const DEFAULT_TECH_STACK = getDefaultTechStack();

function ProjectForm({ actionType, categoryId }: ProjectFormProps) {
  const { createProjectByCategoryId } = useProjectContext();

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>();
  console.log(selectedFrameworks);

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
      image: DEFAULT_IMAGE_URL,
      title: "",
      shortDescription: "",
      description: "",
      slug: "",
      gallery: [
        {
          imageUrl: DEFAULT_IMAGE_URL,
          alt: "",
          description: "",
        },
      ],
      date: new Date(),
      repository: null,
      client: "",
      clientUrl: "",
      techStack: [],
      roles: [],
      published: true,
    },

    // defaultValues:
    //   actionType === "edit"
    //     ? {
    //         image: "",
    //         title: "",
    //         shortDescription: "",
    //         description: "",
    //         slug: "",
    //         gallery: [{ imageUrl: "", alt: "", description: "" }],
    //         date: new Date(),
    //         repository: null,
    //         client: "",
    //         clientUrl: "",
    //         techStack: [],
    //         roles: [],
    //         published: true,
    //       }
    //     : undefined,
  });

  // TODO: Add validation with zod
  // TODO: More info at https://react-hook-form.com/docs/usefieldarray
  // TODO: Watch example at https://codesandbox.io/p/sandbox/usefieldarray-llp6lw?file=%2Fsrc%2FApp.tsx
  const { fields, append, remove } = useFieldArray({
    rules: { minLength: 1, required: "Please add at least 1 picture." },
    name: "gallery",
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
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <span className="absolute -bottom-4 text-secondary text-xs">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
            <Label htmlFor="image">
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
            </Label>
            <Input
              id="image"
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
            <Label htmlFor="slug">Unique identifier</Label>
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
            <Label htmlFor="shortDescription">Short description</Label>
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
            <Label htmlFor="description">Description</Label>
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
          {fields.map((field, index) => (
            <li
              key={field.id}
              className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-end w-full"
            >
              <div className="relative w-full flex flex-col gap-2">
                <Label htmlFor="image-url">Url</Label>
                <Input
                  id="image-url"
                  {...register(`gallery.${index}.imageUrl`)}
                />
                {errors.gallery?.[index]?.imageUrl && (
                  <span className="absolute -bottom-4 text-secondary text-xs">
                    {errors.gallery?.[index]?.imageUrl.message}
                  </span>
                )}
              </div>
              <div className="relative w-full flex flex-col gap-2">
                <Label htmlFor="image-alt">Alt</Label>
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
                onClick={() => remove(index)}
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
              append({
                description: "",
                imageUrl: DEFAULT_IMAGE_URL,
                alt: "",
              })
            }
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {watch("gallery")?.map((image, index) => {
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
          })}
        </div>
      </section>

      <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
        <h2 className="text-xl font-bold">Tech stack</h2>
        <div className="relative flex flex-col gap-2">
          <Label htmlFor="websiteUrl">Select technologies</Label>
          <MultiSelect
            options={DEFAULT_TECH_STACK}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder=">"
            maxCount={10}
          />
        </div>
      </section>

      <div className="relative flex flex-col gap-2">
        <Label htmlFor="repository">Repository Url</Label>
        <Input id="repository" {...register("repository")} />
        {errors.repository && (
          <span className="absolute -bottom-4 text-secondary text-xs">
            {errors.repository.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-2">
        <Label htmlFor="websiteUrl">Website Url</Label>
        <Input id="websiteUrl" {...register("websiteUrl")} />
        {errors.websiteUrl && (
          <span className="absolute -bottom-4 text-secondary text-xs">
            {errors.websiteUrl.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-2">
        <Label htmlFor="videoTitle">Video Title</Label>
        <Input id="videoTitle" {...register("videoTitle")} />
        {errors.videoTitle && (
          <span className="absolute -bottom-4 text-secondary text-xs">
            {errors.videoTitle.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-2">
        <Label htmlFor="videoUrl">Video Url</Label>
        <Input id="videoUrl" {...register("videoUrl")} />
        {errors.videoUrl && (
          <span className="absolute -bottom-4 text-secondary text-xs">
            {errors.videoUrl.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-2">
        <Label htmlFor="videoDescription">Video Description</Label>
        <Input id="videoDescription" {...register("videoDescription")} />
        {errors.videoDescription && (
          <span className="absolute -bottom-4 text-secondary text-xs">
            {errors.videoDescription.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-2">
        <Label htmlFor="company">Company name</Label>
        <Input id="company" {...register("company")} />
        {errors.company && (
          <span className="absolute -bottom-4 text-secondary text-xs">
            {errors.company.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-2">
        <Label htmlFor="companyUrl">Company Url</Label>
        <Input id="companyUrl" {...register("companyUrl")} />
        {errors.companyUrl && (
          <span className="absolute -bottom-4 text-secondary text-xs">
            {errors.companyUrl.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-2">
        <Label htmlFor="client">Client name</Label>
        <Input id="client" {...register("client")} />
        {errors.client && (
          <span className="absolute -bottom-4 text-secondary text-xs">
            {errors.client.message}
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-2">
        <Label htmlFor="clientUrl">Client Url</Label>
        <Input id="clientUrl" {...register("clientUrl")} />
        {errors.clientUrl && (
          <span className="absolute -bottom-4 text-secondary text-xs">
            {errors.clientUrl.message}
          </span>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;
