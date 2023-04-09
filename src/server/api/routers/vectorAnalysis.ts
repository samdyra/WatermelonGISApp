/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// TO DO: SOLVE THIS TECH DEBT
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";
import center from "@turf/center";
import { featureCollection } from "@turf/turf";


export const vectorAnalysisRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({ feature: z.any() }))
    .mutation( ({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const inputData = center(input.feature);
      const collected = featureCollection([ inputData ]);
      const nameOnly = input.feature.name.split(".")[0];
      const feature = { ...collected, name: nameOnly }



      return feature
    }),
});
