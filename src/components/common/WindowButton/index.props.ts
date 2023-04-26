export interface WindowButtonProps {
  delay: number;
  onClick?: () => void;
  icon: React.ReactNode;
  name: string;
  styleClass?: { [key: string]: string; };
};
