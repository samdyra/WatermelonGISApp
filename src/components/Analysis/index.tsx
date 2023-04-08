import React, {
  memo, useEffect, useState 
} from "react";
import { center } from "@turf/turf";
import { type AllGeoJSON } from "@turf/helpers";

interface Props {
  data?: {
    id: string;
    name: string;
    feature: string;
  }[];
}

const Analysis = (props: Props) => {
  const [ geoJson, setGeoJson ] = useState<AllGeoJSON | null>(null);
  const sample = props.data && props.data[0]?.feature;

  useEffect(() => {
    if (sample) {
      fetch(sample)
        .then((res) => res.json().then((out: AllGeoJSON) => setGeoJson(out)))
        .catch((err) => console.log(err));
    }
  }, [ sample ]);

  useEffect(() => {
    if (geoJson) {
      const centerPoint = center(geoJson);
      console.log("anjing", centerPoint);
    }

  }, [ geoJson ])

  return (
    <div className="h-full w-full p-5">
      <div
        className="mb-2  flex border-b border-slate-400 pb-1"
      >
        <div className="flex w-[95%] items-center">
          <p className="text-xs text-slate-200">Mean Spatial</p>
        </div>
      </div>
    </div>
  )
}


export default memo(Analysis);
