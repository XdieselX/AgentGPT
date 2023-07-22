import { ReactNode } from "react";

export type TextButtonProps = {
  children: ReactNode | string;
  icon?: ReactNode;
  onClick?: () => void;
};
