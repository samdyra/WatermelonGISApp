import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { z } from 'zod';
import type regression from 'regression';

type result = {
  result: regression.Result;
};

export const statisticsRouter = createTRPCRouter({
  getStatsByUserId: privateProcedure.query(async ({ ctx }) => {
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
        const json = (await response.json()) as result;
        const nameOnly = statObj.name.split('.')[0];

        const statistics = {
          ...json,
          id: statObj.id,
          link: statsLink,
          name: nameOnly,
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
    const features = await ctx.prisma.statistics.delete({ where: { id: input.id } });

    return features;
  }),
});
