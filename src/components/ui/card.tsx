import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function Card({ className, glass = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 p-6 transition-all duration-300",
        glass && "bg-white/[0.03] backdrop-blur-xl",
        "hover:border-white/20 hover:bg-white/[0.06]",
        className
      )}
      {...props}
    />
  );
}