import React from 'react';
import infoImage from '../../../public/info.png';
import Image from 'next/image';

interface DateTimePickerProps {
  label: string;
  issueDate: string;
  issueTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, issueDate, issueTime, onDateChange, onTimeChange }) => {
  return (
    <div>
      <div className={`'w-47 py-[2px]  text-slate-200`} key="Issue Date">
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
          value={issueDate}
          onChange={(event) => onDateChange(event.target.value)}
          className="bg-primary focus:shadow-outline w-full appearance-none rounded px-3 py-2 leading-tight text-white shadow focus:outline-none"
        />
      </div>

      <div className={`py-[2px] text-slate-200 ${index === inputNames.length - 1 ? 'w-full' : 'w-47'}`} key={item.text}>
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
          type="time"
          value={issueTime}
          onChange={(event) => onTimeChange(event.target.value)}
          className="bg-primary focus:shadow-outline mt-1 w-full appearance-none rounded px-3 py-2 leading-tight text-white shadow focus:outline-none"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
