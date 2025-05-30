import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Input } from "@/components/ui/input";
import { Action } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type DownloadsFormProps = {
  actionType: Action;
};

export const DownloadsForm = ({ actionType }: DownloadsFormProps) => {
  const {
    register,
    trigger,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<TDownloadForm>({
    resolver: zodResolver(downloadFormSchema),
    defaultValues: {},
  });

  const onSubmit = () => {};
  return (
    <form className="relative flex flex-wrap gap-6" action={() => onSubmit()}>
      <section className="px-6 pt-4 pb-8 w-full space-y-6 border border-darkPrimary">
        <h2 className="text-xl font-bold">File details</h2>
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="relative flex flex-col gap-2 w-full lg:w-1/2">
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
      </section>
    </form>
  );
};
