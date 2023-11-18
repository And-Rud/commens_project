import React from "react";
import "./MyInput.css";

const MyInput = ({ name, text, type, isRequired, value, onChange }) => {
  return (
    <div className="myinput">
      <label htmlFor={name}>{text}</label>
      <input
        required={isRequired}
        onChange={onChange}
        value={value}
        className="input"
        name={name}
        type={type}
      />
    </div>
  );
};

export default MyInput;
