import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  divclassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, divclassName, prefixIcon, suffix, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "px-2 overflow-hidden w-full rounded-md border border-borderColor focus:border-borderColor bg-card flex flex-row gap-0 items-center",
          divclassName
        )}
      >
        {prefixIcon}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border-none focus:border-none px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/40 disabled:cursor-not-allowed disabled:opacity-50 max-[500px]:px-1",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
