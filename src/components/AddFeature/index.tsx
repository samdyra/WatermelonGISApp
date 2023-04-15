import React, { memo } from "react";
import { NLoading } from "~/components"

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
  name?: string;
  id: string;
  link: string;
}
interface Props {
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data?: GeoJson[];
  handleDelete: (id: string) => void;
  isLoading: boolean;
}

const AddFeature = (props: Props) => {
  const downloadData = (data: GeoJson) => {
    const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${data.name || data.id}.json`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <>
      {props.isLoading && <NLoading />}
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
              <div
                className="mb-2 flex items-center justify-between rounded-md bg-gray-800 px-3  py-2"
                key={r}
              >
                <div className="flex items-center">
                  <Shape />
                  <p className="text-xs text-slate-200">{item.name}</p>
                </div>
                <div className="flex gap-3 ">
                  <div
                    className="cursor-pointer text-sm text-slate-200"
                    onClick={() => downloadData(item)}
                  >
                    +
                  </div>
                  <div
                    className="cursor-pointer text-sm text-slate-200"
                    onClick={() => props.handleDelete(item.id)}
                  >
                    x
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const Shape = () => (
  <div className="mr-2 h-3 w-3 border border-gray-400 bg-blue-500" />
);

export default memo(AddFeature);
