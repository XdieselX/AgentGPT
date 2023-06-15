import type { Dispatch, SetStateAction } from "react";

export interface ToastProps {
  model: [boolean, Dispatch<SetStateAction<boolean>>];
  onAction?: () => void;
  title: string;
  description?: string;
  className?: string;
};
