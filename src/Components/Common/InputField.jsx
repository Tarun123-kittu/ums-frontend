import React from 'react'

const InputField = ({classname,labelname,placeholder,type,span=false,isRequred,symbol}) => {
  return (
    <div className={`form-group ${classname}`}>
      {span===true? <label>{labelname} <span style={{color:"red"}}>*</span></label>:
      <label>{labelname}</label>
      }
   {isRequred ? 
  <div className='input_form_group'>
       <input type={type} placeholder={placeholder} className='form-control'/>
        <div className='symbol_wrapper'>{symbol}</div>
  </div> :
     <input type={type} placeholder={placeholder} className='form-control'/>

  }
    </div>
  )
}

export default InputField