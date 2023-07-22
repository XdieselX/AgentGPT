export interface WindowButtonProps {
  ping?: boolean; //Toggles the ping animation
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;
  border?: boolean;
}
