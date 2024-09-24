import React from 'react'
import { Modal } from 'react-bootstrap'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import InputField from '../Common/InputField'
import CustomSelectComp from '../Common/CustomSelectComp'
import "./modal.css"
const EditObjectiveQuesModal = ({show,setShow}) => {


const handleClose=()=>{
    setShow(false)
}

  return (
    <div>    
 <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
        className="custom_modal_container"
        dialogClassName='custom_modal_width'
    >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
            <h3 className='heading'>Edit Objective Question</h3>
             <h4 className='inter_fontfamily cmn_ques_heading'>Objective Question</h4>
             <div className='form-group new_employee_form_group'>
               <input type='text' className='form-control' placeholder='Enter Your Question'/>
             </div>
            <div className='form-group new_employee_form_group'>
               <input type='text' className='form-control' placeholder='Enter Option 1'/>
             </div>
             <div className='form-group new_employee_form_group'>
               <input type='text' className='form-control' placeholder='Enter Option 2'/>
             </div>
             <div className='form-group new_employee_form_group'>
               <input type='text' className='form-control' placeholder='Enter Option 3'/>
             </div> 
             <div className='form-group new_employee_form_group'>
               <input type='text' className='form-control' placeholder='Enter Option 4'/>
             </div> 
             <div className='mt-3'>
                <label className='inter_fontfamily cmn_ques_heading'>Type</label>
          <div className='mt-2'>
          <CustomSelectComp/>
          </div>
             </div>
          
         
        </Modal.Body>
        <Modal.Footer>
 
            <button className='cmn_Button_style'>Edit</button>
        </Modal.Footer>
    </Modal>
</div>
  )
}

export default EditObjectiveQuesModal