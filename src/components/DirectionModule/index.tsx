import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type GeoJson } from '~/helpers/types';
import { Map } from '~/components';
import { Grid } from 'gridjs-react';

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  feature: GeoJson;
}

function DirectionModule(props: IProps) {
  const { name, type, id, direction } = props.feature;
  const tableHeader = props.feature.features[0] && Object.keys(props.feature.features[0].properties);
  const tableBody = props.feature.features.map((feature) => {
    return Object.values(feature.properties) as [];
  });

  return (
    <div className="overflow-hidden">
      <AnimatePresence>
        {props.isModalVisible ? (
          <div className="overflow-hidden">
            <motion.div
              className="absolute left-[32%] top-[5%] z-50 flex h-[90%] w-2/5 items-center overflow-hidden "
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
                    {direction && (
                      <h1 className="text-sm font-bold">Total Direction: {Math.round(direction)} degrees</h1>
                    )}
                    <div className="mb-2 text-sm">
                      {/* <h1>total (in degrees): {Math.round(windDirectionTotal * 100) / 100}</h1> */}
                    </div>

                    <h1 className="text-sm font-bold">Direction on each year:</h1>
                    <div className="mb-2 text-sm">
                      {props.feature.features?.map((el) => {
                        const r = (Math.random() + 1).toString(36).substring(7);

                        return (
                          <h1 key={r}>
                            in year {el.properties.year}, direction (in degrees) is:{' '}
                            {el?.properties?.direction && Math.round(el?.properties?.direction * 100) / 100}, and the
                            distance is: {el?.properties?.distance && Math.round(el?.properties?.distance)} km
                          </h1>
                        );
                      })}
                    </div>

                    <h1 className="text-sm font-bold">Direction on maps:</h1>

                    <div className="h-[40%] w-1/2">
                      <Map
                        data={[props.feature]}
                        bm={
                          'https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=cm12mCvBTIOBGz4tb8FTAoubM28MtIRzTmxkCcVplrCbgz20duEVixioH3HT8OMw'
                        }
                        size={['30%', '37%']}
                        isDirection={true}
                      />
                    </div>
                    <h1 className="text-sm font-bold">Result Table:</h1>
                    <div className="h-48 w-full">
                      <Grid data={tableBody} columns={tableHeader} pagination={{ limit: 3 }} />
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
