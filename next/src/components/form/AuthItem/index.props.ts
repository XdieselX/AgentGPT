import type { Session } from "next-auth";

export interface AuthItemProps {
  session: Session | null;
  classname?: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}
