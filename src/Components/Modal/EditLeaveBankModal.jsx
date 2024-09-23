import React from 'react'
import { Modal } from 'react-bootstrap'
import InputField from '../Common/InputField'

const EditLeaveBankModal = ({show,setShow}) => {

const handleClose=()=>{
    setShow(false)
}
  return (
    <div>    
    <Modal
    show={show}
    
    aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
    centered
    onHide={handleClose}
    className="custom_modal_container"
>
    <Modal.Header closeButton>
      
    </Modal.Header>
    <Modal.Body>

    <h3 className='heading'>Leave Bank </h3>
    <InputField labelname={"Taken Leaves"} type={"number"} classname={"new_employee_form_group"}/>
    <InputField labelname={"Paid Leaves"} type={"number"} classname={"new_employee_form_group"}/>

     </Modal.Body>
    <Modal.Footer>
    <button className='cmn_Button_style'>Edit</button>
    
    </Modal.Footer>
</Modal></div>
  )
}

export default EditLeaveBankModal