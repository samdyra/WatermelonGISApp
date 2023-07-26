import React, { memo } from 'react';
import { NLoading } from '~/components';

import Image from 'next/image';
import dbImage from '../../../public/db.png';
import downloadImage from '../../../public/download.png';
import trashImage from '../../../public/trash.png';
import infoImage from '../../../public/info.png';

interface ResponseType {
  _id: string;
  hdf5Uri: string;
  geojsonUri: string;
  file_name: string;
  user_id: string;
  hdf5_file_name_location_path: string;
  geojson_file_name_location_path: string;
  geojsonData: string;
}

interface Props {
  data?: ResponseType[];
  isLoading: boolean;
  handleDeleteData: (param: { id: string; geojsonUri: string; hdf5Uri: string }) => void;
}

const AddFeature = (props: Props) => {
  function downloadHDF5File(url: string, name: string) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${name}.h5`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .catch((error) => {
        console.error('Error fetching the HDF5 file:', error);
      });
  }

  return (
    <>
      {props.isLoading && <NLoading />}
      <div className="mb-14 h-full w-full px-5">
        <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          accept={'.geojson, .json'}
          // onChange={(event) => {
          //   props.handleUpload(event);
          // }}
        />
        <div className="flex">
          <div className="mb-[-3.5px] flex w-[60%] items-center gap-2 rounded-tl-md rounded-tr-sm bg-gray-600 pl-5 text-sm text-slate-200">
            <h1>Added Layers</h1>
            <Image
              src={infoImage}
              alt="download"
              className="h-[12px] w-[12px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
              // onClick={() => props.handleShowModalInfo(WORDING_TUTORIAL.ADD_LAYER)}
            />
          </div>
          <label
            htmlFor="file"
            className="mb-[5px] ml-[5px] w-[40%] cursor-pointer rounded-sm rounded-tr-md bg-gray-600 text-center text-slate-200 transition-all duration-150 ease-linear active:bg-slate-900"
          >
            +
          </label>
        </div>
        <div className="flex h-full flex-col overflow-y-scroll rounded-md bg-gray-600 px-4 py-3">
          {props.data?.map((item) => {
            return (
              <div
                className="mb-2 flex cursor-pointer items-center justify-between rounded-md bg-gray-800  px-3 py-2 transition-all duration-150 ease-linear active:opacity-60 "
                key={item.geojson_file_name_location_path}
              >
                <div className="flex items-center">
                  <Shape color="blue" />
                  <p className="text-xs text-slate-200">{item.file_name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src={dbImage}
                    alt="download"
                    className="mt-[2px] h-[11px] w-[11px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
                    // onClick={() => props.handleShowModal(item)}
                  />
                  <Image
                    src={downloadImage}
                    alt="download"
                    className="h-[16px] w-[16px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
                    onClick={() => downloadHDF5File(item.hdf5Uri, item.file_name)}
                  />
                  <Image
                    src={trashImage}
                    alt="download"
                    className="h-[11px] w-[11px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
                    onClick={() =>
                      // eslint-disable-next-line no-underscore-dangle
                      props.handleDeleteData({ geojsonUri: item.geojsonUri, id: item._id, hdf5Uri: item.hdf5Uri })
                    }
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
  <div className="mr-2 h-3 w-3 border border-gray-400 bg-blue-500" style={{ backgroundColor: props.color }} />
);

export default memo(AddFeature);
