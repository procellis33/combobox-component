import axios from "axios";
import type { z } from "zod";
import {
  PARSE_RESPONSE_ERROR,
  PARSE_REQUEST_ERROR,
  UNKNOWN_ERROR,
} from "@/consts.ts";

export enum EHTTPMethod {
  GET = "GET",
  POST = "POST",
}

export enum EHTTPStatusCode {
  OK = 200,
}

const api = <Request, Response>({
  method,
  path,
  requestSchema,
  responseSchema,
}: {
  method: EHTTPMethod;
  path: string;
  requestSchema: z.ZodType<Request>;
  responseSchema: z.ZodType<Response>;
}): ((data: Request) => Promise<Response>) => {
  return function (requestData: Request) {
    // * Validating request data
    if (!requestSchema.safeParse(requestData).success)
      throw new Error(PARSE_REQUEST_ERROR);

    async function apiCall() {
      try {
        const response = await axios({
          baseURL: import.meta.env.VITE_API_URL,
          method,
          url: path,
          [method === EHTTPMethod.GET ? "params" : "data"]: requestData,
        });

        if (response.status !== EHTTPStatusCode.OK) {
          throw new Error(response.statusText);
        }

        // * Validating response data
        await responseSchema
          .safeParseAsync(response.data)
          .then((result) => {
            if (!result.success) {
              throw new Error(PARSE_RESPONSE_ERROR);
            }
          })
          .catch((e: unknown) => {
            if (e instanceof Error) {
              throw new Error(e.message);
            }
            throw new Error(UNKNOWN_ERROR);
          });

        return response.data as Response;
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
        throw new Error(UNKNOWN_ERROR);
      }
    }
    return apiCall();
  };
};

export default api;
