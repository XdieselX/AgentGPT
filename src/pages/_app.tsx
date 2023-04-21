import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { GoogleAnalytics } from "nextjs-google-analytics";

import { api } from "../utils";

import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Analytics />
        <GoogleAnalytics />
      </SessionProvider>
      <Toaster />
    </>
  );
};

export default api.withTRPC(MyApp);
