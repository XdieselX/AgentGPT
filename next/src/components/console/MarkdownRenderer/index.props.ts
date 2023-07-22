import type { ReactNode } from "react";

export interface CustomCodeBlockProps {
  inline?: boolean;
  className?: string;
  children: ReactNode;
}

export interface CustomPreProps {
  children: ReactNode;
}

export interface CustomLinkProps {
  children: ReactNode;
  href: string;
}
