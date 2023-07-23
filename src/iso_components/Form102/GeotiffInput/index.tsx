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
    <div>
      <input type="file" onChange={handleFileInputChange} />
    </div>
  );
};

export default GeotiffInput;
