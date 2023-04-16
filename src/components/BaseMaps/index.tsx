import React, { memo } from "react";
import { Basemaps as bm } from "../../constants/basemaps";

import Image from "next/image";

interface Props {
  setBm: (bm: string) => void;
  bm: string;
}

const Basemaps = (props: Props) => {
  return (
    <div className="mx-auto bg-gray-600 rounded-md">
      <div className="grid grid-cols-3 gap-3 p-2 cursor-pointer">
        {bm.map((el) => {
          const isPicked = el.link === props.bm;
          if (isPicked) {
            return (
              <Image
                className="h-[54px] w-[54px] rounded-md border-2 border-yellow-500"
                src={el.url}
                alt="basemap"
                key={el.name}
                onClick={() => props.setBm("")}
              />
            )
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
  );
};

export default memo(Basemaps);
