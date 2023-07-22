import React, { memo } from "react";
import { Ping } from "../..";
import type { WindowButtonProps } from "./index.props";
import clsx from "clsx";

const WindowButton = (props: WindowButtonProps) => {
  const { ping, onClick, icon, text, border } = props;
  return (
    <div
      className={clsx(
        "background-color-2 text-color-primary hover:background-color-5 relative flex h-8 cursor-pointer items-center gap-2 rounded-lg p-2 font-mono text-sm font-bold transition-all",
        !border && "rounded-none border-none"
      )}
      onClick={onClick}
    >
      {ping ? <Ping color="blue" /> : <></>}
      {icon}
      <p className="text-gray/50 font-mono">{text}</p>
    </div>
  );
};

export {
  WindowButton
};
