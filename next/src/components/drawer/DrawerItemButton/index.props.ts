export interface DrawerItemProps {
  text: string;
  className?: string;
  onClick?: () => Promise<void> | void;
}
