import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type GeoJson } from '~/helpers/types';
import { Map } from '~/components';
import { toMercator } from '@turf/projection';

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  feature: GeoJson;
}

interface Result {
  year: string;
  direction: number;
}

function DirectionModule(props: IProps) {
  const { name, type, id, years } = props.feature;
  const coordInMeter = toMercator(props.feature.features[0]);
  const yearsInArray = years?.split(',');
  const firstCoord = coordInMeter?.geometry.coordinates.at(0) as unknown as number[];
  const lastCoord = coordInMeter?.geometry.coordinates.at(-1) as unknown as number[];

  // ---------- GET DIRECTION RESULTAN ----------
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

  function calculateWindDirection(coord1: { x: number; y: number }, coord2: { x: number; y: number }): number {
    const dx = coord2.x - coord1.x;
    const dy = coord2.y - coord1.y;
    const radians = Math.atan2(dy, dx);
    let degrees = (radians * 180) / Math.PI;
    if (degrees < 0) {
      degrees += 360;
    }
    return degrees;
  }

  const windDirectionTotal = calculateWindDirection(coordsForFunction.coord1, coordsForFunction.coord2);

  // ---------- GET DIRECTION ON EACH YEAR ----------
  function calculateWindDirections(coordinates: number[][]): number[] {
    const windDirections: number[] = [];

    for (let i = 0; i < coordinates.length - 1; i++) {
      const coord1 = { x: coordinates[i]?.[1] as number, y: coordinates?.[i]?.[0] as number };
      const coord2 = { x: coordinates[i + 1]?.[1] as number, y: coordinates[i + 1]?.[0] as number };
      const windDirection = calculateWindDirection(coord1, coord2);
      windDirections.push(windDirection);
    }

    return windDirections;
  }

  const coordinatesInMeters = coordInMeter && (coordInMeter?.geometry.coordinates as unknown as number[][]);
  const windDirections = coordinatesInMeters && calculateWindDirections(coordinatesInMeters);

  function combineYearAndDirection(yearArray: string[], direction: number[]): Result[] {
    const result: Result[] = [];

    for (let i = 0; i < yearArray.length - 1; i++) {
      const yearStart = yearArray[i];
      const yearEnd = yearArray[i + 1];
      const dir = direction[i];
      const obj: Result = {
        year: `${yearStart ?? 'noyear'} - ${yearEnd ?? 'noyear'}`,
        direction: dir ?? 0,
      };
      result.push(obj);
    }

    return result;
  }

  const result = combineYearAndDirection(yearsInArray as string[], windDirections as number[]);
  console.log(result);

  return (
    <div className="overflow-hidden">
      <AnimatePresence>
        {props.isModalVisible ? (
          <div className="overflow-hidden">
            <motion.div
              className="absolute left-[32%] top-[10%] z-50 flex h-4/5 w-2/5 items-center overflow-hidden "
              style={{ overflow: 'hidden' }}
              initial={{ x: -700 }}
              animate={{ x: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="h-full w-full">
                {/*content*/}
                <div className="flex h-full w-full flex-col rounded-xl border-0 bg-[#1F2937] shadow-lg">
                  {/*header*/}
                  <div className="flex items-center justify-between rounded-t border-b border-solid border-gray-900 px-5 pb-1 pt-2 text-xl">
                    <h1 className="font-semibold">Direction Statistics</h1>
                    <button
                      className="opacity-4 float-right border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-slate-200 outline-none focus:outline-none"
                      onClick={props.handleHideModal}
                    >
                      ×
                    </button>
                  </div>
                  {/*body*/}
                  <div className="h-96 p-5">
                    <h1>Feature Name: {name}</h1>
                    <h1>id: {id}</h1>
                    <h1>type: {type}</h1>

                    <div className="h-1/2 w-1/2">
                      <Map
                        data={[props.feature]}
                        bm={
                          'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=cm12mCvBTIOBGz4tb8FTAoubM28MtIRzTmxkCcVplrCbgz20duEVixioH3HT8OMw'
                        }
                        size={['50%', '37%']}
                        isDirection={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="fixed inset-0 z-40 overflow-hidden bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              onClick={props.handleHideModal}
            />
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
export default memo(DirectionModule);
