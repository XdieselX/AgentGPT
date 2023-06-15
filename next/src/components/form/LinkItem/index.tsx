import clsx from "clsx";
import { LinkItemProps } from "./index.props";

export const LinkItem = (props: LinkItemProps) => (
  <li>
    <a
      href={props.href}
      className={clsx(
        "cursor-pointer text-neutral-400 hover:bg-neutral-800 hover:text-white",
        "group flex gap-x-3 rounded-md px-2 py-1 text-sm font-semibold leading-6"
      )}
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-[0.7rem] font-medium text-neutral-400 group-hover:scale-110 group-hover:text-white">
        {props.icon}
      </span>
      <span className="truncate">{props.title}</span>
    </a>
  </li>
);
