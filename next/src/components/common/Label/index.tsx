import React from "react";
import { Tooltip } from "../..";
import { LabelProps } from "./index.props";
import clsx from "clsx";

const Label = (props: LabelProps) => {
  const { type, left, toolTipProperties } = props;

  const isTypeTextArea = () => type === "textarea";

  return (
    <Tooltip
      child={
        <div
          className={clsx(
            "center flex min-w-[8em] items-center rounded-xl md:border-2",
            type !== "range" && "md:border-color-1 md:rounded-r-none md:border-r-0",
            "md:background-color-5 text-color-secondary py-2 text-sm font-semibold tracking-wider transition-all md:py-3 md:pl-3 md:text-lg",
            isTypeTextArea() && "md:h-20"
          )}
        >
          {left}
        </div>
      }
      sideOffset={0}
      toolTipProperties={toolTipProperties}
    ></Tooltip>
  );
};

export {
  Label
};
