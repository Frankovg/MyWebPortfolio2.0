import { useProjectFormStore } from "@/stores/use-project-form-store";

export function useProjectForm() {
  const register = useProjectFormStore((s) => s.register);
  const control = useProjectFormStore((s) => s.control);
  const errors = useProjectFormStore((s) => s.errors);
  const watch = useProjectFormStore((s) => s.watch);
  const getValues = useProjectFormStore((s) => s.getValues);
  const trigger = useProjectFormStore((s) => s.trigger);
  const isPending = useProjectFormStore((s) => s.isPending);
  const onSubmit = useProjectFormStore((s) => s.onSubmit);

  const isReady = !!register && !!control;

  return {
    register: register!,
    control: control!,
    errors,
    watch: watch!,
    getValues: getValues!,
    trigger: trigger!,
    isPending,
    onSubmit,
    isReady,
  };
}
