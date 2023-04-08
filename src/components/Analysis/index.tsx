import React, { memo } from "react";

interface GeoJson {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    }
    properties: object;
  }[]
  crs: {
    type: string;
    properties: {
      name: string
    }
  };
  name: string;
}
interface Props {
  data: GeoJson[]
}

const Analysis = (props: Props) => {
  console.log("test", props.data)

  // useEffect(() => {
  //   if (geoJson) {
  //     const centerPoint = center(geoJson);
  //   }

  // }, [ geoJson ])

  return (
    <div className="h-full w-full p-5">
      <div
        className="mb-2  flex border-b border-slate-400 pb-1"
      >
        <div className="flex w-[95%] items-center">
          <p className="text-xs text-slate-200">Mean Spatial</p>
        </div>
      </div>
      {props.data.map((el) => (
        // eslint-disable-next-line react/jsx-key
        <p className="flex flex-col">{el.name}</p>
      ))}
    </div>
  )
}


export default memo(Analysis);
