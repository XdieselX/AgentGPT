import React from "react";
import { PopIn } from "../..";
import { WindowButtonProps } from "./index.props";

const WindowButton = (props: WindowButtonProps) => {
  const { delay, onClick, icon, text } = props;
  return (
    <PopIn delay={delay}>
      <div
        className="mr-1 flex cursor-pointer items-center gap-2 rounded-full border-2 border-white/30 p-1 px-2 text-xs hover:bg-white/10"
        onClick={onClick}
      >
        {icon}
        <p className="font-mono">{text}</p>
      </div>
    </PopIn>
  );
};

export {
    WindowButton
};
