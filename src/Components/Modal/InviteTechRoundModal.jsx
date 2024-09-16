import React from 'react'
import Modal from 'react-bootstrap/Modal';
const InviteTechRoundModal = ({show,setShow}) => {
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
    >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
            <h3 className='heading'>Invite for Technical Round   </h3>
            
            <div className='form-group'>
            <label>Profile</label>
            <input  className="candidate-register-input  form-control mt-1" ></input>

            </div>
            <div className='form-group mt-3'>
            <label>Select Series</label>

            <select className="candidate-register-input form-control mt-1" >
                <option value="">Select series</option>
               
                    <option>
                      12
                    </option>
              
            </select>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <button className='cmn_btn'>Send Invite</button>
        </Modal.Footer>
    </Modal>
</div>
  )
}

export default InviteTechRoundModal