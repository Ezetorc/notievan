import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function H4({ children, className = "" }: Props) {
  return <h4 className={`text-brand-red ${className}`}>{children}</h4>;
}
