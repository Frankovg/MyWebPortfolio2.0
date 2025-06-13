import { toast } from "sonner";

import { SAMPLE_ACTION } from "@/lib/constants";

export const showErrorMessage = (error: { message: string }) => {
  if (error.message === SAMPLE_ACTION) {
    toast.warning("This is a sample action with no effects.");
    console.warn(error.message);
  } else {
    toast.error(error.message);
    console.error(error.message);
  }
};
