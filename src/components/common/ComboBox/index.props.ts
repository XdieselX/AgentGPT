export interface ComboboxProps {
  value: string;
  options: string[];
  left?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
}
