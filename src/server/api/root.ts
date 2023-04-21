import { createTRPCRouter } from "./trpc";
import {
  accountRouter,
  agentRouter,
  exampleRouter,
} from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  agent: agentRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
