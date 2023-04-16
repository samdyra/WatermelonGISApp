// TO DO: SOLVE THIS TECH DEBT

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import clip from "turf-clip";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";
import center from "@turf/center";
import { featureCollection, centerMean, } from "@turf/turf";
import { type ITurf } from "~/components/Analysis/types";



export const vectorAnalysisRouter = createTRPCRouter({
  meanSpatial: privateProcedure
    .input(z.object({ feature: z.any() }))
    .mutation( ({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const inputData = center(input.feature);
      const collected = featureCollection([ inputData ]);
      const nameOnly = input.feature.name.split(".")[0];
      const feature = { ...collected, name: nameOnly }



      return feature
    }),

  weightedMeanSpatial: privateProcedure
    .input(z.object({ feature: z.any(), weight: z.string() }))
    .mutation( ({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const inputData = centerMean(input.feature, { weight: input.weight });
      const collected = featureCollection([ inputData ]);
      const nameOnly = input.feature.name.split(".")[0];
      const feature = { ...collected, name: nameOnly }



      return feature
    }),

  clip: privateProcedure
    .input(z.object({ feature: z.any(), clip: z.any() }))
    .mutation( ({ input }) => {
      const inputData = clip(input.feature, input.clip) as ITurf
      const nameOnly = input.feature.name.split(".")[0];
      const feature = { ...inputData, name: nameOnly }

      return feature
    }),
});
