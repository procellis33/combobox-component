import { toast } from "sonner";
import { DATA_SUCCESS, UNKNOWN_ERROR } from "@/consts.ts";
import { TFormValues } from "@/App.tsx";

type TPostImitationProps = (
  data: TFormValues,
  throwError?: boolean,
) => Promise<void>;

/**
 * Function to imitate a post request with optional error throwing.
 * @param data - The data to be submitted.
 * @param throwError - Optional. If true, the function throws an error.
 * @returns A promise that resolves after a timeout of 500ms, simulating a post request.
 */
export const postImitation: TPostImitationProps = async (data, throwError) => {
  await new Promise((r) => setTimeout(r, 500))
    .then(() => {
      if (throwError) throw new Error(UNKNOWN_ERROR);
      toast.success(DATA_SUCCESS, {
        description: `Name: ${data.name}, University: ${data.university ? data.university : "Not filled"}`,
      });
    })
    .catch(() => toast.error(UNKNOWN_ERROR));
};
