import React from "react";

interface Props {
    setPropertiesSelected: React.Dispatch<React.SetStateAction<string>>
    featureProperties: () => string[]
    propertiesSelected: string
}


const AttributePicker = (props: Props) => (
  <div className="mb-2  flex border-b border-slate-400 pb-1">
    <div className="flex w-full items-center">
      <select
        id="countries"
        className="mb-1 ml-2 mr-2 h-2 w-2 rotate-45 transform appearance-none border-4 border-[#1F2937] border-b-white border-r-white indent-[-9999px] font-semibold hover:cursor-pointer focus:border-4 focus:border-b-white focus:outline-none focus:ring-0"
        onChange={(sel) => props.setPropertiesSelected(sel.currentTarget.value)}
      >
        <option defaultValue="Choose The Weight Field" className="font-semibold">
            Choose The Weight Field
        </option>
        {
          props.featureProperties().map((data) => {
            const r = (Math.random() + 1).toString(36).substring(7);
            return (
              <>
                <option
                  id="countries"
                  key={r}
                  value={data}
                  className="font-semibold"
                >
                  {data}
                </option>
              </>
            );
          })}
      </select>
      <h1 className="ml-1 text-xs text-slate-300">
        {props.propertiesSelected === "" ? "Choose The Weight Field" : props.propertiesSelected}
      </h1>
    </div>
  </div>
);

export default AttributePicker;