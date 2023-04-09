import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";
import center from "@turf/center";
import { featureCollection, point } from "@turf/turf";


export const vectorAnalysisRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({ feature: z.any() }))
    .mutation( ({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const feature = center(input.feature, { properties: { name: "test" } });
      const featuresCollection = featureCollection([ feature ]);

      return featuresCollection
    }),
});
