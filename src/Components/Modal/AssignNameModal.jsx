import React from 'react'
import { Modal } from 'react-bootstrap'
import Select from '../Common/Select'

const AssignNameModal = ({show,setShow,dialogClassname}) => {

const handleClose=()=>{
    setShow(false)
}
const AssingnameObj=[{
    value:"Pritpal Sohi",option:"Pritpal Sohi",
     value:"Sahil ",option:"Sahil"
}]
  return (
    <div className='common_delete_modal_outer'>    
    <Modal
    show={show}
    size='md'
    aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
    centered
    onHide={handleClose}
    className="custom_modal_container"
    dialogClassName={dialogClassname}
>
    <Modal.Header closeButton>
      
    </Modal.Header>
    <Modal.Body>
    <h3 className="heading"> Assigned Names</h3>
     <Select labelname={"Assigned Names"} placeholder={"Enter Name"} labelClass={"new_employee_form_group"} options={AssingnameObj}/>
    </Modal.Body>
    <Modal.Footer className='justify-content-center gap-3'>
    <button className='cmn_darkgray_btn cmn_Button_style' onClick={handleClose}>Cancel</button>
    <button className='cmn_Button_style'>Add Event</button>
    </Modal.Footer>
</Modal></div>
  )
}

export default AssignNameModal