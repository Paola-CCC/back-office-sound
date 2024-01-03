import React from "react";
import "./InputRadio.scss";

interface Option {
  value?: any ;
  label?: any;
}

interface InputRadioProps {
  labelRadioGroup?: string;
  options?: Option[]; 
  selectedOptions?: string,
  handleChange?: any,
  name?: string,
}

const InputRadio : React.FC <InputRadioProps> = ({name, labelRadioGroup, options,selectedOptions, handleChange}) => {

  return (
    <>
      {labelRadioGroup && labelRadioGroup !== undefined  && (
      <label>{labelRadioGroup}</label>
      )}
      <div className="radio-zone">
        {options?.map((option) => (
          <label key={option.value} className="">
            <input
              type="radio"
              value={option.value }
              checked={selectedOptions ? true : false}
              onChange={handleChange}
              name={name}
            />
            <span > {option.label} </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default InputRadio;
