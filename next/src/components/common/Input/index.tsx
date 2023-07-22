import React from "react";
import {
  Label,
  Combobox
} from ".."
import clsx from "clsx";
import { isArrayOfType } from "../../../utils";
import { InputProps } from "./index.props";
import {
  FaRegEye,
  FaRegEyeSlash
} from "react-icons/fa"

export const Input = (props: InputProps) => {
  const {
    small,
    placeholder,
    left,
    value,
    type,
    onChange,
    setValue,
    disabled,
    attributes,
    inputRef,
    toolTipProperties,
    onKeyDown,
  } = props;

  const [isHidden, setIsHidden] = React.useState(false);

  const isTypeCombobox = () => type === "combobox";

  const isTypeRange = () => type === "range";

  const isTypeTextArea = () => type === "textarea";

  const isTypePassword = () => type === "password";

  const handleApiKeyToggle = (e) => setIsHidden(!isHidden);

  let inputElement: string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;

  if (isTypeTextArea()) {
    inputElement = (
      <textarea
        className={clsx(
          "border:black delay-50 h-15 background-color-5 placeholder:text-color-tertiary text-color-primary border-color-1 border-focusVisible-1 border-hover-1 w-full resize-none rounded-xl border-2 p-2 text-sm tracking-wider outline-0 transition-all sm:h-20 md:text-lg",
          disabled && "cursor-not-allowed",
          left && "md:rounded-l-none",
          small && "text-sm sm:py-[0]"
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...attributes}
      />
    );
  } else {
    inputElement = (
      <input
        className={clsx(
          "background-color-5 placeholder:text-color-tertiary text-color-primary border-color-1 border-focusVisible-1 border-hover-1 w-full rounded-xl border-2 p-2 py-1 text-sm tracking-wider outline-0 transition-all duration-200 sm:py-3 md:text-lg",
          disabled && "cursor-not-allowed",
          left && "md:rounded-l-none",
          small && "text-sm sm:py-[0]"
        )}
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...attributes}
      />
    );
  }

  return (
    <div className="items-left z-5 text-color-primary flex h-fit w-full flex-col rounded-xl font-mono text-lg md:flex-row md:items-center">
      {left && <Label left={left} type={type} toolTipProperties={toolTipProperties} />}
      {inputElement}
    </div>
  );
};
