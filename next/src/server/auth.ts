import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import { serverEnv } from "../env/schema.mjs";
import { sendVerificationRequest, sendWelcomeEmail } from "./nodemailer";

const providers = [
  GoogleProvider({
    clientId: serverEnv.GOOGLE_CLIENT_ID ?? "",
    clientSecret: serverEnv.GOOGLE_CLIENT_SECRET ?? "",
    allowDangerousEmailAccountLinking: true,
  }),
  GithubProvider({
    clientId: serverEnv.GITHUB_CLIENT_ID ?? "",
    clientSecret: serverEnv.GITHUB_CLIENT_SECRET ?? "",
    allowDangerousEmailAccountLinking: true,
  }),
  DiscordProvider({
    clientId: serverEnv.DISCORD_CLIENT_ID ?? "",
    clientSecret: serverEnv.DISCORD_CLIENT_SECRET ?? "",
    allowDangerousEmailAccountLinking: true,
  }),
  EmailProvider({
    server: {
      host: serverEnv.EMAIL_SERVER_HOST ?? "",
      port: Number(serverEnv.EMAIL_SERVER_PORT ?? "465"),
      auth: {
        user: serverEnv.EMAIL_SERVER_USER ?? "",
        pass: serverEnv.EMAIL_SERVER_PASSWORD ?? "",
      },
    },
    from: serverEnv.EMAIL_FROM,
    maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    sendVerificationRequest
  }),
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // You can also use the `req` object to obtain additional parameters
      // (i.e., the request IP address)
      /*const res = await fetch("/your/endpoint", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })*/
      const user = {
        id: "1",
        email: "jsmith@example.com",
        name: "J Smith",
        role: "ADMIN",
        image: "https://example.com/image.png",
        subscriptionId: "123"
        //await res.json()
      }

      console.log("user", user)
      // If no error and we have user data, return it
      if (/*res.ok &&*/ user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
];

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.subscriptionId = user.subscriptionId;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers,
  theme: {
    colorScheme: "dark",
    logo: "https://agentgpt.reworkd.ai/logo-white.svg",
  },
  events: {
    createUser: sendWelcomeEmail,
  }
};

/**
 * Wrapper for getServerSession so that you don't need
 * to import the authOptions in every file.
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
