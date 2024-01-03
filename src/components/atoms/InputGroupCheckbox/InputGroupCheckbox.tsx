import React from "react";
import "./InputGroupCheckbox.scss";

interface Option {
  value?: string | number;
  label?: string | number;
}

interface InputGroupCheckboxProps {
  labelCheckboxGroup?: string;
  options?: Option[]; 
  selectedOptions?: any,
  handleChange: any
}

const InputGroupCheckbox: React.FC<InputGroupCheckboxProps> = ({ labelCheckboxGroup, options,selectedOptions, handleChange }) => {
  
  return (
    <>
      {labelCheckboxGroup && labelCheckboxGroup !== undefined && (
        <label>{labelCheckboxGroup}</label>
      )}
      <div className="checkbox-wrapper">
        {options?.map((option, index) => (
          <label key={index} className="form-control"  >
            <input
              type="checkbox"
              value={option.value}
              name="checkbox-checked"
              checked={selectedOptions?.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />  
                      
            <span> {option.label} </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default InputGroupCheckbox;


