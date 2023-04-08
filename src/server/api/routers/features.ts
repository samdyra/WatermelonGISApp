import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";

interface GeoJson {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    }
    properties: object;
  }[]
  crs: {
    type: string;
    properties: {
      name: string
    }
  };
  name: string;
}[]


export const featureRouter = createTRPCRouter({
  getFeaturesByUserId: privateProcedure.query(async ({ ctx }) => {

    const authorId = ctx.userId;
    const data = await ctx.prisma.feature.findMany({
      where: { authorId: authorId },
      take: 100,
      orderBy: [ { createdAt: "desc" } ],
    });
  
    const featureData = await Promise.all(
      data.map(async (featureObj) => {
        const featureLink:string = featureObj.feature;
        const response = await fetch(featureLink);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const json:GeoJson = await response.json();

        return json
      })
    );
  
    return featureData;
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
