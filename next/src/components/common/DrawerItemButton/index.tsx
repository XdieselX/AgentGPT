import React from "react";
import clsx from "clsx";
import type { DrawerItemProps } from "./index.props";

export const DrawerItemButton = (props: DrawerItemProps) => {
  const { text, onClick } = props;

  return (
    <button
      type="button"
      className={clsx(
        "cursor-pointer items-center rounded-md text-gray-200 hover:bg-white/5",
        props.className
      )}
      onClick={onClick}
    >
      <span className="text-sm">{text}</span>
    </button>
  );
};
