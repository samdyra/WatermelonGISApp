import React, { memo } from 'react';
import { Basemaps as bm } from '../../constants/basemaps';
import infoImage from '../../../public/info.png';
import Image from 'next/image';

interface Props {
  setBm: (bm: string) => void;
  bm: string;
}

const Basemaps = (props: Props) => {
  return (
    <>
      <div className="mb-[-3.5px] ml-6 w-fit rounded-t-md bg-gray-600 px-3 py-[2px] text-sm text-slate-200">
        <div className="flex items-center gap-2">
          <h1>Basemaps</h1>
          <Image
            src={infoImage}
            alt="download"
            className="h-[12px] w-[12px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
          />
        </div>
      </div>
      <div className="mx-auto rounded-md bg-gray-600">
        <div className="grid cursor-pointer grid-cols-3 gap-3 p-2">
          {bm.map((el) => {
            const isPicked = el.link === props.bm;
            if (isPicked) {
              return (
                <Image
                  className="h-[54px] w-[54px] rounded-md border-2 border-yellow-500 transition-all duration-150 ease-linear active:border-yellow-500"
                  src={el.url}
                  alt="basemap"
                  key={el.name}
                  onClick={() => props.setBm('')}
                />
              );
            }

            return (
              <Image
                className="h-[54px] w-[54px] rounded-md"
                src={el.url}
                alt="basemap"
                key={el.name}
                onClick={() => props.setBm(el.link)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default memo(Basemaps);
