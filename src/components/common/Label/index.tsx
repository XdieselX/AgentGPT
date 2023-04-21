import React from "react";
import { Tooltip } from "../..";
import { LabelProps } from "./index.props";


const Label = (props: LabelProps) => {
  const { left, type, toolTipProperties } = props;
  return (
    <Tooltip
      child={
        <div className={`center flex items-center rounded-xl rounded-r-none ${
            type !== "range" ? "border-r-0 border-white/10 md:border-[2px]" : ""
          }  py-2 text-sm font-semibold tracking-wider transition-all sm:py-3 md:pl-3 md:text-lg`}
        >
          {left}
        </div>
      }
      style={{
        container: `md:w-1/4`
      }}
      sideOffset={0}
      toolTipProperties={toolTipProperties}
    />
  );
};

export {
  Label
};