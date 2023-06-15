import type { PropsWithChildren } from "react";

export interface MotionProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  duration?: number;
  initialX?: number;
  initialY?: number;
}
