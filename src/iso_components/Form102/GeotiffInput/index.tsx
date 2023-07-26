import React from 'react';
import { type FormState } from '../types';

interface GeotiffInputProps {
  setState: React.Dispatch<React.SetStateAction<FormState>>;
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
          tiffFile: trimmedBase64,
        }));
      };

      reader.readAsDataURL(file);
    } else {
      // Handle the case when no file is selected
      setState((prevState) => ({
        ...prevState,
        tiffFile: '',
      }));
    }
  };

  return (
    <div className="mb-2 w-full  text-slate-200">
      <div className=" mb-2 text-lg font-bold">Input Geotiff</div>

      <label>
        <input
          type="file"
          onChange={handleFileInputChange}
          className="text-grey-500 text-sm
             file:mr-4 file:w-[54%]
            file:rounded-sm file:border-0 file:bg-blue-50
            file:px-6 file:py-1 file:text-sm
            file:font-medium file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "
        />
      </label>
    </div>
  );
};

export default GeotiffInput;
