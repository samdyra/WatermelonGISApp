import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type GeoJson } from '../Analysis/types';

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  feature: GeoJson;
  featureProperties: () => string[];
  setVariableCollectionSource: React.Dispatch<React.SetStateAction<{ x: string; y: string }[]>>;
}

function DirectionModalPicker(props: IProps) {
  const [variables, setVariables] = useState<{ x: string; y: string }>({ x: '', y: '' });
  const [variableCollection, setVariableCollection] = useState<{ x: string; y: string }[]>([]);

  useEffect(() => {
    props.setVariableCollectionSource(variableCollection);
  }, [variableCollection]);

  return (
    <AnimatePresence>
      {props.isModalVisible ? (
        <motion.div
          className="absolute right-[540px] top-16 h-[550px] w-[350px] overflow-hidden rounded-lg  bg-[#1F2937] shadow-lg"
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
          <p className="mx-5 my-3 text-xs text-white">X Variable means independent variable, where as Y is dependent</p>
          <div className="mx-5 my-4 flex justify-between ">
            <div className="flex w-[40%] border-b  ">
              <select
                id="countries"
                className="mb-1 ml-2 mr-2 h-2 w-2 rotate-45 transform appearance-none border-4 border-[#1F2937] border-b-white border-r-white indent-[-9999px] font-semibold hover:cursor-pointer focus:border-4 focus:border-b-white focus:outline-none focus:ring-0"
                onChange={(sel) => setVariables({ ...variables, x: sel.currentTarget.value })}
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
              <h1 className="ml-1 text-sm text-slate-300">{variables?.x === '' ? 'X Variable' : variables?.x}</h1>
            </div>
            <p className="text-white">with</p>
            <div className="flex w-[40%] border-b ">
              <select
                id="countries"
                className="mb-1 ml-2 mr-2 h-2 w-2 rotate-45 transform appearance-none border-4 border-[#1F2937] border-b-white border-r-white indent-[-9999px] font-semibold hover:cursor-pointer focus:border-4 focus:border-b-white focus:outline-none focus:ring-0"
                onChange={(sel) => setVariables({ ...variables, y: sel.currentTarget.value })}
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
              <h1 className="ml-1 text-sm text-slate-300">{variables?.y === '' ? 'Y Variable' : variables?.y}</h1>
            </div>
          </div>
          <div className="mb-5 flex w-full justify-between px-8">
            {variables.x !== '' && variables.y !== '' ? (
              <button
                className=" w-[120px] rounded bg-green-700 px-2 py-2 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-green-800"
                type="button"
                onClick={() => {
                  setVariableCollection([...variableCollection, variables]);
                  setVariables({ x: '', y: '' });
                }}
              >
                Add Variable
              </button>
            ) : (
              <button
                className=" w-[120px] rounded bg-gray-700 px-2 py-2 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-gray-800"
                type="button"
              >
                Add Variable
              </button>
            )}
            <button
              className="w-[120px] rounded bg-red-700 px-2 py-2 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-800"
              type="button"
              onClick={() => {
                setVariableCollection([]);
                setVariables({ x: '', y: '' });
              }}
            >
              Clear
            </button>
          </div>
          <div className="h-[280px] w-full px-5 ">
            <div className=" h-full w-full overflow-y-scroll  rounded-md bg-gray-600 py-[2px] text-slate-200">
              {variableCollection.map((variable) => {
                const r = (Math.random() + 1).toString(36).substring(7);
                return (
                  <h1
                    key={r}
                    className="mx-3 my-2 flex items-center justify-between rounded-md bg-gray-800 px-2 py-2 text-xs transition-all duration-150 ease-linear active:opacity-80"
                  >
                    Field choosen: {variable.x} with {variable.y}
                  </h1>
                );
              })}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
export default memo(DirectionModalPicker);
