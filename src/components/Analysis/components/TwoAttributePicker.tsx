import React from 'react';

interface Props {
  setPropertiesSelected: React.Dispatch<React.SetStateAction<string>>;
  featureProperties: () => string[];
  propertiesSelected: string;
  setSecondPropertiesSelected: React.Dispatch<React.SetStateAction<string>>;
  secondPropertiesSelected: string;
}

const TwoAttributePicker = (props: Props) => (
  <div className="mb-2  flex flex-col pb-1">
    <div className="mb-5 flex w-full items-center  border-b border-slate-400 pb-1">
      <select
        id="countries"
        className="mb-1 ml-2 mr-2 h-2 w-2 rotate-45 transform appearance-none border-4 border-[#1F2937] border-b-white border-r-white indent-[-9999px] font-semibold hover:cursor-pointer focus:border-4 focus:border-b-white focus:outline-none focus:ring-0"
        onChange={(sel) => props.setPropertiesSelected(sel.currentTarget.value)}
      >
        <option defaultValue="Choose The First Field" className="font-semibold">
          Choose The First Field
        </option>
        {props.featureProperties().map((data) => {
          const r = (Math.random() + 1).toString(36).substring(7);
          return (
            <option id="countries" key={r} value={data} className="font-semibold">
              {data}
            </option>
          );
        })}
      </select>
      <h1 className="ml-1 text-xs text-slate-300">
        {props.propertiesSelected === '' ? 'Choose The First Field' : props.propertiesSelected}
      </h1>
    </div>
    <div className="flex w-full items-center  border-b border-slate-400 pb-1">
      <select
        id="countries"
        className="mb-1 ml-2 mr-2 h-2 w-2 rotate-45 transform appearance-none border-4 border-[#1F2937] border-b-white border-r-white indent-[-9999px] font-semibold hover:cursor-pointer focus:border-4 focus:border-b-white focus:outline-none focus:ring-0"
        onChange={(sel) => props.setSecondPropertiesSelected(sel.currentTarget.value)}
      >
        <option defaultValue="Choose The Second Field" className="font-semibold">
          Choose The Second Field
        </option>
        <option id="countries" value="" className="font-semibold">
          none
        </option>
        {props.featureProperties().map((data) => {
          const r = (Math.random() + 1).toString(36).substring(7);
          return (
            <option id="countries" key={r} value={data} className="font-semibold">
              {data}
            </option>
          );
        })}
      </select>
      <h1 className="ml-1 text-xs text-slate-300">
        {props.secondPropertiesSelected === '' ? 'Choose The Second Field' : props.secondPropertiesSelected}
      </h1>
    </div>
  </div>
);

export default TwoAttributePicker;
