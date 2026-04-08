import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "yellow" | "green" | "gray";
  className?: string;
}

export function Badge({ children, variant = "purple", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
        variant === "purple" && "bg-purple-500/20 text-purple-300 border border-purple-500/30",
        variant === "yellow" && "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
        variant === "green" && "bg-green-500/20 text-green-300 border border-green-500/30",
        variant === "gray" && "bg-slate-700 text-slate-300 border border-slate-600",
        className
      )}
    >
      {children}
    </span>
  );
}
