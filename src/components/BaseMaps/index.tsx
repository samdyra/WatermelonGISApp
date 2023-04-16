import React, { memo } from "react";
import osm from "../../../public/osm.png";
import pioneer from "../../../public/pioneer.png";
import spinal from "../../../public/spinal.png";
import stadiablack from "../../../public/stadiablack.png";
import terrain from "../../../public/terrrain.png";
import tone from "../../../public/tone.png";

import Image from "next/image";

const Basemaps = () => {
  const layer = [
    {
      name: "osm",
      url: osm,
    },

    {
      name: "pioneer",
      url: pioneer,
    },
    {
      name: "spinal",
      url: spinal,
    },
    {
      name: "stadiablack",
      url: stadiablack,
    },
    {
      name: "terrain",
      url: terrain,
    },
    {
      name: "tone",
      url: tone,
    },
  ];

  return (
    <div className="mx-auto bg-gray-600 rounded-md">
      <div className="grid grid-cols-3 gap-3 p-2 cursor-pointer">
        {layer.map((el) => {
          return (
            <Image
              className="h-[54px] w-[54px] rounded-md"
              src={el.url}
              alt="basemap"
              key={el.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Basemaps);
