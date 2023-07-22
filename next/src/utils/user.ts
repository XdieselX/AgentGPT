import type { User } from "next-auth";

export const getAvatar = (user?: User) =>
  user?.image ||
  "https://avatar.vercel.sh/" +
    (user?.email || "") +
    ".svg?text=" +
    (user?.name?.substr(0, 2).toUpperCase() || "");
