import React from "react";
import "./InputText.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";


interface InputTextProps {
  label?: string,
  value?: string | number,
  placeholder?: string,
  isRequired?: boolean,
  name?: string,
  errorText?: string,
  type?: 'search' | 'text' | 'password' | 'textarea' | 'email'
  onChange?: (updatedOptions: any) => void;
}

const InputText: React.FC<InputTextProps> = ({ label, placeholder, value, type = 'text', isRequired, name, errorText, onChange }) => {


  const btnClassInput = classNames("grp-input", {
    inputText: type === "text",
    inputSearch: type === "search",
    textarea: type === "textarea",
  });

  return (
    <>
      {label && label !== '' && (
        <label className="input-text">{label}</label>
      )}

      <div className={btnClassInput} tabIndex={1}>
        {
          type && type === 'search' &&
          <button type="submit" className="icon-search" tabIndex={-1}>
            <FontAwesomeIcon icon={faSearch} flip="horizontal" />
          </button>
        }

        { type === "textarea"  ? 
          (
              <textarea id="story"  
                value={value}
                placeholder={placeholder}
                name={name}
                required={isRequired}
                onChange={onChange}
                rows={4} 
                maxLength={1100}
                tabIndex={0}>
              </textarea>
          ) : (
              <input
              type={type}
              className="input-search-input"
              value={value}
              placeholder={placeholder}
              name={name}
              required={isRequired}
              onChange={onChange}
              tabIndex={0}
            />
          )
        }

        { errorText && errorText !== "" && (
          <span> { errorText } </span>
        )}
      </div>
    </>

  );
};

export default InputText;