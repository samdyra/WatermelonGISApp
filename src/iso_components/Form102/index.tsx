import React from 'react';
import InputSelect from '../Select';
import { type IHO102, type inputNames } from '~/constants/texts';
import GeotiffInput from './GeotiffInput';
import { type FormState, type FormatData } from './types';
import { type Metadata } from './types';

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
}

const Form: React.FC<IFormProps> = (props) => {
  const { options, setState, inputNames, metadata, setMetaData, FormatData, setFormatData, handleUpload } = props;

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
    <div className="overflow-y-scroll">
      {inputNames.map((item) => (
        <div className="mb-4" key={item.text}>
          <label className="block text-sm font-bold " htmlFor={item.text}>
            {item.text}
          </label>
          <input
            type="text"
            className=" focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-black  shadow focus:outline-none"
            name={item.key}
            value={String(metadata[item.key as keyof Metadata])}
            onChange={handleInputChangeMeta}
          />
        </div>
      ))}
      {options.map((item) => (
        <InputSelect
          key={item.text}
          name={item.text}
          label={item.text}
          onChange={handleInputChangeEnum}
          value={String(FormatData[item.text as keyof FormatData])}
          options={item.value}
        />
      ))}

      <GeotiffInput setState={setState} />
      <button type="submit" onClick={handleUpload}>
        Submit
      </button>
    </div>
  );
};

export default Form;
