import { Label } from "@components/ui/Label.tsx";
import { Input } from "@components/ui/Input.tsx";
import React from "react";
import { Error } from "@components/ui/Error.tsx";
import { InputWrapper } from "@components/custom-input/InputWrapper.tsx";
import { twMergeClasses } from "@helpers/twMergeClasses.ts";
import { IoClose } from "react-icons/io5";
import { Overlay } from "@components/ui/Overlay.tsx";

export interface ICustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  value?: string;
  label: string;
  errorMessage?: string;
  enableClearButton?: boolean;
  clearFunc?: () => void;
}

const CustomInput = React.forwardRef<HTMLInputElement, ICustomInputProps>(
  (
    {
      name,
      placeholder,
      enableClearButton,
      clearFunc,
      label,
      errorMessage,
      className,
      disabled,
      value,
      ...rest
    },
    ref,
  ) => {
    return (
      <InputWrapper className={className}>
        <Label
          className={twMergeClasses(errorMessage && "text-destructive")}
          htmlFor={name}
        >
          {label}
        </Label>
        <div className={"relative"}>
          <Input
            className={twMergeClasses("truncate", enableClearButton && "pr-7")}
            ref={ref}
            id={name}
            disabled={disabled}
            value={value}
            name={name}
            placeholder={placeholder}
            {...rest}
          />
          {enableClearButton && value && value.length !== 0 && (
            <button
              type={"button"}
              className={
                "flex items-center justify-center opacity-60 hover:opacity-100 transition absolute top-1/2 transform -translate-y-1/2 right-2 text-muted-foreground"
              }
              onClick={clearFunc}
              data-button-action={"clear"}
            >
              <IoClose className={"size-4.5"} />
            </button>
          )}
        </div>
        {errorMessage && <Error>{errorMessage}</Error>}
        {disabled && <Overlay className={"cursor-not-allowed"} />}
      </InputWrapper>
    );
  },
);
CustomInput.displayName = "CustomInput";

export { CustomInput };
