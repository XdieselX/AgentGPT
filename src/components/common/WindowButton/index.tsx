import React, { memo } from "react";
import { Ping } from "../..";
import { WindowButtonProps } from "./index.props";

const IWindowButton = (props: WindowButtonProps) => {
  const { ping, delay, onClick, icon, name, styleClass } = props;
  return (
    <div
      className={`flex cursor-pointer items-center gap-2 p-1 px-2 text-sm hover:bg-white/10 ${
        styleClass?.container || ""
      }`}
      onClick={onClick}
    >
      {ping ? <Ping color="blue" /> : <></>}
      {icon}
      <p className="font-mono">{name}</p>
    </div>
  );
};

const WindowButton = memo(IWindowButton);

export {
  WindowButton
};
