import { ReactNode } from "react";

export interface MenuProps {
  icon?: ReactNode;
  name: string;
  items: JSX.Element[];
  disabled?: boolean;
  onChange: (value: string) => void;
  styleClass?: { [key: string]: string };
}
