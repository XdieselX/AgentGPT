import type { ReactNode } from "react";
import React from "react";
import { TextButtonProps } from "./index.props";
import { Button } from "../..";

export function TextButton(props: TextButtonProps) {
  const { children, icon, onClick } = props;
  return (
    <Button
      onClick={onClick}
      className="group rounded-full bg-transparent text-neutral-400 transition duration-200 ease-in-out hover:bg-neutral-900 hover:text-white focus-visible:bg-neutral-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-500"
    >
      {icon}
      {children}
    </Button>
  );
}
