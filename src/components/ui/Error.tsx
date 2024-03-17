import * as React from "react";
import { twMergeClasses } from "@/helpers/twMergeClasses.ts";

export interface IErrorProps extends React.HTMLProps<HTMLParagraphElement> {}

const Error = React.forwardRef<HTMLParagraphElement, IErrorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={twMergeClasses(
          "text-destructive text-sm font-semibold break-words h-full animate-slide-top",
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);
Error.displayName = "Error";

export { Error };
