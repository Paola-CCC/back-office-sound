import React from "react";
import "./InputSelect.scss";


interface InputSelectProps {
  label?: string;
  name?:string ;
  value?: string | number
  options?: any; 
  onChange?: (updatedOptions: any) => void;
}


const InputSelect : React.FC <InputSelectProps> = ({ label, name,  options, value, onChange }) => {


  return (
    <div className="input-select-container">
      {label && (
        <label>{label}</label>
      )}
      <select value={value} name={name} onChange={onChange}>
        {options.map((option : any, index : any) => (
          <option key={index} value={option.value} >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
