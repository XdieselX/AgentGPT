import type { ReactNode } from "react";

export interface LinkItemProps {
  title: string;
  children: ReactNode;
  href?: string;
  badge?: string;
  onClick: () => void;
}
