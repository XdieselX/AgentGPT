import type { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}
