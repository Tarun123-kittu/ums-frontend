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
  disabled,
}) => {
  return (
    <div className={`form-group ${classname}`}>
      {span === true ? (
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
            disabled
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
        />
      )}
    </div>
  );
};

export default InputField;
