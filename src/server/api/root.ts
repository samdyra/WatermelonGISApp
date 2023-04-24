import { createTRPCRouter } from '~/server/api/trpc';
import { postRouter } from './routers/posts';
import { profileRouter } from './routers/profile';
import { featureRouter } from './routers/features';
import { vectorAnalysisRouter } from './routers/vectorAnalysis';
import { directionRouter } from './routers/directions';
import { statisticsRouter } from './routers/statistics';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  posts: postRouter,
  profile: profileRouter,
  features: featureRouter,
  vectorAnalysis: vectorAnalysisRouter,
  direction: directionRouter,
  stats: statisticsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
