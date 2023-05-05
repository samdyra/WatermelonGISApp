import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  children: React.ReactNode;
  callback: () => void;
  modalName: string;
  y: string;
}

function Modal(props: IProps) {
  return (
    <AnimatePresence>
      {props.isModalVisible ? (
        <>
          <motion.div
            className="absolute right-[270px] z-50 flex items-center"
            style={{ top: props.y }}
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-50">
              {/*content*/}
              <div className="flex h-full w-60 flex-col rounded-lg border-0 bg-[#1F2937] shadow-lg ">
                {/*header*/}
                <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-400 px-5 pb-1 pt-2">
                  <h3 className="text-sm font-semibold text-slate-200">{props.modalName}</h3>
                  <button
                    className="opacity-4 float-right border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-slate-200 outline-none focus:outline-none"
                    onClick={props.handleHideModal}
                  >
                    ×
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto px-6 py-4">{props.children}</div>
                {/*footer*/}
                <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-400 p-2">
                  <button
                    className="mb-1 rounded bg-blue-700 px-4 py-2 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-800"
                    type="button"
                    onClick={props.callback}
                  >
                    Execute
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
export default memo(Modal);
