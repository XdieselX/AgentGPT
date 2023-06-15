
import clsx from "clsx";
import React from "react";
import type { ExampleAgentButtonProps } from "./index.props";


export const ExampleAgentButton = (props: ExampleAgentButtonProps) => {
  const { name, children, setAgentRun } = props;
  const handleClick = () => {
    if (setAgentRun) {
      setAgentRun(name, children);
    }
  };

  return (
    <div
      className={clsx(
        `w-full p-2 sm:w-[33%]`,
        `cursor-pointer rounded-lg font-mono text-sm sm:text-base`,
        `border-2 border-white/20 bg-gradient-to-t from-sky-500 to-sky-600 transition-all hover:bg-gradient-to-t hover:from-sky-400 hover:to-sky-600`
      )}
      onClick={handleClick}
    >
      <p className="text-lg font-black">{name}</p>
      <p className="mt-2 text-sm">{children}</p>
    </div>
  );
};
