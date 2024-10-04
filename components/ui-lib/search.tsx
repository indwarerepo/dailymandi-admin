/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";

import { SearchIcon } from "lucide-react";

export const Search = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-row items-center rounded-lg border border-borderColor text-sm",
          className
        )}
      >
        <Input
          type="search"
          placeholder={props.placeholder || "Search or type a command"}
          divclassName="border-none outline-none bg-transparent "
          className="border-none outline-none p-0 rounded-4xl h-8 text-sm bg-transparent text-foreground placeholder:text-foreground/40"
          autoComplete="off"
          autoCorrect="off"
        />
        <SearchIcon className="w-5 h-5 text-foreground" />
      </div>
    );
  }
);
