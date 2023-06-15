import { ReactNode } from "react";

export interface MenuProps {
  icon?: ReactNode;
  chevron?: boolean;
  name?: string;
  items: JSX.Element[];
}
