import { ReactNode } from "react";

export interface MenuProps {
  icon?: ReactNode;
  chevron?: boolean;
  name?: string;
  buttonPosition?: "top" | "bottom";
  items: JSX.Element[];
}

export type MenuItemsProps = {
  buttonPosition: "top" | "bottom";
  items: JSX.Element[];
  show?: boolean;
}
