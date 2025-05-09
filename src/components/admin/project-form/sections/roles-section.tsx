"use client";

import { PlusIcon } from "lucide-react";
import { Controller, useFieldArray } from "react-hook-form";

import ButtonMinimal from "@/components/primitives/button-minimal";
import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectFormContext } from "@/hooks/use-project-form";

import { ProjectFormRolesViewer } from "./project-form-roles-viewer";

export function RolesSection() {
  const { control, errors, watch } = useProjectFormContext();

  const {
    fields: rolesFields,
    append: rolesAppend,
    remove: rolesRemove,
  } = useFieldArray({
    rules: { minLength: 1, required: "Please add at least 1 role." },
    name: "roles",
    control,
  });

  return (
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
  );
}
