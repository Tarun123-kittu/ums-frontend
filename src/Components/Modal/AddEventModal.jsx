import React from 'react'
import {Modal} from "react-bootstrap"
import "./modal.css"
import CustomSelectComp from '../Common/CustomSelectComp';
const AddEventModal = ({show,setShow}) => {
    const  handleClose=()=>{
        setShow(false)
    }
    const options = [
      { value: 'Holiday', label: 'Holiday' },
      { value: 'Events', label: 'Events' },
    
    ];

  //     option: (provided, state) => ({
  //       ...provided,
  //       backgroundColor: state.isSelected ? '#9e0302' : state.isFocused ? '#f6f6f6' : '#f6f6f6', // Change the background color
  //       color: state.isSelected ? '#ffffff' : '#687281',
  //       padding: 10,
  //       display: 'flex',
  //       fontSize:14,
  //       justifyContent: 'space-between',
  //       cursor:'pointer',
  //       marginTop:10,
  //      borderRadius:5
  //     }),
  //     input: (provided) => ({
  //       ...provided,
  //       fontSize: 5,
  //     }),
  //     control: (provided, state) => ({
  //       ...provided,
  //      borderRadius:7,
  //       border: state.isFocused ? '1px solid #D9D9D9' : '1px solid #D9D9D9',
  //       padding: '0 8px',
  //       boxShadow: 'none', 
  //       '&:hover': {
  //     border: '1px solid #D9D9D9',
  //     },
   
  //     }),
  //     placeholder: (provided) => ({
  //       ...provided,
  //       fontSize: 14, 
  //       color:'#929aab',
  //       fontWeight:500
  //     }),
  //     singleValue: (provided) => ({
  //       ...provided,
  //       fontSize: 14, 
  //     }),
   
  //     indicatorSeparator: () => ({
  //       display: 'none',
  //     }),
  //     menu: (provided) => ({
  //       ...provided,
  //     border:'1px solid #D9D9D9',
  //     boxShadow: '0 1px 17px rgba(0, 0, 0, 0.2)', 
  //     padding:12,
  //     borderRadius:5
  //     }),
    
  //   };
  //   const CustomOption = (props) => (
  //     <components.Option {...props}>
  //       {props.data.label}
  //       {props.isSelected && <FaCheck />}
  //     </components.Option>
  //   );

  //   // Custom Dropdown Indicator (icon)
  // const DropdownIndicator = (props) => {
  //   return (
  //     <components.DropdownIndicator {...props}>
  //       <TiArrowUnsorted  style={{ color: '#D9D9D9', fontSize: '16px' }} /> 
  //     </components.DropdownIndicator>
  //   );
  // };
  return (
    <div>
        <Modal show={show} onHide={handleClose} 
        dialogClassName="custom_modal_width"
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="custom_modal_container">
    <Modal.Header closeButton>

    </Modal.Header>
    <Modal.Body>
                <h3 className="heading"> Holiday & Events</h3>
                <div className="form-group new_employee_form_group ">
                <label className="modal_label">Date</label>
                <input className="candidate-register-input form-control mt-2" type='date'></input>

                </div>
                <div className="form-group new_employee_form_group mt-2">
                <label className="modal_label">Type</label>
                 <div className='mt-2'>
                
                  <CustomSelectComp optionsData={options}/>

                 </div>
                </div>
                <div className="form-group new_employee_form_group mt-2">
                <label className="modal_label">Description</label>
                <textarea rows={5} className="candidate-register-input form-control mt-2"/>

                </div>
                
                
            </Modal.Body>
    <Modal.Footer>
    <button  className="cmn_Button_style ">Add Event</button>

    </Modal.Footer>
  </Modal></div>
  )
}

export default AddEventModal