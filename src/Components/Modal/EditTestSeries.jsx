import React from 'react'
import { Modal } from 'react-bootstrap'
import InputField from '../Common/InputField'
import CustomSelectComp from '../Common/CustomSelectComp'

const EditTestSeriesModal = ({show,setShow}) => {

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

    <h3 className='heading'>Edit Test Series </h3>
    <InputField labelname={"Series "} placeholder={'Enter Series Name'} type={"text"} classname={"new_employee_form_group"}/>
    <InputField labelname={"Time taken to complete this series test"} placeholder={'Enter Estimated Times'} type={"text"} classname={"new_employee_form_group"}/>
    <div className='form-group new_employee_form_group'>
      <label>Profile</label>
     <div className='mt-2'><CustomSelectComp/></div>
      </div>
    <div className='form-group new_employee_form_group'>
        <label>Description</label>
        <textarea  className="form-control mt-2" placeholder='Enter The Small Description' rows={4}/>
    </div>

     </Modal.Body>
    <Modal.Footer>
    <button className='cmn_Button_style'>Edit</button>
    
    </Modal.Footer>
</Modal></div>
  )
}

export default EditTestSeriesModal