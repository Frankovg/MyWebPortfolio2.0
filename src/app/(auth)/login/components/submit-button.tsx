import ButtonWhite from "@/components/primitives/button-white";

export const SubmitButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <ButtonWhite
      loading={isPending}
      disabled={isPending}
      text="Log in"
      className="mt-2 md:w-full"
      type="submit"
    />
  );
};
