import { toolTipProperties } from "../..";

export interface InputProps {
  left?: React.ReactNode;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  setValue?: (value: string) => void;
  type?: "text" | "combobox" | "range" | "textarea" | "password";
  attributes?: { [key: string]: string | number | string[] };
  toolTipProperties?: toolTipProperties;
  inputRef?: React.RefObject<HTMLInputElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
