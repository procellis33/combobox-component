import { z } from "zod";
import api, { EHTTPMethod } from "@api/api.ts";

const UniversitySchema = z.object({
  alpha_two_code: z.string(),
  country: z.string(),
  "state-province": z.nullable(z.string()),
  domains: z.array(z.string()),
  name: z.string(),
  web_pages: z.array(z.string()),
});
const GetUniversitiesRequest = z.object({
  country: z.string(),
  name: z.string(),
});
const GetUniversitiesResponse = z.array(UniversitySchema);

const getUniversities = api<
  z.infer<typeof GetUniversitiesRequest>,
  z.infer<typeof GetUniversitiesResponse>
>({
  method: EHTTPMethod.GET,
  path: `/search`,
  requestSchema: GetUniversitiesRequest,
  responseSchema: GetUniversitiesResponse,
});

export { getUniversities };
