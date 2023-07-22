import React from "react";
import clsx from "clsx";
import { FadingHrProps } from "./index.props";

const FadingHr: React.FC<FadingHrProps> = ({ className }) => {
  return <div className={clsx(className, "fading-hr dark:fading-hr-dark")}></div>;
};
export { FadingHr };
