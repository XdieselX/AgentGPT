export interface SwitchProps {
  value: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}
