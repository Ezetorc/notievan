import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function H5({ children, className = "" }: Props) {
  return (
    <h5 className={`text-gray-700 text-[18px] line-clamp-4 ${className}`}>
      {children}
    </h5>
  );
}
