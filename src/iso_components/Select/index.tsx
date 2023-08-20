import React, { memo } from 'react';
import { type GRIDDING_METHOD_OPTIONS } from '~/constants/texts';
import infoImage from '../../../public/info.png';
import Image from 'next/image';
interface IProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name: string;
  desc: string;
  options: typeof GRIDDING_METHOD_OPTIONS;
  handleShowModalInfo: (desc: string, isShowModal: boolean) => void;
}

const Select = (props: IProps) => {
  return (
    <>
      <div className="py-[2px] text-sm text-slate-200">
        <div className="flex items-center">
          <label className=" block pr-2 text-sm font-medium">{props.label}</label>
          <Image
            src={infoImage}
            alt="download"
            className="h-[12px] w-[12px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
            onClick={() => props.handleShowModalInfo(props.desc, true)}
          />
        </div>
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
