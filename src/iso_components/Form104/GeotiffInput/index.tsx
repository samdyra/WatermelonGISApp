import React from 'react';
import { type ApiContract104 } from '../types';

interface GeotiffInputProps {
  setState: React.Dispatch<React.SetStateAction<ApiContract104>>;
}

const GeotiffInput: React.FC<GeotiffInputProps> = ({ setState }) => {
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        const trimmedBase64 = base64String.split(',')[1]; // Remove the "data:image/tiff;base64," prefix

        if (!trimmedBase64) {
          throw new Error('Failed to trim base64 string');
        }

        setState((prevState) => ({
          ...prevState,
          dataset_ncdf: trimmedBase64,
        }));
      };

      reader.readAsDataURL(file);
    } else {
      // Handle the case when no file is selected
      setState((prevState) => ({
        ...prevState,
        dataset_ncdf: '',
      }));
    }
  };

  return (
    <div className="mb-2 w-full  text-slate-200">
      <div className=" mb-2 text-lg font-bold">Input NCDF</div>

      <label>
        <input
          type="file"
          onChange={handleFileInputChange}
          className="mb-1 text-sm
             text-slate-200 file:mr-4
            file:w-[48%] file:rounded-sm file:border-0
            file:bg-gray-800 file:px-6 file:py-1
            file:text-sm file:font-medium
            file:text-slate-200 
            hover:file:cursor-pointer
            hover:file:text-white
          "
        />
      </label>
    </div>
  );
};

export default GeotiffInput;
