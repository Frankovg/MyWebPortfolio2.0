import { toast } from "sonner";

import { SAMPLE_ACTION } from "@/lib/action-constants";

export const showErrorMessage = (error: { message: string }) => {
  if (error.message === SAMPLE_ACTION) {
    toast.warning("This is a sample action with no effects.");
    console.warn(error.message);
  } else {
    toast.error(error.message);
    if (process.env.NODE_ENV === "development") {
      console.error(error.message);
    }
  }
};
