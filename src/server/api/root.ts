import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { pageRouter } from "./routers/page";
import { ProfileRouter } from "./routers/profile";
import {ImageRouter } from "./routers/image";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  page: pageRouter,
  profile : ProfileRouter,
  image : ImageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
