import { FaArrowRight, FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import { BannerBadgeProps } from "./index.props";

export const BannerBadge = (props : BannerBadgeProps) => {
  const { children, onClick, className } = props;
  return (
    <div className="rounded-full bg-gradient-to-tl from-[#A02BFE] via-[#02FCF1] to-[#A02BFE] p-[1px] subpixel-antialiased">
      <a
        className={clsx(
          "animate-border-pulse py group relative flex w-max cursor-pointer items-center gap-2 rounded-full bg-black px-4 py-2 text-xs text-white",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <FaChevronRight
          size={10}
          className="font-thin text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
    </div>
  );
};