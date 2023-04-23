import React, { memo } from 'react';
import Image from 'next/image';
import dbImage from '../../../public/db.png';
import downloadImage from '../../../public/download.png';
import infoImage from '../../../public/info.png';
import { WORDING_TUTORIAL } from '~/constants/texts';

interface Props {
  handleShowModalInfo: (desc: string) => void;
}

const AvailableData = (props: Props) => {
  return (
    <div>
      <div className="mb-[-3.5px] ml-6 w-fit rounded-t-md bg-gray-600 px-5 py-[2px] pt-[5px] text-sm text-slate-200">
        <div className="flex items-center gap-2">
          <h1>Remote Data</h1>
          <Image
            src={infoImage}
            alt="download"
            className="h-[12px] w-[12px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
            onClick={() => props.handleShowModalInfo(WORDING_TUTORIAL.REMOTE_DATA)}
          />
        </div>
      </div>

      <div className="mx-6 flex h-48 flex-col rounded-md bg-gray-600 px-4 py-3">
        <div className="mb-2 flex items-center justify-between rounded-md bg-gray-800 px-3 py-2">
          <p className="text-xs text-slate-200">test</p>
          <div className="flex items-center gap-3">
            <Image
              src={dbImage}
              alt="download"
              className="mt-[2px] h-[11px] w-[11px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
            />
            <Image
              src={downloadImage}
              alt="download"
              className="h-[16px] w-[16px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AvailableData);
