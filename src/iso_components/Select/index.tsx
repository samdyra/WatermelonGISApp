import React, { memo } from 'react';
import { type GRIDDING_METHOD_OPTIONS } from '~/constants/texts';

interface IProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
  options: typeof GRIDDING_METHOD_OPTIONS;
}

const Select = (props: IProps) => {
  return (
    <>
      <div className="py-[2px] text-sm text-slate-200">
        <label className=" block text-sm font-medium ">{props.label}</label>
        <select
          className="bg-primary focus:shadow-outline w-full appearance-none rounded  px-3 py-2 leading-tight text-white focus:outline-none"
          id={props.label}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        >
          {props.options?.map((item) => (
            <option key={item.text} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default memo(Select);
