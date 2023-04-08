import React, { memo } from "react";

interface GeoJson {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: object;
  }[];
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  name: string;
}
interface Props {
  data?: GeoJson[];
}

const Analysis = (props: Props) => (
  <div className="h-full w-full p-5">
    <div className="mb-2  flex border-b border-slate-400 pb-1">
      <div className="flex w-[95%] items-center">
        <p className="text-xs text-slate-200">Mean Spatial</p>
      </div>
    </div>
    {props.data &&
      props.data.map((el) => {
        const r = (Math.random() + 1).toString(36).substring(7);

        return (
          <p className="flex flex-col" key={r}>
            {el.name}
          </p>
        );
      })}
  </div>
);

export default memo(Analysis);
