import * as React from "react";

import { twMergeClasses } from "@/helpers/twMergeClasses.ts";

export interface ILabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, ILabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={twMergeClasses(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Label.displayName = "Label";

export { Label };
