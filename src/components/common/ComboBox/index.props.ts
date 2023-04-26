export interface ComboboxProps {
  value: string;
  options: string[] | any[];
  disabled?: boolean;
  onChange: (value: string) => void;
  styleClass?: { [key: string]: string; };
}
