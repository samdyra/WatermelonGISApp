import React, { useEffect } from 'react';
import InputSelect from '../Select';
import { type IHO102, type inputNames } from '~/constants/texts';
import FormModal from '../FormModal';
import useModalState from '~/hooks/useModalState';
import GeotiffInput from './GeotiffInput';
import { type FormState, type Metadata, type FormatData } from './types';
import { boolean } from 'zod';

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
  const { options, state, setState, inputNames, metadata, setMetaData, FormatData, setFormatData, handleUpload } =
    props;

  const [isModalVisible, handleShowModal, handleHideModal] = useModalState();
  const [isModalEnumVisible, handleShowModalEnum, handleHideModalEnum] = useModalState();

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

  useEffect(() => {
    isModalEnumVisible && handleHideModal();
  }, [isModalEnumVisible]);
  useEffect(() => {
    isModalVisible && handleHideModalEnum();
  }, [isModalVisible]);

  return (
    <div>
      <FormModal handleHideModal={handleHideModal} isModalVisible={isModalVisible} title="Meta Data">
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
      </FormModal>

      <FormModal handleHideModal={handleHideModalEnum} isModalVisible={isModalEnumVisible} title="Enum Data">
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
      </FormModal>

      <button
        className="mb-3 rounded bg-yellow-700 px-2 py-2 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-800"
        type="button"
        onClick={isModalVisible ? handleHideModal : handleShowModal}
      >
        Meta Data
      </button>

      <button
        className="mb-3 rounded bg-yellow-700 px-2 py-2 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-800"
        type="button"
        onClick={isModalEnumVisible ? handleHideModalEnum : handleShowModalEnum}
      >
        Enum
      </button>

      <GeotiffInput setState={setState} />
      <button type="submit" onClick={handleUpload}>
        Submit
      </button>
    </div>
  );
};

export default Form;
