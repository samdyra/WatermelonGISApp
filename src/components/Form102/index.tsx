import React from 'react';
import InputSelect from '../Select';
import { type IHO102 } from '~/constants/texts';

interface IFormProps {
  options: typeof IHO102;
  state: { [key: string]: string };
  inputNames: string[];
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;

  setState: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const Form: React.FC<IFormProps> = (props) => {
  const { options, state, setState, inputNames } = props;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Process form submission with the state values
    console.log(state);
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputNames.map((name) => (
        <div className="mb-4" key={name}>
          <label className="block text-sm font-bold text-gray-700" htmlFor={name}>
            {name}
          </label>
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            name={name}
            value={state[name]}
            onChange={handleInputChange}
          />
        </div>
      ))}
      {options.map((item) => (
        <InputSelect
          key={item.text}
          name={item.text}
          label={item.text}
          onChange={handleInputChange}
          value={state[item.text] || ''} // Provide an initial value or use an empty string
          options={item.value}
        />
      ))}
      <input
        type="file"
        name="file"
        id="file"
        className=""
        accept={'.geojson, .json'}
        onChange={(event) => {
          props.handleUpload(event);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
