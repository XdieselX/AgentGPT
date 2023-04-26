import React, { memo } from "react";
import { PopIn } from "../..";
import { WindowButtonProps } from "./index.props";

const IWindowButton = (props: WindowButtonProps) => {
  const { delay, onClick, icon, name, styleClass } = props;
  return (
    <PopIn delay={delay}>
      <div
        className={`flex cursor-pointer items-center gap-2 p-1 px-2 text-sm hover:bg-white/10 ${
          styleClass?.container || ""
        }`}
        onClick={onClick}
      >
        {icon}
        <p className="font-mono">{name}</p>
      </div>
    </PopIn>
  );
};

const WindowButton = memo(IWindowButton);

export {
  WindowButton
};
