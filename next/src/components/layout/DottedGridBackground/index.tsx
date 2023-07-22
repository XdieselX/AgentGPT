import clsx from "clsx";
import React from "react";
import { DottedGridBackgroundProps } from "./index.props";

const DottedGridBackground = (props: DottedGridBackgroundProps) => {
  const { children, className } = props;
  return <div className={clsx(className, "dark:background-dark background")}>{children}</div>;
};

export {
  DottedGridBackground
};
