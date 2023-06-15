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
            "center flex min-w-[8em] items-center rounded-xl rounded-r-none",
            type !== "range" && "border-white/10 md:border-2 md:border-r-0",
            "py-2 text-sm font-semibold tracking-wider transition-all md:py-3 md:pl-3 md:text-lg",
            isTypeTextArea() && "md:h-20"
          )}
        >
          {left}
        </div>
      }
      sideOffset={0}
      toolTipProperties={toolTipProperties}
    />
  );
};

export {
  Label
};
