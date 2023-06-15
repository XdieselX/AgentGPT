import { Ring } from "@uiball/loaders";
import type { FC } from "react";
import type { LoaderProps } from "./index.props";

const Loader: FC<LoaderProps> = (props : LoaderProps) => {
  const {
    className,
    size = 16,
    speed = 2,
    lineWeight = 7,
    color = "#fff",
  } = props;
  return (
    <div className={className}>
      <Ring size={size} speed={speed} color={color} lineWeight={lineWeight} />
    </div>
  );
};

export { Loader };
