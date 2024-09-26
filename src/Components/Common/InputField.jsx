import React from "react";

const InputField = ({
  classname,
  labelname,
  placeholder,
  type,
  span = false,
  isRequired,
  symbol,
  name,
  value,
  onChange,
  disabled, // Destructure the disabled prop
}) => {
  return (
    <div className={`form-group ${classname}`}>
      {span ? (
        <label>
          {labelname} <span style={{ color: "red" }}>*</span>
        </label>
      ) : (
        <label>{labelname}</label>
      )}
      {isRequired ? (
        <div className="input_form_group">
          <input
            type={type}
            placeholder={placeholder}
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            step="1"
          />
          <div className="symbol_wrapper">{symbol}</div>
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled} // Set the disabled attribute based on the prop
          step="1"
        />
      )}
    </div>
  );
};

export default InputField;
