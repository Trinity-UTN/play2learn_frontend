import type { AxiosError } from "axios";
import { useToaster } from "./useToaster";

interface HandleApiErrorOptions {
  showAsToast?: boolean;
}

// Helper
const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError)?.isAxiosError === true;
};

export const useHandleApiError = () => {
  const { showToast } = useToaster();

  const handleApiError = (
    error: unknown,
    title: string,
    options: HandleApiErrorOptions = {}
  ): void => {
    const { showAsToast = true } = options;

    let backendMessage: string | undefined;

    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      const data = axiosError.response?.data;

      if (typeof data?.message === "string") {
        backendMessage = data.message;
      } else if (typeof data === "string") {
        backendMessage = data;
      }
    }

    if (showAsToast) {
      showToast({
        title,
        message: backendMessage,
        type: "error",
        position: "bottom-right",
      });
    }
  };

  return { handleApiError };
};
