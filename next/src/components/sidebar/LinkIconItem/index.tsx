import clsx from "clsx";
import { LinkIconItemProps } from "./index.props";

const LinkIconItem = (props: LinkIconItemProps) => (
  <a
    href={props.href}
    className={clsx(
      "grid h-10 w-10 cursor-pointer place-items-center rounded-xl text-2xl",
      "neutral-button-primary border",
      "group group-hover:scale-110"
    )}
    onClick={(e) => {
      e.preventDefault();
      props.onClick();
    }}
  >
    {props.children}
  </a>
);

export {
  LinkIconItem
};
