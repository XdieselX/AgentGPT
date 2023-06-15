import { toolTipProperties } from "../..";

export interface InputProps {
  small?: boolean; // Will lower padding and font size. Currently only works for the default input
  left?: React.ReactNode;
  value: string | number | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  disabled?: boolean;
  setValue?: (value: string) => void;
  subType?: string;
  type?: "text" | "combobox" | "range" | "textarea" | "password";
  attributes?: { [key: string]: string | number | string[] };
  toolTipProperties?: toolTipProperties;
  inputRef?: React.RefObject<HTMLInputElement>;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
}
