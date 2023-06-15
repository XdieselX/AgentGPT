import type {
  MouseEventHandler,
  PropsWithChildren
} from "react";

export interface MotionProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  duration?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
