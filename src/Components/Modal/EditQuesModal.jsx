

import React from 'react'
import { Modal } from 'react-bootstrap'
import "./modal.css"
const EditQuesModal = ({show,setShow}) => {

const handleClose=()=>{
    setShow(false)
}
  return (
    <div className='edit_ques_container'>    
    <Modal
    show={show}
    backdropClassName="custom-modal-backdrop"
    aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
    centered
    onHide={handleClose}
    className="custom_modal_container edit_ques_wrapper"
>
 
    <Modal.Body>
    <div className='editQuesModal_outer'>
        {/* <div className='triangle'></div> */}
        <div className='  new_employee_form_group'>
            <textarea placeholder='Enter Key Point' className='form-control' rows={6}/>
        </div>
      
    </div>
    </Modal.Body>
    <Modal.Footer className='justify-content-end gap-3'>
    <button className='cmn_Button_style cmn_darkgray_btn' onClick={handleClose}>Cancel</button>
    <button className='cmn_Button_style'>Delete</button>
    </Modal.Footer>
</Modal></div>
  )
}

export default EditQuesModal

