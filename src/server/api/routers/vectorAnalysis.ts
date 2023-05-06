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
import { featureCollection, centerMean, lineString, toMercator, distance as distanceHelper } from '@turf/turf';
import { calculateWindDirection } from '~/helpers/directionModuleHelper';
import { type ITurf } from '~/components/Analysis/types';
import type regression from 'regression';
import { type DataPoint } from 'regression';
import { type Position, type Feature } from '@turf/turf';
import { linear } from '~/helpers/regression';

type FeatureType = {
  properties: {
    [key: string]: string | number;
  };
};

const regressionModuleInput = z.array(
  z.object({
    x: z.string(),
    y: z.string(),
  })
);

interface regressionType {
  x: string;
  y: string;
}

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
      const nameOnly = input.feature.name.split('.')[0] as string;

      const formatted: DataPoint[] = input.feature?.features?.map((obj: FeatureType) => [
        obj.properties?.[firstRow],
        obj.properties?.[secondRow],
      ]);

      const result = linear(formatted) as regression.Result;

      return { result, name: nameOnly };
    }),

  regressionModule: privateProcedure
    .input(
      z.object({
        feature: z.any(),
        regressionModuleInput: regressionModuleInput,
        place: z.string(),
      })
    )
    .mutation(({ input }) => {
      const { regressionModuleInput: regressionInput, feature, place } = input;

      function regressionMultipleFeatures(fields: regressionType[], feature: any) {
        const results = feature.features.map((feature: FeatureType, index: number) => {
          const newFeature = { ...feature, properties: { ...feature.properties } };
          const data = fields.map(({ x, y }) => [feature.properties[x], feature.properties[y]]);
          const regressResult = linear(data);
          const { r2, string, points } = regressResult;
          newFeature.properties = {
            id: index + 1,
            place: feature?.properties?.[place] ?? '',
            r2,
            equation: string,
            points,
          };

          return newFeature as unknown as Feature;
        });

        return results as Feature[];
      }

      const result = regressionMultipleFeatures(regressionInput, feature);
      const collected = featureCollection(result);
      const nameOnly = input.feature.name.split('.')[0];
      const featureResult = {
        ...collected,
        name: nameOnly,
        color: feature?.color,
        id: feature?.id,
        link: feature?.link,
      };

      return featureResult;
    }),

  directionModule: privateProcedure
    .input(z.object({ feature: z.any(), year: z.string(), weight: z.string() }))
    .mutation(({ input }) => {
      const { year } = input;
      const results = [];
      const uniqueTahuns = Array.from(
        new Set(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          input.feature.features.map((feature: FeatureType) => feature.properties?.[year])
        )
      ).sort() as number[];

      for (let i = 0; i < uniqueTahuns.length; i = i + 1) {
        const currentTahun = uniqueTahuns[i] as number;
        const features = input.feature.features.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (feature: { properties: any }) => feature.properties?.[year] <= currentTahun
        );
        const centroidResult = centerMean(
          {
            type: 'FeatureCollection',
            features,
          },
          {
            weight: input.weight,
            properties: {
              id: i + 1,
              year: currentTahun,
            },
          }
        );

        results.push({ ...centroidResult, year: currentTahun });
      }

      const collection = featureCollection(results);
      const nameOnly = input.feature.name.split('.')[0];

      return { ...collection, name: nameOnly, uniqueTahuns };
    }),

  createDirectionLine: privateProcedure
    .input(z.object({ feature: z.any(), name: z.string(), years: z.array(z.number()) }))
    .mutation(({ input }) => {
      const { feature } = input;

      function getLineStrings(data: {
        features: { geometry: { coordinates: Position[] }; properties: { year: number } }[];
      }) {
        const features = data.features;
        const lineStrings = [];

        for (let i = 0; i < features.length - 1; i++) {
          const converToMeter = toMercator(features[i]);
          const converToMeterSecondFeature = toMercator(features[i + 1]);
          const firstCoord = converToMeter?.geometry.coordinates as unknown as number[];
          const lastCoord = converToMeterSecondFeature?.geometry.coordinates as unknown as number[];
          const coordsForFunction = {
            coord1: {
              x: firstCoord[1] as number,
              y: firstCoord[0] as number,
            },
            coord2: {
              x: lastCoord[1] as number,
              y: lastCoord[0] as number,
            },
          };

          const direction = calculateWindDirection(coordsForFunction.coord1, coordsForFunction.coord2);
          const distance = distanceHelper(firstCoord, lastCoord, { units: 'kilometers' });

          const geometry = features[i]?.geometry;
          const properties = features[i]?.properties;
          const year = properties?.year;
          const secondYear = features?.[i + 1]?.properties.year;
          const coords = [geometry?.coordinates, features[i + 1]?.geometry.coordinates] as unknown as Position[];
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          const lineStringProps = {
            id: i + 1,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            year: `${year} - ${secondYear}`,
            direction: Math.round(direction * 1000) / 1000,
            distance: Math.round(distance * 1000) / 1000,
          };
          const lineStringResult = lineString(coords, lineStringProps);
          lineStrings.push(lineStringResult);
        }

        return lineStrings;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const lineStrings = getLineStrings(feature);
      const collected = featureCollection(lineStrings);
      const converToMeter = toMercator(collected);
      const firstCoord = converToMeter.features.at(0)?.geometry.coordinates.at(-1) as unknown as number[];
      const lastCoord = converToMeter.features.at(-1)?.geometry.coordinates.at(-1) as unknown as number[];

      const coordsForFunction = {
        coord1: {
          x: firstCoord[1] as number,
          y: firstCoord[0] as number,
        },
        coord2: {
          x: lastCoord[1] as number,
          y: lastCoord[0] as number,
        },
      };

      const direction = calculateWindDirection(coordsForFunction.coord1, coordsForFunction.coord2);
      const namedResult = { ...collected, name: input.name, years: input.years, direction: direction };
      return namedResult;
    }),
});
