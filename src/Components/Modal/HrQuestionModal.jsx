import React from 'react'
import { Modal } from 'react-bootstrap'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import InputField from '../Common/InputField'

const HrQuestionModal = ({show,setShow}) => {
const navigate=useNavigate()

const handleClose=()=>{
    setShow(false)
}
const startHandler=()=>{
    setShow(false)
    navigate("/hrInterViewQuestion")
}
  return (
    <div>    
 <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
        centered
        onHide={handleClose}
        className="custom_modal_container"
    >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
            <h3 className='heading'>HR round interview questions  </h3>
            <InputField placeholder={"Enter Question Number"} labelname={"Question"} type={"number"} classname={"new_employee_form_group"}/>
           
         
        </Modal.Body>
        <Modal.Footer>
            <button className='cmn_Button_style cmn_darkgray_btn'>Cancel </button>
            <button className='cmn_Button_style' onClick={startHandler}>Start</button>
        </Modal.Footer>
    </Modal>
</div>
  )
}

export default HrQuestionModal