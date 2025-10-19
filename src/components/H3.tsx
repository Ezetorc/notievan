import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function H3({ children, className = "" }: Props) {
  return (
    <h3 className={`text-black font-bold line-clamp-4 ${className}`}>
      {children}
    </h3>
  );
}
