import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const featureRouter = createTRPCRouter({
  getUserPosts: privateProcedure.query(async ({ ctx, input }) => {
    if (!input) {
      throw new Error("User Not Found!");
    }

    const { userId } = input;
    const features = await ctx.prisma.post.findMany({
      where: { authorId: userId },
      take: 100,
      orderBy: [ { createdAt: "desc" } ]
    });
    
    if (features.length === 0) {
      throw new Error("No posts found for this user");
    }

    return features.map((features) => ({ features }));
  }),

  create: privateProcedure.input(z.object({ feature: z.string() })).mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId;
    const feature = await ctx.prisma.post.create({ data: { authorId, content: input.feature } })
    
    return feature
  })
});
