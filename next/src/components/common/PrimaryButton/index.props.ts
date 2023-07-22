import { ReactNode } from "react";

export interface PrimaryButtonProps{
  className?: string;
  children: ReactNode | string;
  icon?: React.ReactNode;
  onClick?: () => void | Promise<void>;
};
