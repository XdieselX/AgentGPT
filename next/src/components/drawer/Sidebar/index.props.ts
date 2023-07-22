import { ReactNode } from "react";

export type DisplayProps = {
  show: boolean;
  setShow: (boolean) => void;
};


export type SidebarProps = DisplayProps & {
  children: ReactNode;
  side: "left" | "right";
};

export type SidebarTransitionProps = {
  side: "left" | "right";
  children: ReactNode;
  show: boolean;
};
