import clsx from "clsx";
import { PrimaryButtonProps } from "./index.props";
import { Button } from "../..";

export function PrimaryButton(props : PrimaryButtonProps) {
  const { children, icon, onClick, className } = props;
  return (
    <Button
      onClick={onClick}
      className={clsx(
        "group rounded-full border border-black bg-white text-black transition duration-200 ease-in-out hover:hover:bg-neutral-200 focus-visible:bg-white/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30",
        className
      )}
    >
      {icon}
      {children}
    </Button>
  );
}
