import type { PropsWithChildren, ReactNode } from "react";
import type { Message } from "../..";

export interface HeaderProps {
  title?: string | ReactNode;
  messages: Message[];
  onSave?: (format: string) => void;
}

export interface MacWindowInternalProps extends PropsWithChildren {
  className?: string;
}
