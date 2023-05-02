export interface WindowButtonProps {
  ping?: boolean; //Toggles the ping animation
  delay?: number;
  onClick?: () => void;
  icon: React.ReactNode;
  name: string;
  styleClass?: { [key: string]: string; };
};
