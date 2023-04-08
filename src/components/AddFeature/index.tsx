import React, { memo } from "react";

interface Props {
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data?: {
    id: string;
    name: string;
    feature: string;
  }[];
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
      {props.data?.map((item) => (
        <div
          className="mb-2  flex border-b border-slate-400 pb-1"
          key={item.id}
        >
          <div className="flex w-[95%] items-center">
            <Shape />
            <p className="text-xs text-slate-200">{item.name}</p>
          </div>
          <div className="cursor-pointer text-base text-slate-200">x</div>
        </div>
      ))}
    </div>
  </div>
);

const Shape = () => (
  <div className="mr-2 h-3 w-3 border border-gray-400 bg-blue-500" />
);

export default memo(AddFeature);
