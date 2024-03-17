import * as React from "react";
import { twMergeClasses } from "@/helpers/twMergeClasses.ts";

export interface IFormProps extends React.HTMLProps<HTMLFormElement> {}

const Form = React.forwardRef<HTMLFormElement, IFormProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={twMergeClasses("grid gap-y-4", className)}
        {...props}
      >
        {children}
      </form>
    );
  },
);
Form.displayName = "Form";

export { Form };
