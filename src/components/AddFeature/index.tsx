import React, { memo, } from "react";
import { NLoading, } from "~/components"
import { type GeoJson } from '~/helpers/types';
import Image from "next/image";
import dbImage from "../../../public/db.png";
import downloadImage from "../../../public/download.png";
import trashImage from "../../../public/trash.png";

interface Props {
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data?: GeoJson[];
  handleDelete: (id: string) => void;
  isLoading: boolean;
  handleShowModal: (data: GeoJson) => void;
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
        <div className="flex">
          <div className="text-sm text-slate-200 bg-gray-600 pl-5 mb-[-3.5px] pt-[6.5px] rounded-tl-md rounded-tr-sm w-[60%]">Added Layers</div>
          <label
            htmlFor="file"
            className="text-slate-200 bg-gray-600 ml-[5px] text-center rounded-sm cursor-pointer mb-[5px] w-[40%] rounded-tr-md active:bg-slate-900 transition-all duration-150 ease-linear"
          >
          +
          </label>
        </div>
        <div className="flex h-1/2 flex-col rounded-md bg-gray-600 px-4 py-3">
          {props.data?.map((item) => {
            const r = (Math.random() + 1).toString(36).substring(7);
            return (
              <div
                className="mb-2 flex items-center justify-between rounded-md bg-gray-800 px-3  py-2"
                key={r}
              >
                <div className="flex items-center">
                  <Shape color={item.color}/>
                  <p className="text-xs text-slate-200">{item.name}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <Image
                    src={dbImage}
                    alt="download"
                    className="cursor-pointer h-[11px] w-[11px] active:opacity-80 transition-all duration-150 ease-linear mt-[2px]"
                    onClick={() => props.handleShowModal(item)}
                  />
                  <Image
                    src={downloadImage}
                    alt="download"
                    className="cursor-pointer h-[16px] w-[16px] active:opacity-80 transition-all duration-150 ease-linear"
                    onClick={() => downloadData(item)}
                  />
                  <Image
                    src={trashImage}
                    alt="download"
                    className="cursor-pointer h-[11px] w-[11px] active:opacity-80 transition-all duration-150 ease-linear"
                    onClick={() => props.handleDelete(item.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

interface ShapeProps {
  color?: string;
}

const Shape = (props: ShapeProps) => (
  <div className="mr-2 h-3 w-3 border border-gray-400 bg-blue-500" style={{ backgroundColor: props.color }}/>
);

export default memo(AddFeature);
