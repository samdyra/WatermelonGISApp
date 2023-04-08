import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const featureRouter = createTRPCRouter({
  getFeaturesByUserId: privateProcedure.query(async ({ ctx }) => {
    const authorId = ctx.userId;
    const data = await ctx.prisma.feature.findMany({
      where: { authorId: authorId },
      take: 100,
      orderBy: [ { createdAt: "desc" } ],
    });
    return data;
  }),

  create: privateProcedure
    .input(z.object({ feature: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      const features = await ctx.prisma.feature.create({
        data: {
          authorId, feature: input.feature, name: input.name 
        }, 
      });

      return features;
    }),
});
