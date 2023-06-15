import { toolTipProperties } from "../..";

export interface TooltipProps {
  child: React.ReactNode;
  toolTipProperties?: toolTipProperties;
  style?: { [key: string]: string };
  sideOffset: number;
}
