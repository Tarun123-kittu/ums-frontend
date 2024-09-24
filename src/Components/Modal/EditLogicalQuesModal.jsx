import React from 'react'
import { Modal } from 'react-bootstrap'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import InputField from '../Common/InputField'

const EditLogicalQuesModal = ({show,setShow}) => {


const handleClose=()=>{
    setShow(false)
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
        dialogClassName='custom_modal_width'
    >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
            <h3 className='heading'>Edit Logical Question  </h3>
            <InputField placeholder={"Enter Question"} labelname={"Logical Question"} type={"text"} classname={"new_employee_form_group"}/>
             <div className='form-group new_employee_form_group'>
                <label>Logical Answer</label>
                <textarea className='form-control mt-2' placeholder='Enter Answer' rows={4}/>
             </div>
          
         
        </Modal.Body>
        <Modal.Footer>
 
            <button className='cmn_Button_style'>Edit</button>
        </Modal.Footer>
    </Modal>
</div>
  )
}

export default EditLogicalQuesModal