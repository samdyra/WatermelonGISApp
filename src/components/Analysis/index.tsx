import React, { memo } from "react";

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
  name: string;
}
interface Props {
  data?: GeoJson[];
}

const Analysis = (props: Props) => {
  const [ selected, setSelected ] = React.useState<GeoJson | null>(null);

  return (
    <div className="h-full w-full p-5">
      <div className="mb-2  flex border-b border-slate-400 pb-1">
        <div className="flex w-full items-center">
          <select
            id="countries"
            className="border-4 h-2 w-2 rotate-45 transform appearance-none border-b-white border-r-white border-[#1F2937] indent-[-9999px] focus:border-4 focus:border-b-white focus:outline-none focus:ring-0 hover:cursor-pointer mr-2 mb-1 ml-2"
            onChange={(sel) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              setSelected(JSON.parse(sel.currentTarget.value));
            }}
          >
            {props.data &&
                props.data.map((data) => {
                  const r = (Math.random() + 1).toString(36).substring(7);
                  return (
                    <>
                      <option
                        id="countries"
                        key={r}
                        value={JSON.stringify(data)}
                      >
                        {data.name}
                      </option>
                    </>
                  );
                })}
          </select>
          <h1 className="ml-1 text-xs text-slate-300">{selected?.name ?? "Choose Your Feature"}</h1>
        </div>
      </div>
      <div className="rounded-md bg-gray-600 h-4/6 ">
        <div className="p-2">
          <div className="">
            <h1 className="mb-2 flex py-2 bg-gray-800 rounded-md px-2 items-center text-xs text-slate-200">Available Analysis Tools</h1>
            <h1 className="mb-2 flex py-2 bg-gray-800 rounded-md px-2 items-center text-xs text-slate-200">Available Analysis Tools</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Analysis);
