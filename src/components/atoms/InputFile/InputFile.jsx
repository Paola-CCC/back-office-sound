import React from "react";
import "./InputFile.scss";

const InputFile = ({ onFileChange }) => {
  return (
    <>
        <label  htmlFor="file-image" className="form-label">Changer ma photo de profil</label>
        <input className="form-control" type="file" id="file-image" name="file-image" onChange={onFileChange} required={true}   accept=".jpg, .jpeg, .png" />
    </>
  );
};

export default InputFile;
