import { type ClassValue as TClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const twMergeClasses = (...inputs: TClassValue[]) => {
  return twMerge(clsx(inputs));
};

export { twMergeClasses };
