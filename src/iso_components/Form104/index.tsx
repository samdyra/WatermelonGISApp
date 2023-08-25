import React, { memo } from 'react';
import InputSelect from '../Select';
import { type IHO104, type inputNames104 } from '~/constants/texts';
import GeotiffInput from './GeotiffInput';
import { type ApiContract104, type Metadata, type FormatData } from './types';
import infoImage from '../../../public/info.png';
import Image from 'next/image';
import { formatTimeForInput, formatDateForInput } from '~/helpers/globalHelpers';

interface IFormProps {
  options: typeof IHO104;
  state: ApiContract104;
  inputNames: typeof inputNames104;
  setState: React.Dispatch<React.SetStateAction<ApiContract104>>;
  handleUpload: () => void;
  handleClear: () => void;
  handleShowModalInfo: (desc: string, isShowModal: boolean) => void;
}

const Form104: React.FC<IFormProps> = (props) => {
  const { options, state, setState, handleClear, inputNames, handleUpload } = props;

  const handleInputChangeMeta = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      metadata: {
        ...prevState.metadata,
        [name]: value,
      },
    }));
  };

  const handleInputChangeEnum = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    console.log(value, 'value');

    setState((prevState) => ({
      ...prevState,
      format_data: {
        ...prevState.format_data,
        [name]: parseInt(value, 10),
      },
    }));
  };

  const handleApiContractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const [datePart = '', timePart = ''] = value.split(' ');
    setState((prevState) => ({
      ...prevState,
      metadata: {
        ...prevState.metadata,
        issueDate: datePart,
        issueTime: timePart,
      },
    }));
  };

  const handleDateChange = (dateInput: string) => {
    const dateWithoutDashes = dateInput.replace(/-/g, '');

    setState((prevState) => ({
      ...prevState,
      metadata: {
        ...prevState.metadata,
        issueDate: dateWithoutDashes,
      },
    }));
  };

  const handleTimeChange = (timeInput: string) => {
    const timeWithoutColon = timeInput.replace(':', '');

    setState((prevState) => ({
      ...prevState,
      metadata: {
        ...prevState.metadata,
        issueTime: timeWithoutColon,
      },
    }));
  };

  return (
    <div className="max-h-min  px-4">
      <div className="max-h-[60%] overflow-y-scroll  text-white">
        <h1 className=" text-lg font-bold text-slate-200">Input Metadata</h1>
        <div className=" flex flex-wrap justify-between ">
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
                  value={String(state.metadata[item.key as keyof Metadata])}
                  onChange={handleInputChangeMeta}
                />
              </div>
            </>
          ))}
        </div>

        <div className="flex w-full items-center justify-between">
          <div className={` w-47  py-[2px] text-slate-200`} key="Issue Date">
            <div className="flex w-fit items-center">
              <label className="block w-full pr-1 text-sm font-medium" htmlFor="Issue Date">
                Issue Date
              </label>
              <Image
                src={infoImage}
                alt="download"
                className="h-[12px] w-[12px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
                onClick={() => props.handleShowModalInfo('issue Date', true)}
              />
            </div>
            <input
              type="date"
              value={formatDateForInput(state.metadata.issueDate)}
              onChange={(event) => handleDateChange(event.target.value)}
              className="bg-primary white-calendar-icon focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-white shadow focus:outline-none"
            />
          </div>

          <div className={` w-47 py-[2px] text-slate-200`} key="Issue Time">
            <div className="flex w-fit items-center">
              <label className="block w-full pr-1 text-sm font-medium" htmlFor="Issue Date">
                Issue Time
              </label>
              <Image
                src={infoImage}
                alt="download"
                className="h-[12px] w-[12px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
                onClick={() => props.handleShowModalInfo('issue Time', true)}
              />
            </div>
            <input
              type="time"
              value={formatTimeForInput(state.metadata.issueTime)}
              onChange={(event) => handleTimeChange(event.target.value)}
              className="bg-primary white-calendar-icon focus:shadow-outline  w-full appearance-none rounded px-3 py-2 leading-tight text-white shadow focus:outline-none"
            />
          </div>
        </div>

        <h1 className=" mt-2 text-lg font-bold text-slate-200 ">Configuration</h1>

        <div className="mb-3">
          {options.map((item) => (
            <InputSelect
              handleShowModalInfo={props.handleShowModalInfo}
              key={item.text}
              name={item.key}
              desc={item.desc}
              label={item.text}
              onChange={handleInputChangeEnum}
              value={String(state.format_data[item.key as keyof FormatData])}
              options={item.value}
            />
          ))}
        </div>

        <div className={`w-full py-[2px] text-slate-200`}>
          <div className="flex w-fit items-center">
            <label className="block w-full pr-1 text-sm font-medium" htmlFor="Methodology">
              Water Level Band Name
            </label>
            <Image
              src={infoImage}
              alt="download"
              className="h-[12px] w-[12px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
              onClick={() => props.handleShowModalInfo('water level band name', true)}
            />
          </div>
          <input
            type="text"
            className="bg-primary focus:shadow-outline w-full appearance-none rounded  px-3 py-2 leading-tight text-white  shadow focus:outline-none"
            name="water_level_band_name"
            value={String(state['water_level_band_name' as keyof ApiContract104])}
            onChange={handleApiContractChange}
          />
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

export default memo(Form104);
