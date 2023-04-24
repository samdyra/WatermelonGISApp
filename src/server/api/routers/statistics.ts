import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { z } from 'zod';
import { type stats } from '~/helpers/types';

export const statisticsRouter = createTRPCRouter({
  getFeaturesByUserId: privateProcedure.query(async ({ ctx }) => {
    const authorId = ctx.userId;
    const data = await ctx.prisma.statistics.findMany({
      where: { authorId: authorId },
      take: 100,
      orderBy: [{ createdAt: 'desc' }],
    });

    const statData = await Promise.all(
      data.map(async (statObj) => {
        const statsLink: string = statObj.stats;
        const response = await fetch(statsLink);
        const json = (await response.json()) as stats;

        const nameOnly = statObj.name.split('.')[0];
        const statistics = {
          ...json,
          name: nameOnly,
          id: statObj.id,
          link: statsLink,
        };

        return statistics;
      })
    );

    return statData;
  }),

  create: privateProcedure
    .input(z.object({ statsLink: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      const stats = await ctx.prisma.statistics.create({
        data: {
          authorId,
          stats: input.statsLink,
          name: input.name,
        },
      });

      return stats;
    }),

  delete: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const features = await ctx.prisma.feature.delete({ where: { id: input.id } });

    return features;
  }),
});
