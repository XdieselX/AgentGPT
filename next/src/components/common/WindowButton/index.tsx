import React, { memo } from "react";
import { Ping } from "../..";
import type { WindowButtonProps } from "./index.props";
import clsx from "clsx";

const WindowButton = (props: WindowButtonProps) => {
  const { ping, onClick, icon, name, border } = props;
  return (
    <div
      className={clsx(
        "relative flex h-8 cursor-pointer items-center gap-2 bg-[#3a3a3a] p-2 font-mono text-sm font-bold transition-all hover:bg-white/10",
        border && "rounded-lg border border-white/30 hover:border-[#1E88E5]/40 hover:bg-[#6b6b6b]"
      )}
      onClick={onClick}
    >
      {ping ? <Ping color="blue" /> : <></>}
      {icon}
      <p className="text-gray/50 font-mono">{name}</p>
    </div>
  );
};

export {
  WindowButton
};
