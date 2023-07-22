import { ReactNode } from "react";

export interface LinkIconItemProps {
  children: ReactNode;
  href?: string;
  onClick: () => void;
}
