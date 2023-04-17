import React, { memo } from "react";
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";

interface IProps {
  isModalVisible: boolean;
  name?: string | undefined
  handleHideModal: () => void;
}

function TableAttribute(props: IProps) {
  return (
    <>
      {props.isModalVisible ? (
        <>
          <div className="absolute z-50 flex items-center left-[28%] w-full h-full">
            <div className="w-1/2 h-5/8">
              {/*content*/}
              <div className="h-full flex w-full flex-col rounded-xl border-0 bg-[#1F2937] shadow-lg ">
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
                <div className="p-5 h-96">
                  <Grid
                    data={[
                      [ 'John', 'john@example.com' ],
                      [ 'Mike', 'mike@gmail.com' ],
                      [ 'Mike', 'mike@gmail.com' ],
                      [ 'Mike', 'mike@gmail.com' ],
                    ]}
                    columns={[ 'Name', 'Email' ]}
                    search={true}
                    pagination={{ limit: 3 }}
                  />
                </div>

              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
export default memo(TableAttribute);
