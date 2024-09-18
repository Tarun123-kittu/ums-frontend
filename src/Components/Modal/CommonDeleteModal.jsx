import React from 'react'
import { Modal } from 'react-bootstrap'

const CommonDeleteModal = ({show,setShow,heading_text,paragraph_text,dialogClassname}) => {

const handleClose=()=>{
    setShow(false)
}
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
        <h3 className='heading text-center mt-4'>{heading_text} </h3>
        <h6 className='text-center mt-4 small_fontsize'>{paragraph_text}</h6>
    </Modal.Body>
    <Modal.Footer className='justify-content-center gap-3'>
    <button className='cmn_darkgray_btn cmn_Button_style' onClick={handleClose}>Cancel</button>
    <button className='cmn_Button_style'>Delete</button>
    </Modal.Footer>
</Modal></div>
  )
}

export default CommonDeleteModal