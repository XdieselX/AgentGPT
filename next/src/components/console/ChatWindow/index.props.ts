import type { ReactNode } from "react";
import type { Message } from "../..";
import type { HeaderProps } from "../MacWindowHeader/index.props";

export interface ChatWindowProps extends HeaderProps {
  children?: ReactNode;
  fullscreen?: boolean;
  scrollToBottom?: boolean;
  setAgentRun?: (name: string, goal: string) => void;
  visibleOnMobile?: boolean;
}

export interface ChatMessageProps {
  message: Message;
  className?: string;
}
