import React from 'react'
import {Modal} from "react-bootstrap"
import "./modal.css"
import CustomSelectComp from '../Common/CustomSelectComp';
const EditEventModal = ({show,setShow}) => {
    const  handleClose=()=>{
        setShow(false)
    }
    const options = [
      { value: 'Holiday', label: 'Holiday' },
      { value: 'Events', label: 'Events' },
    
    ];

  
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
    <button  className="cmn_Button_style ">Edit</button>

    </Modal.Footer>
  </Modal></div>
  )
}

export default EditEventModal