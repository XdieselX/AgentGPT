import { PropsWithChildren } from "react";

export interface MotionProps extends PropsWithChildren {
  showComponent: boolean;
  className?: string;
}
