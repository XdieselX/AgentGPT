import { ReactNode } from "react";
import { Message } from "../..";

export interface HeaderProps {
  title?: string | ReactNode;
  messages: Message[];
  onSave?: (format: string) => void;
}

export interface ChatWindowProps extends HeaderProps {
  children?: ReactNode;
  className?: string;
  messages: Message[];
  showDonation: boolean;
  fullscreen?: boolean;
  scrollToBottom?: boolean;
}
