import type { ReactNode } from "react";

export interface LinkItemProps {
  title: string;
  icon: ReactNode;
  href?: string;
  onClick: () => void;
}
