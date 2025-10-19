import type { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Article({ id, children, className = "" }: Props) {
  return (
    <a
      href={`/articulos/${id}`}
      className={`overflow-hidden transition-transform hover:-translate-y-2 duration-200 ${className}`}
    >
      {children}
    </a>
  );
}
