import type { ReactNode } from "react";
import type { Message } from "../..";
import type { HeaderProps } from "../MacWindowHeader/index.props";

export interface ChatControls {
  value: string;
  onChange: (arg: string) => void;
  handleChat: () => Promise<void>;
  loading?: boolean;
}

export interface ChatWindowProps extends HeaderProps {
  children?: ReactNode;
  setAgentRun?: (name: string, goal: string) => void;
  visibleOnMobile?: boolean;
  chatControls?: ChatControls;
}

export interface ChatMessageProps {
  message: Message;
  className?: string;
}
