import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { TiArrowUnsorted } from 'react-icons/ti';

import Select, { components } from 'react-select';

const CustomSelectComp = ({optionsData}) => {

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#9e0302' : state.isFocused ? '#f6f6f6' : '#f6f6f6', // Change the background color
          color: state.isSelected ? '#ffffff' : '#687281',
          padding: 10,
          display: 'flex',
          fontSize:14,
          justifyContent: 'space-between',
          cursor:'pointer',
          marginTop:10,
         borderRadius:5
        }),
        input: (provided) => ({
          ...provided,
          fontSize: 5,
        }),
        control: (provided, state) => ({
          ...provided,
         borderRadius:7,
          border: state.isFocused ? '1px solid #D9D9D9' : '1px solid #D9D9D9',
          padding: '0 8px',
          boxShadow: 'none', 
          '&:hover': {
        border: '1px solid #D9D9D9',
      
        },
     
        }),
        placeholder: (provided) => ({
          ...provided,
          fontSize: 14, 
          color:'#929aab',
          fontWeight:500
        }),
        singleValue: (provided) => ({
          ...provided,
          fontSize: 14, 
          color:'#8a8d91'
        }),
     
        indicatorSeparator: () => ({
          display: 'none',
        }),
        menu: (provided) => ({
          ...provided,
        border:'1px solid #D9D9D9',
        boxShadow: '0 1px 17px rgba(0, 0, 0, 0.2)', 
        padding:12,
        borderRadius:5,
   
        }),
        menuPortal: (provided) => ({
            ...provided,
            zIndex: 9999,
          })
          
      
      };
      const CustomOption = (props) => (
        <components.Option {...props}>
          {props.data.label}
          {props.isSelected && <FaCheck />}
        </components.Option>
      );
  
      // Custom Dropdown Indicator (icon)
    const DropdownIndicator = (props) => {
      return (
        <components.DropdownIndicator {...props}>
          <TiArrowUnsorted  style={{ color: '#D9D9D9', fontSize: '16px' }} /> 
        </components.DropdownIndicator>
      );
    };
  return (
    <Select
    options={optionsData}
    styles={customStyles}
    components={{ Option: CustomOption ,DropdownIndicator }} 
    menuPortalTarget={document.body}
    />
  )
}

export default CustomSelectComp