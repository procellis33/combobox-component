import React, { useCallback, useDeferredValue } from "react";
import { Button } from "@components/ui/Button.tsx";
import { Form } from "@components/ui/Form.tsx";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "@api/getUniversities";
import { useDebounce } from "@hooks/useDebounce.ts";
import { INPUT_DEBOUNCE_DELAY, REQUIRED_FIELD } from "@/consts.ts";
import { postImitation } from "@api/postImitation.ts";
import { ComboBox } from "@components/combo-box/ComboBox.tsx";
import { CustomInput } from "@components/custom-input/CustomInput.tsx";

const schema = z.object({
  name: z.string().min(1, REQUIRED_FIELD).min(2).max(40),
  university: z.string().max(100),
});

export type TFormValues = z.infer<typeof schema>;

const App: React.FC = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { university: "", name: "" },
  });

  const university = useWatch({ control, name: "university" });

  // * Request optimization
  const universityName = useDeferredValue(university)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  const debouncedValue = useDebounce(universityName, INPUT_DEBOUNCE_DELAY);

  const { data, isLoading } = useQuery({
    queryKey: ["universities", debouncedValue],
    queryFn: () =>
      getUniversities({
        country: "Czech Republic",
        name: debouncedValue,
      }),
    /*
     * Each request is stored in a cache. Cache cleans every 5 minutes by default.
     * staleTime option in React Query determines how long fetched data remains fresh.
     * Setting 'staleTime' to 'Infinity' means the cached data is always considered fresh.
     */
    staleTime: Infinity,
    retry: 2,
  });

  const onSubmit = handleSubmit(async (formValues: TFormValues) => {
    control._disableForm(true);

    // * Imitate sending data to server
    await postImitation(formValues);

    control._disableForm(false);

    control._reset();
  });

  const setUniversityValue = useCallback(
    (name: string) => {
      setValue("university", name, { shouldValidate: true });
    },
    [setValue],
  );

  return (
    <React.Fragment>
      <div
        className={
          "container flex flex-col justify-center items-center h-screen space-y-10"
        }
      >
        <Form className={"w-full max-w-sm"} onSubmit={onSubmit}>
          <Controller
            control={control}
            name={"name"}
            render={({ field: { ...fieldProps }, fieldState: { error } }) => (
              <CustomInput
                label={"Name"}
                placeholder={"Your name"}
                errorMessage={error?.message}
                {...fieldProps}
              />
            )}
          />

          <Controller
            control={control}
            name={"university"}
            render={({ field: { ...fieldProps }, fieldState: { error } }) => (
              <ComboBox
                label={"University"}
                placeholder={"Your university"}
                errorMessage={error?.message}
                dataIsLoading={isLoading}
                data={data}
                setValue={setUniversityValue}
                {...fieldProps}
              />
            )}
          />

          <Button type={"submit"} disabled={isSubmitting} className={"w-24"}>
            Submit
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};
App.displayName = "App";

export default App;
