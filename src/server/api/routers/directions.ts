import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { z } from 'zod';
import { type GeoJson } from '~/helpers/types';

export const directionRouter = createTRPCRouter({
  getDirectionByUserId: privateProcedure.query(async ({ ctx }) => {
    const authorId = ctx.userId;
    const data = await ctx.prisma.direction.findMany({
      where: { authorId: authorId },
      take: 100,
      orderBy: [{ createdAt: 'desc' }],
    });

    const directions = await Promise.all(
      data.map(async (directionObj) => {
        const directionLink: string = directionObj.feature;
        const response = await fetch(directionLink);
        const json = (await response.json()) as GeoJson;
        const nameOnly = directionObj.name.split('.')[0];

        const direction = {
          ...json,
          id: directionObj.id,
          link: directionLink,
          name: nameOnly,
          years: directionObj.years,
        };

        return direction;
      })
    );

    return directions;
  }),

  create: privateProcedure
    .input(z.object({ directionLink: z.string(), name: z.string(), years: z.array(z.any()) }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      const yearsInString = input.years.toString();
      const direction = await ctx.prisma.direction.create({
        data: {
          authorId,
          feature: input.directionLink,
          name: input.name,
          years: yearsInString,
        },
      });

      return direction;
    }),

  delete: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const features = await ctx.prisma.direction.delete({ where: { id: input.id } });

    return features;
  }),
});
