import React from 'react'
import { Modal } from 'react-bootstrap'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import InputField from '../Common/InputField'
import { FaSort } from 'react-icons/fa'

const TechInterviewQuestionModal = ({show,setShow}) => {
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
    <h3 className='heading mt-3'>Choose the technical round Interview questions for Test series. </h3>
            
    <InputField placeholder={"Designer"} labelname={"Profile"} type={"text"} classname={"new_employee_form_group"}/>
    <div className='new_employee_form_group form-group'>
    <label>Test Series</label>
    <div class="custom-select-wrapper ">
    <select class="custom-select form-control" placeholder="Select Test Series">
    <option>Node.jsx</option>
    <option>UI/UX Designer</option>
    </select>
    <FaSort className='dropdown-icon '/>
  </div>
    </div>
        </Modal.Body>
        <Modal.Footer>
            <button className='cmn_Button_style cmn_darkgray_btn'>Cancel </button>
            <button className='cmn_Button_style'>Send Link</button>
        </Modal.Footer>
    </Modal>
</div>
  )
}

export default TechInterviewQuestionModal