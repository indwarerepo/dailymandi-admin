import { forwardRef, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

import { Eye, EyeOff, Lock } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const CustomPasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        prefixIcon={<Lock className="h-5 w-5 text-pophover-foreground" />}
        suffix={
          showPassword ? (
            <Eye className="h-5 w-5" onClick={() => setShowPassword(false)} />
          ) : (
            <EyeOff className="h-5 w-5" onClick={() => setShowPassword(true)} />
          )
        }
        type={showPassword ? "text" : "password"}
        className={cn(
          "border-none focus:border-none bg-card outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
CustomPasswordInput.displayName = "CustomPasswordInput";

export { CustomPasswordInput };
