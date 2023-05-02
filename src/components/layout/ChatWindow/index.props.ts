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
  showDonation?: boolean;
  fullscreen?: boolean;
  scrollToBottom?: boolean;
  displaySettings?: boolean; //Controls whether the settings button is displayed at the bottom of the window
}

export interface ChatMessageProps {
  message: Message;
  className?: string;
}
