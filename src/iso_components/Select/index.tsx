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
      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold ">{props.label}</label>
        <select
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
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
