import React from "react";
import clsx from "clsx";
import { BadgeProps } from "./index.props";

export const Badge = (props: BadgeProps) => {
  const { className, colorClass, children } = props;
  return (
    <div
      className={clsx(
        className,
        colorClass || "bg-sky-500",
        "rounded-full font-semibold text-gray-100 transition-all hover:scale-110",
        "px-1 py-1 text-xs",
        "sm:px-3 sm:py-1 sm:text-sm"
      )}
    >
      {children}
    </div>
  );
};
