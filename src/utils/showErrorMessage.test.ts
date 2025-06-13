import { toast } from "sonner";

import { SAMPLE_ACTION } from "@/lib/constants";

import { showErrorMessage } from "./showErrorMessage";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    warning: jest.fn(),
  },
}));

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

describe("showErrorMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
    console.warn = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });

  it("should show warning toast and log warning for sample actions", () => {
    const error = { message: SAMPLE_ACTION };

    showErrorMessage(error);

    expect(toast.warning).toHaveBeenCalledWith(
      "This is a sample action with no effects."
    );
    expect(toast.error).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(SAMPLE_ACTION);
    expect(console.error).not.toHaveBeenCalled();
  });

  it("should show error toast and log error for regular errors", () => {
    const errorMessage = "Something went wrong";
    const error = { message: errorMessage };

    showErrorMessage(error);

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
    expect(toast.warning).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("should handle empty error messages", () => {
    const error = { message: "" };

    showErrorMessage(error);

    expect(toast.error).toHaveBeenCalledWith("");
    expect(console.error).toHaveBeenCalledWith("");
  });
});
