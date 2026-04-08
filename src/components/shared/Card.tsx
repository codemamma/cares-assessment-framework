import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light" | "glass";
}

export function Card({ variant = "dark", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all",
        variant === "dark" && "bg-slate-900 border border-slate-800",
        variant === "light" && "bg-white border border-gray-200 shadow-sm",
        variant === "glass" &&
          "bg-white/5 backdrop-blur-sm border border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
