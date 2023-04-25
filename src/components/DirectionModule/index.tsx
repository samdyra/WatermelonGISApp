import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type GeoJson } from '~/helpers/types';
import { Map } from '~/components';
import { toMercator } from '@turf/projection';
import {
  calculateWindDirection,
  calculateWindDirections,
  combineYearAndDirection,
} from '~/helpers/directionModuleHelper';

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  feature: GeoJson;
}

function DirectionModule(props: IProps) {
  const { name, type, id, years } = props.feature;
  const coordInMeter = toMercator(props.feature.features[0]);
  const yearsInArray = years?.split(',');
  const firstCoord = coordInMeter?.geometry.coordinates.at(0) as unknown as number[];
  const lastCoord = coordInMeter?.geometry.coordinates.at(-1) as unknown as number[];
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

  // ---------- GET DIRECTION RESULTAN ----------
  const windDirectionTotal = calculateWindDirection(coordsForFunction.coord1, coordsForFunction.coord2);

  // ---------- GET DIRECTION ON EACH YEAR ----------
  const coordinatesInMeters = coordInMeter && (coordInMeter?.geometry.coordinates as unknown as number[][]);
  const windDirections = coordinatesInMeters && calculateWindDirections(coordinatesInMeters);

  // ---------- COMBINE YEAR AND DIRECTION ----------
  const result = combineYearAndDirection(yearsInArray as string[], windDirections as number[]);

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
                  <div className="h-[650px] overflow-x-hidden overflow-y-scroll scroll-auto p-5">
                    <h1 className="text-sm font-bold">Layer Properties:</h1>
                    <div className="mb-2 text-sm">
                      <h1>Feature Name: {name}</h1>
                      <h1>id: {id}</h1>
                      <h1>type: {type}</h1>
                    </div>

                    <h1 className="text-sm font-bold">Total Direction:</h1>
                    <div className="mb-2 text-sm">
                      <h1>total (in degrees): {Math.round(windDirectionTotal * 100) / 100}</h1>
                    </div>

                    <h1 className="text-sm font-bold">Direction on each year:</h1>
                    <div className="mb-2 text-sm">
                      {result?.map((el) => {
                        const r = (Math.random() + 1).toString(36).substring(7);

                        return (
                          <h1 key={r}>
                            in year {el.year}, direction (in degrees) is: {Math.round(el.direction * 100) / 100}
                          </h1>
                        );
                      })}
                    </div>

                    <h1 className="text-sm font-bold">Direction on maps:</h1>

                    <div className="h-1/2 w-1/2 ">
                      <Map
                        data={[props.feature]}
                        bm={
                          'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=cm12mCvBTIOBGz4tb8FTAoubM28MtIRzTmxkCcVplrCbgz20duEVixioH3HT8OMw'
                        }
                        size={['30%', '37%']}
                        isDirection={true}
                      />
                    </div>
                  </div>
                  <div className="z-50 flex items-center justify-between rounded-b border-t border-solid border-gray-900 px-5 pb-1 pt-2 text-xl">
                    <h1 className="h-8"></h1>
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
