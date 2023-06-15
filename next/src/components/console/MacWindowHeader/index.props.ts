import type { ReactNode } from "react";
import type { Message } from "../..";

export interface HeaderProps {
  title?: string | ReactNode;
  messages: Message[];
  onSave?: (format: string) => void;
}
