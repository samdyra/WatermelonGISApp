import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type dataStats } from '~/helpers/types';

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  stats: dataStats;
}

function RegressionModule(props: IProps) {
  const { name, result, id } = props.stats;
  const { string, r2 } = result;
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
                    <h1 className="font-semibold">Regression Statistics</h1>
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
                      <h1>Feature Name: {name} </h1>
                      <h1>id: {id} </h1>
                    </div>
                    <h1 className="text-sm font-bold">Equation Result:</h1>
                    <div className="mb-2 text-sm">
                      <h1>Equation: {string} </h1>
                      <h1>r²: {r2} </h1>
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
export default memo(RegressionModule);
