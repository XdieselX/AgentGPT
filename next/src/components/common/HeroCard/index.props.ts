import { ReactNode } from "react";

export type HeroCardProps = {
  title: string;
  subtitle: string;
  leftIcon: ReactNode;
  onClick?: () => void;
};
