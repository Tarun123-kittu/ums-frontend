import React from 'react'
import {Modal} from "react-bootstrap"
const AddEventModal = ({show,setShow}) => {
    const  handleClose=()=>{
        setShow(false)
    }
  return (
    <div>
        <Modal show={show} onHide={handleClose} 
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
                <input className="candidate-register-input form-control mt-2" placeholder="Enter candidate name"></input>

                </div>
                <div className="form-group new_employee_form_group mt-2">
                <label className="modal_label">Type</label>
                <input className="candidate-register-input form-control mt-2" placeholder="Enter candidate email"></input>

                </div>
                <div className="form-group new_employee_form_group mt-2">
                <label className="modal_label">Event</label>
                <input className="candidate-register-input form-control mt-2" placeholder="Enter candidate email"></input>

                </div>
                
                
            </Modal.Body>
    <Modal.Footer>
    <button  className="cmn_Button_style ">Add Event</button>

    </Modal.Footer>
  </Modal></div>
  )
}

export default AddEventModal