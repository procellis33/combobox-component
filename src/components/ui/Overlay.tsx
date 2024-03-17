import * as React from "react";
import { twMergeClasses } from "@/helpers/twMergeClasses.ts";

export interface IOverlayProps extends React.HTMLProps<HTMLDivElement> {}

const Overlay = React.forwardRef<HTMLDivElement, IOverlayProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMergeClasses(
          "absolute w-full h-full bg-transparent z-50",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Overlay.displayName = "Overlay";

export { Overlay };
