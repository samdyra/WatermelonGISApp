import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { z } from 'zod';
import { getRandomHexColor } from '~/helpers/globalHelpers';
import { type GeoJson } from '~/helpers/types';

export const statisticsRouter = createTRPCRouter({
  getFeaturesByUserId: privateProcedure.query(async ({ ctx }) => {
    const authorId = ctx.userId;
    const data = await ctx.prisma.feature.findMany({
      where: { authorId: authorId },
      take: 100,
      orderBy: [{ createdAt: 'desc' }],
    });

    const featureData = await Promise.all(
      data.map(async (featureObj) => {
        const featureLink: string = featureObj.feature;
        const response = await fetch(featureLink);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const json: GeoJson = await response.json();
        const featuresWithColor = json.features.map((feature) => ({
          ...feature,
          color: featureObj.color,
        }));

        const updatedJson = {
          ...json,
          features: featuresWithColor,
        };

        const nameOnly = featureObj.name.split('.')[0];
        const feature = {
          ...updatedJson,
          name: nameOnly,
          id: featureObj.id,
          link: featureLink,
          color: featureObj.color,
        };

        return feature;
      })
    );

    return featureData;
  }),

  create: privateProcedure
    .input(z.object({ feature: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const getColor = getRandomHexColor();
      const authorId = ctx.userId;
      const features = await ctx.prisma.feature.create({
        data: {
          authorId,
          feature: input.feature,
          name: input.name,
          color: getColor,
        },
      });

      return features;
    }),

  delete: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const features = await ctx.prisma.feature.delete({ where: { id: input.id } });

    return features;
  }),
});
