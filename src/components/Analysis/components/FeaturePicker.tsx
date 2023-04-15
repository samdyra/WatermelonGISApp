import React from "react";
import { type GeoJson } from "../types";

interface Props {
    data?: GeoJson[];
    setSelected : React.Dispatch<React.SetStateAction<GeoJson | null>>
    selected: GeoJson | null
}

const FeaturePicker = (props: Props) => (
  <div className="flex border-b border-slate-400 pb-1 mb-5">
    <div className="flex w-full items-center">
      <select
        id="countries"
        className="mb-1 ml-2 mr-2 h-2 w-2 rotate-45 transform appearance-none border-4 border-[#1F2937] border-b-white border-r-white indent-[-9999px] font-semibold hover:cursor-pointer focus:border-4 focus:border-b-white focus:outline-none focus:ring-0"
        onChange={(sel) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          props.setSelected(JSON.parse(sel.currentTarget.value));
        }}
      >
        <option defaultValue="Choose Your Feature" className="font-semibold">
            Choose Your Feature
        </option>
        {props.data &&
            props.data.map((data) => (
              <>
                <option
                  id="countries"
                  key={data.id}
                  value={JSON.stringify(data)}
                  className="font-semibold"
                >
                  {data.name}
                </option>
              </>
            ))}
      </select>
      <h1 className="ml-1 text-xs text-slate-300">
        {props.selected?.name ?? "Choose Your Feature"}
      </h1>
    </div>
  </div>
);

export default FeaturePicker;