export interface WindowButtonProps {
  ping?: boolean; //Toggles the ping animation
  onClick?: () => void;
  icon: React.ReactNode;
  name: string;
  border?: boolean;
}
