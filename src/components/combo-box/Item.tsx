import React, { forwardRef, useId } from "react";
import { twMergeClasses } from "@/helpers/twMergeClasses.ts";

interface IItemProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

const Item = forwardRef<
  HTMLDivElement,
  IItemProps & React.HTMLProps<HTMLDivElement>
>(({ children, active = false, className, ...props }, ref) => {
  const id = useId();
  return (
    <div
      ref={ref}
      role="option"
      id={id}
      aria-selected={active}
      {...props}
      className={twMergeClasses(
        "text-start w-full block truncate rounded-none items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-4 py-2 sm:py-2.5 cursor-pointer select-none",
        className,
        active && "bg-zinc-200 dark:bg-slate-900",
      )}
    >
      {children}
    </div>
  );
});
Item.displayName = "ComboBoxItem";

export { Item as ComboBoxItem };
