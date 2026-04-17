

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { IoMdPower } from 'react-icons/io';
import "./modal.css"

const LogoutModal = ({ show, setShow }) => {


  const handleClose = () => {
    setShow(false)
  };


  const handleLogout = () => {

    setShow(false)

  }
  return (
    <>


      <Modal size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='logout_modal_wrapper' show={show} onHide={handleClose}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <div className='IoMdPower_outer d-flex justify-content-center align-items-center'>
            <div className='logout_wrapper'>
              <IoMdPower />
            </div>

          </div>
          <h3 className='text-center logout_heading'>Log out</h3>
          <h4 className='logout_title text-center'>
            Are you Logging Out? You can log back anytime

          </h4>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <button className='cmn_cancel_btn' onClick={handleClose}>
            Cancel
          </button>
          <button className='red_btn' onClick={handleLogout}>
            Logout
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogoutModal;