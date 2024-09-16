import React from 'react'
import "./commonStyle.css"
import { FaSort } from 'react-icons/fa'
const Select = ({labelname,options,labelClass,placeholder}) => {
  return (
    <div className='new_employee_form_group'>

    <label className={labelClass}>{labelname}</label>
    <div class="custom-select-wrapper ">
    <select class="custom-select form-control" placeholder={placeholder}>
        {options?.map((data,i)=>{
            return(
                <option key={i} value={data.value}>{data.option}</option>
            )
        })}
      
    </select>
    <FaSort className='dropdown-icon '/>
  </div>
    </div>
  )
}

export default Select