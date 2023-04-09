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
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data?: GeoJson[];
}

const AddFeature = (props: Props) => (
  <div className="h-full w-full px-5">
    <label
      htmlFor="file"
      className="mb-3 flex cursor-pointer justify-center rounded-md bg-gray-600 text-base text-slate-200"
    >
      +
    </label>
    <input
      type="file"
      name="file"
      id="file"
      className="hidden"
      accept={".zip, .geojson, .json, .kml, .kmz"}
      onChange={(event) => {
        props.handleUpload(event);
      }}
    />

    <div className="flex h-1/2 flex-col rounded-md bg-gray-600 px-4 py-3">
      {props.data?.map((item) => {
        const r = (Math.random() + 1).toString(36).substring(7);
        return (
          <div className="mb-2 flex py-1 bg-gray-800 rounded-md px-3 items-center" key={r}>
            <div className="flex w-[95%] items-center">
              <Shape />
              <p className="text-xs text-slate-200">{item.name}</p>
            </div>
            <div className="cursor-pointer text-base text-slate-200">x</div>
          </div>
        );
      })}
    </div>
  </div>
);

const Shape = () => (
  <div className="mr-2 h-3 w-3 border border-gray-400 bg-blue-500" />
);

export default memo(AddFeature);
