import React from "react";
import "./commonStyle.css";
import { FaSort } from "react-icons/fa";

const Select = ({ labelname, options, labelClass, placeholder, onChange,span }) => {
  return (
    <div className="new_employee_form_group">
      {span ?  
      <label>
          {labelname} <span style={{ color: "red" }}>*</span>
        </label>:
      <label className={labelClass}>{labelname}</label>
      }  
      <div className="custom-select-wrapper">
        <select
          className="custom-select form-control"
          placeholder={placeholder}
          onChange={onChange}
        >
          {options?.map((data, i) => {
            return (
              <option key={i} value={data.value}>
                {data.option}
              </option>
            );
          })}
        </select>
        <FaSort className="dropdown-icon" />
      </div>
    </div>
  );
};

export default Select;
