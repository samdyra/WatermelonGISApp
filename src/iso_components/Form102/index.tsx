import React, { memo } from 'react';
import InputSelect from '../Select';
import { type IHO102, type inputNames } from '~/constants/texts';
import GeotiffInput from './GeotiffInput';
import { type FormState, type FormatData } from './types';
import { type Metadata } from './types';
import infoImage from '../../../public/info.png';
import Image from 'next/image';

interface IFormProps {
  options: typeof IHO102;
  state: FormState;
  metadata: Metadata;
  FormatData: FormatData;
  setMetaData: React.Dispatch<React.SetStateAction<Metadata>>;
  setFormatData: React.Dispatch<React.SetStateAction<FormatData>>;
  inputNames: typeof inputNames;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
  handleUpload: () => void;
  handleClear: () => void;
  handleShowModalInfo: (desc: string, isShowModal: boolean) => void;
}

const Form: React.FC<IFormProps> = (props) => {
  const { options, setState, handleClear, inputNames, metadata, setMetaData, FormatData, setFormatData, handleUpload } =
    props;

  const handleInputChangeMeta = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setMetaData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChangeEnum = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormatData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="max-h-min  px-4">
      <div className="max-h-[85%] overflow-y-scroll  text-white">
        <h1 className=" text-lg font-bold text-slate-200">Input Metadata</h1>
        <div className="mb-2 flex flex-wrap justify-between ">
          {inputNames.map((item, index) => (
            <>
              <div
                className={`py-[2px] text-slate-200 ${index === inputNames.length - 1 ? 'w-full' : 'w-47'}`}
                key={item.text}
              >
                <div className="flex w-fit items-center">
                  <label className="block w-full pr-1 text-sm font-medium" htmlFor={item.text}>
                    {item.text}
                  </label>
                  <Image
                    src={infoImage}
                    alt="download"
                    className="h-[12px] w-[12px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
                    onClick={() => props.handleShowModalInfo(item.desc, true)}
                  />
                </div>
                <input
                  type="text"
                  className="bg-primary focus:shadow-outline w-full appearance-none rounded  px-3 py-2 leading-tight text-white  shadow focus:outline-none"
                  name={item.key}
                  value={String(metadata[item.key as keyof Metadata])}
                  onChange={handleInputChangeMeta}
                />
              </div>
            </>
          ))}
        </div>
        <h1 className=" mt-1 text-lg font-bold text-slate-200 ">Configuration</h1>

        <div className="mb-2">
          {options.map((item) => (
            <InputSelect
              handleShowModalInfo={props.handleShowModalInfo}
              key={item.text}
              name={item.text}
              desc={item.desc}
              label={item.text}
              onChange={handleInputChangeEnum}
              value={String(FormatData[item.text as keyof FormatData])}
              options={item.value}
            />
          ))}
        </div>
      </div>

      <GeotiffInput setState={setState} />

      <div className="flex justify-between">
        <button
          onClick={handleUpload}
          type="submit"
          data-te-ripple-init
          data-te-ripple-color="light"
          className="w-47  rounded 
        bg-lime-700 px-6 py-[0.4rem] text-xs font-medium uppercase 
        leading-normal text-white  
        transition duration-150 
        ease-in-out hover:bg-lime-600"
        >
          Submit
        </button>

        <button
          onClick={handleClear}
          data-te-ripple-init
          data-te-ripple-color="light"
          className="w-47 inline-block rounded 
        bg-orange-600 px-6  text-xs font-medium uppercase 
        leading-normal text-white 
        transition duration-150 
        ease-in-out hover:bg-amber-600 "
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default memo(Form);
