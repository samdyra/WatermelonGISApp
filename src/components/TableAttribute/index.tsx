import React, { memo } from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { type GeoJson } from "~/helpers/types";
import { motion, AnimatePresence } from "framer-motion";

interface IProps {
  isModalVisible: boolean;
  name?: string | undefined;
  handleHideModal: () => void;
  table: GeoJson;
}

function TableAttribute(props: IProps) {
  const { table } = props;
  const tableHeader =
    table.features[0] && Object.keys(table.features[0].properties);
  const tableBody = table.features.map((feature) => {
    return Object.values(feature.properties) as [];
  });

  return (
    <div className="overflow-hidden">
    <AnimatePresence>
      {props.isModalVisible ? (
        <div className="overflow-hidden">
          <motion.div
            className="absolute left-[28%] flex h-full items-center z-50 overflow-hidden w-1/2"
            style={{overflow: "hidden"}}
            initial={{ x: -700 }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-5/8 w-full">
              {/*content*/}
              <div className="flex flex-col rounded-xl border-0 bg-[#1F2937] shadow-lg w-full">
                {/*header*/}
                <div className="flex items-center justify-between rounded-t border-b border-solid border-gray-900 px-5 pb-1 pt-2 text-xl">
                  <h1 className="font-semibold">{props.name}</h1>
                  <button
                    className="opacity-4 float-right border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-slate-200 outline-none focus:outline-none"
                    onClick={props.handleHideModal}
                  >
                  ×
                  </button>
                </div>
                {/*body*/}
                <div className="h-96 p-5">
                  <Grid
                    data={tableBody}
                    columns={tableHeader}
                    search={true}
                    pagination={{ limit: 3 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="fixed inset-0 z-40 bg-black overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
          />
        </div>
      ) : null}
    </AnimatePresence>
    </div>
  );
}
export default memo(TableAttribute);
