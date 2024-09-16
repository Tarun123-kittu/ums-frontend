import React from 'react'
import { Modal } from 'react-bootstrap'
import { RiDeleteBinLine } from 'react-icons/ri'

const DeleteModal = ({show,setShow}) => {

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
        <div className='custom_deleteicon_outer'>
            <div className='custom_deleteicon text-center'>
        <RiDeleteBinLine size={50} />

            </div>
        </div>
        <h3 className='heading text-center mt-4'>Are you sure to delete this Candidate?  </h3>
        <h6 className='text-center mt-4'>You won’t able to revert this!</h6>
    </Modal.Body>
    <Modal.Footer className='justify-content-center gap-3'>
    <button className='cmn_cancel_btn' onClick={handleClose}>Cancel</button>
    <button className='cmn_btn'>Delete</button>
    </Modal.Footer>
</Modal></div>
  )
}

export default DeleteModal