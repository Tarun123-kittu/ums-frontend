import React from "react"
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa';

const ChangePassword = ({show,onHide}) => {
 
const[showPassword ,setShowPassword]=useState(false)
const[showConfirmPassword ,setShowConfirmPassword]=useState(false)

const[showNewPassword ,setShowNewPassword]=useState(false)
   
    return (
        <div>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='custom_modal_container'
                show={show} onHide={onHide}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h3 className="heading"> Change Password</h3>
                    <div className='form-group mt-3 position-relative'>
                        <label className='modal_label'>Old Password</label>
                        <input type={`${showPassword?"text":"password"}`} className="candidate-register-input form-control mt-1" placeholder="Enter your password" ></input>
                        <div className='open_eye'>
                        {
                                showPassword?  <IoEyeOutline onClick={()=>{setShowPassword(false)}}/>:
                                <FaRegEyeSlash onClick={()=>{setShowPassword(true)}}/>
                        }

                        </div>
                    </div>
                    <div className='form-group mt-3 position-relative'>
                        <label className='modal_label'>New Password</label>
                        <input type={`${showNewPassword?"text":"password"}`} className="candidate-register-input form-control mt-1" placeholder="Enter new password"></input>
                        <div className='open_eye'>
                            {
                                showNewPassword?  <IoEyeOutline onClick={()=>{setShowNewPassword(false)}}/>:
                                <FaRegEyeSlash onClick={()=>{setShowNewPassword(true)}}/>
                            }
                       
                     
                        </div>
                    </div>
                    <div className='form-group mt-3 position-relative'>
                        <label className='modal_label'>Confirm New Password</label>
                        <input type={`${showConfirmPassword?"text":"password"}`} className="candidate-register-input form-control mt-1" placeholder="Re-type new password"  ></input>
                        <div className='open_eye'>
                        {
                                showConfirmPassword?  <IoEyeOutline onClick={()=>{setShowConfirmPassword(false)}}/>:
                                <FaRegEyeSlash onClick={()=>{setShowConfirmPassword(true)}}/>
                        }

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button  className='red_btn'>Change Password</button>
                    <button onClick={onHide}  className='red_btn'>Cancel</button>
                
                </Modal.Footer>
                
            </Modal>
  
        </div>
    )
}

export default ChangePassword

