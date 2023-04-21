// TO DO: SOLVE THIS TECH DEBT

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import clip from 'turf-clip';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { detectCrs } from 'reproject';
import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { z } from 'zod';
import center from '@turf/center';
import { featureCollection, centerMean } from '@turf/turf';
import { type ITurf } from '~/components/Analysis/types';
import regression from 'regression';
import { type DataPoint } from 'regression';

type FeatureType = {
  properties: {
    [key: string]: string | number;
  };
};

export const vectorAnalysisRouter = createTRPCRouter({
  meanSpatial: privateProcedure.input(z.object({ feature: z.any() })).mutation(({ input }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const inputData = center(input.feature);
    const collected = featureCollection([inputData]);
    const nameOnly = input.feature.name.split('.')[0];
    const feature = { ...collected, name: nameOnly };

    return feature;
  }),

  weightedMeanSpatial: privateProcedure
    .input(z.object({ feature: z.any(), weight: z.string() }))
    .mutation(({ input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const inputData = centerMean(input.feature, { weight: input.weight });
      const collected = featureCollection([inputData]);
      const nameOnly = input.feature.name.split('.')[0];
      const feature = { ...collected, name: nameOnly };

      return feature;
    }),

  clip: privateProcedure.input(z.object({ feature: z.any(), clip: z.any() })).mutation(({ input }) => {
    const inputData = clip(input.feature, input.clip) as ITurf;
    const nameOnly = input.feature.name.split('.')[0];
    const feature = { ...inputData, name: nameOnly };

    return feature;
  }),

  reproject: privateProcedure.input(z.object({ feature: z.any() })).mutation(({ input }) => {
    const feature = detectCrs(input.feature) as string;

    return feature;
  }),

  regression: privateProcedure
    .input(
      z.object({
        feature: z.any(),
        row: z.string(),
        secondRow: z.string(),
      })
    )
    .mutation(({ input }) => {
      const { row: firstRow, secondRow } = input;

      const formatted: DataPoint[] = input.feature?.features?.map((obj: FeatureType) => [
        obj.properties?.[firstRow],
        obj.properties?.[secondRow],
      ]);

      const result = regression.linear(formatted);

      return { result };
    }),

  directionModule: privateProcedure.input(z.object({ feature: z.any(), year: z.string() })).mutation(({ input }) => {
    const { year } = input;
    const results = [];
    const uniqueTahuns = Array.from(
      new Set(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        input.feature.features.map((feature: FeatureType) => feature.properties?.[year])
      )
    ).sort();

    for (let i = 0; i < uniqueTahuns.length; i = i + 1) {
      const currentTahun = uniqueTahuns[i] as number;
      const features = input.feature.features.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (feature: { properties: any }) => feature.properties?.[year] <= currentTahun
      );
      const centroidResult = center({
        type: 'FeatureCollection',
        features,
      });

      results.push({ ...centroidResult, tahun: currentTahun });
    }

    const collection = featureCollection(results);
    const nameOnly = input.feature.name.split('.')[0];

    return { ...collection, name: nameOnly };
  }),
});
