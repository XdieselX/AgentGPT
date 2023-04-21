// @ts-check
import { z } from "zod";

const requiredForProduction = () => process.env.NODE_ENV === "production"
    ? z.string().min(1).trim()
    : z.string().min(1).trim().optional()


const stringToBoolean = () =>
    z.preprocess(
    (str) => str === "true",
    z.boolean()
  );

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),

  DATABASE_URL: z.string().url(),

  NEXTAUTH_SECRET: requiredForProduction(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string() : z.string().url(),
  ),

  WEIVIATE_CLUSTER_SCHEME: z.enum(["http", "https"]),
  WEIVIATE_CLUSTER_URL: z.string(),
  WEIVIATE_CLUSTER_TOKEN: z.string(),

  OPENAI_API_KEY: z.string(),
  ELEVENLABS_API_KEY: z.string().optional(),
  GOOGLE_API_KEY: z.string().optional(),
  CUSTOM_SEARCH_ENGINE_ID: z.string().optional(),
  HUGGINGFACE_API_TOKEN: z.string().optional(),
  NEWS_API_KEY: z.string().optional(),

  GPTCHAT_DEBUG: z.string().optional(),
  GPTCHAT_SUPERVISOR: z.string().optional(),

  GOOGLE_CLIENT_ID: requiredForProduction(),
  GOOGLE_CLIENT_SECRET: requiredForProduction(),
  GITHUB_CLIENT_ID: requiredForProduction(),
  GITHUB_CLIENT_SECRET: requiredForProduction(),
  DISCORD_CLIENT_ID: requiredForProduction(),
  DISCORD_CLIENT_SECRET: requiredForProduction(),

  EMAIL_SERVER_HOST: requiredForProduction(),
  EMAIL_SERVER_PORT: z.string().optional(),
  EMAIL_SERVER_USER: requiredForProduction(),
  EMAIL_SERVER_PASSWORD: requiredForProduction(),
  EMAIL_FROM: requiredForProduction(),

  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_SUBSCRIPTION_PRICE_ID: z.string().optional(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.input<typeof serverSchema>]: string | undefined }}
 */
export const serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,

  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  WEIVIATE_CLUSTER_SCHEME: process.env.WEIVIATE_CLUSTER_SCHEME,
  WEIVIATE_CLUSTER_URL: process.env.WEIVIATE_CLUSTER_URL,
  WEIVIATE_CLUSTER_TOKEN: process.env.WEIVIATE_CLUSTER_TOKEN,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  DISCORD_CLIENT_ID:  process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  STRIPE_SUBSCRIPTION_PRICE_ID: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,

  EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT == "" ? "465" : process.env.EMAIL_SERVER_PORT,
  EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
};

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
  NEXT_PUBLIC_VERCEL_ENV: z.enum(["production", "preview", "development"]),
  //NEXT_PUBLIC_STRIPE_DONATION_URL: z.string().url().optional(),
  NEXT_PUBLIC_FF_AUTH_ENABLED: stringToBoolean(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  NEXT_PUBLIC_FF_SUB_ENABLED: stringToBoolean(),
  NEXT_PUBLIC_FF_MOCK_MODE_ENABLED: stringToBoolean(),
  NEXT_PUBLIC_VERCEL_URL: z.string().optional()
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.input<typeof clientSchema>]: string | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000",
  //NEXT_PUBLIC_STRIPE_DONATION_URL: process.env.NEXT_PUBLIC_STRIPE_DONATION_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_FF_SUB_ENABLED: process.env.NEXT_PUBLIC_FF_SUB_ENABLED,
  NEXT_PUBLIC_FF_AUTH_ENABLED: process.env.NEXT_PUBLIC_FF_AUTH_ENABLED,
  NEXT_PUBLIC_FF_MOCK_MODE_ENABLED: process.env.NEXT_PUBLIC_FF_MOCK_MODE_ENABLED,
};
