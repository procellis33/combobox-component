import * as React from "react";
import { twMergeClasses } from "@helpers/twMergeClasses.ts";

export interface IInputWrapperProps extends React.HTMLProps<HTMLDivElement> {}

const InputWrapper = React.forwardRef<HTMLDivElement, IInputWrapperProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMergeClasses("w-full grid gap-y-1.5 relative", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
InputWrapper.displayName = "InputWrapper";

export { InputWrapper };
