export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  loader?: boolean;
  disabled?: boolean;
  ping?: boolean;
  enabledClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
}
