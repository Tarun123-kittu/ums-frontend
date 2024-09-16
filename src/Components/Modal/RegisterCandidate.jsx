import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./modal.css"
function RegisterCandidate({show,setShow}) {


  const handleClose = () => setShow(false);

  return (
    <>
  

      <Modal show={show} onHide={handleClose} 
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="custom_modal_container">
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
                    <h3 className="heading"> Register Candidate</h3>
                    <div className="form-group">
                    <label className="modal_label">Username</label>
                    <input className="candidate-register-input form-control mt-2" placeholder="Enter candidate name"></input>

                    </div>
                    <div className="form-group mt-2">
                    <label className="modal_label">E-mail address</label>
                    <input className="candidate-register-input form-control mt-2" placeholder="Enter candidate email"></input>

                    </div>
                    <div className="form-group mt-2">
                    <label className="modal_label">Profile</label>
                    <select className="candidate-register-input form-control mt-2">
                        <option value="">Select profile</option>
                       
                            <option>
                               java
                            </option>
                 
                    </select>
                    </div>
                    <div className="form-group mt-2">
                    <label className="modal_label">Experience</label>
                    <input className="candidate-register-input form-control mt-2" placeholder="Enter total experience"></input>

                    </div>
                    
                </Modal.Body>
        <Modal.Footer>
        <button  className="cmn_btn">Submit</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterCandidate;