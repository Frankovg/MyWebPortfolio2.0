import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

import { useProjectFormStore } from "@/stores/use-project-form-store";

import type { TProjectForm } from "@/lib/validations";

type ProjectFormMethods = {
  register: UseFormRegister<TProjectForm>;
  control: Control<TProjectForm>;
  watch: UseFormWatch<TProjectForm>;
  getValues: UseFormGetValues<TProjectForm>;
  trigger: UseFormTrigger<TProjectForm>;
};

export function useProjectFormMethods(): ProjectFormMethods | null {
  const register = useProjectFormStore((s) => s.register);
  const control = useProjectFormStore((s) => s.control);
  const watch = useProjectFormStore((s) => s.watch);
  const getValues = useProjectFormStore((s) => s.getValues);
  const trigger = useProjectFormStore((s) => s.trigger);

  if (!register || !control || !watch || !getValues || !trigger) {
    return null;
  }

  return { register, control, watch, getValues, trigger };
}
