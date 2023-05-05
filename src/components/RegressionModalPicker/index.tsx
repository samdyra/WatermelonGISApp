import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type GeoJson } from '~/helpers/types';

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  feature: GeoJson;
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
            <h3 className="text-sm font-semibold text-slate-200">Choose the variable&apos;s field names</h3>
            <button
              className="opacity-4 float-right border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-slate-200 outline-none focus:outline-none"
              onClick={props.handleHideModal}
            >
              ×
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
export default memo(RegressionModalPicker);
