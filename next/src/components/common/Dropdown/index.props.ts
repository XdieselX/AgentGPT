export interface DropdownProps {
  left?: React.ReactNode;
  value: string;
  options: string[];
  disabled?: boolean;
  setCustomModelName: (key: string) => void;
}
