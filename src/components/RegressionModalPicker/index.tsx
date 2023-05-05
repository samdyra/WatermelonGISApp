import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type GeoJson } from '~/helpers/types';

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  feature: GeoJson;
  featureProperties: () => string[];
}

function RegressionModalPicker(props: IProps) {
  return (
    <AnimatePresence>
      {props.isModalVisible ? (
        <motion.div
          className="absolute right-[540px] top-16 h-[500px] w-[350px] overflow-hidden rounded-lg  bg-[#1F2937] shadow-lg"
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-400 px-5 pb-1 pt-2">
            <h3 className="text-sm font-semibold text-slate-200">Field Picker</h3>
            <button
              className="opacity-4 float-right border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-slate-200 outline-none focus:outline-none"
              onClick={props.handleHideModal}
            >
              ×
            </button>
          </div>
          <p className="mx-5 my-3 text-white">Select the variable&apos;s field names</p>
          <div className="mx-5 my-4 flex justify-between ">
            <div className="flex w-[40%] border-b  ">
              <select
                id="countries"
                className="mb-1 ml-2 mr-2 h-2 w-2 rotate-45 transform appearance-none border-4 border-[#1F2937] border-b-white border-r-white indent-[-9999px] font-semibold hover:cursor-pointer focus:border-4 focus:border-b-white focus:outline-none focus:ring-0"
              >
                <option defaultValue="Choose The X variable" className="font-semibold">
                  Choose The X variable
                </option>
                {props.featureProperties().map((data) => {
                  const r = (Math.random() + 1).toString(36).substring(7);
                  return (
                    <option id="countries" key={r} value={data} className="font-semibold">
                      {data}
                    </option>
                  );
                })}
              </select>
              <h1 className="ml-1 text-sm text-slate-300">X variable</h1>
            </div>
            <p className="text-white">with</p>
            <div className="flex w-[40%] border-b ">
              <select
                id="countries"
                className="mb-1 ml-2 mr-2 h-2 w-2 rotate-45 transform appearance-none border-4 border-[#1F2937] border-b-white border-r-white indent-[-9999px] font-semibold hover:cursor-pointer focus:border-4 focus:border-b-white focus:outline-none focus:ring-0"
              >
                <option defaultValue="Choose The Y variable" className="font-semibold">
                  Choose The Y variable
                </option>
                {props.featureProperties().map((data) => {
                  const r = (Math.random() + 1).toString(36).substring(7);
                  return (
                    <option id="countries" key={r} value={data} className="font-semibold">
                      {data}
                    </option>
                  );
                })}
              </select>
              <h1 className="ml-1 text-sm text-slate-300">Y Variable</h1>
            </div>
          </div>
          <div className="mb-5 flex w-full justify-between px-8">
            <button
              className=" w-[120px] rounded bg-green-700 px-2 py-2 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-green-800"
              type="button"
            >
              Add Variable
            </button>
            <button
              className="w-[120px] rounded bg-red-700 px-2 py-2 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-800"
              type="button"
            >
              Undo
            </button>
          </div>
          <div className="h-[280px] w-full px-5 ">
            <div className=" h-full w-full rounded-md  bg-gray-600 py-[2px] text-slate-200">
              <h1 className="mx-3 my-2 flex items-center justify-between rounded-md bg-gray-800 px-2 py-2 text-xs transition-all duration-150 ease-linear active:opacity-80">
                Field choosen: bg_2005 with lst_2005
              </h1>
              <h1 className="mx-3 my-2 flex items-center justify-between rounded-md bg-gray-800 px-2 py-2 text-xs transition-all duration-150 ease-linear active:opacity-80">
                Field choosen: bg_2010 with lst_2010
              </h1>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
export default memo(RegressionModalPicker);
