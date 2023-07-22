import clsx from "clsx";
import { GlowWrapperProps } from "./index.props";

const GlowWrapper = ({ children, className }: GlowWrapperProps) => {
  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className={clsx(
          className || "opacity-50",
          "absolute -inset-1 rounded-full bg-gradient-to-tr from-[#A02BFE] to-[#1152FA] blur-lg transition-all duration-1000"
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export {
  GlowWrapper
};
