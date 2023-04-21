import type { Session } from "next-auth";

export interface DrawerProps{
  showHelp: () => void;
  showSettings: () => void;
}

export interface DrawerItemProps
  extends Pick<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "target"
  > {
  icon: React.ReactNode;
  text: string;
  border?: boolean;
  onClick?: () => any;
  className?: string;
  small?: boolean;
}

export interface AuthItemProps{
  session: Session | null;
  signIn: () => void;
  signOut: () => void;
}

export interface ProItemProps{
  session: Session | null;
  sub: () => any;
  manage: () => any;
}
