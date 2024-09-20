import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import { useAppContext } from '../Utils/appContecxt'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'
import PaginationComp from '../Pagination/Pagination'
import RegisterCandidate from '../Modal/RegisterCandidate'
import { GoDotFill } from 'react-icons/go'
import InviteTechRoundModal from '../Modal/InviteTechRoundModal'
import DeleteModal from '../Modal/DeleteModal'

const Candidate = () => {
    const { show } = useAppContext();
const[showRegisterModal,setShowRegiterModal]=useState(false)
const[showTechRoundModal,setShowTechRoundModal]=useState(false)
const[showDeleteModal,setShowDeleteModal]=useState(false)

  return (  
    <>
    <Sidebar/>
    <div className={`wrapper ${show?"cmn_margin":""}`  }>

    <div className='header_wrapper'>
    <div>

      <h3 className='cmn_large_font'>Candidate List</h3>
    </div>
    <Header/>
    </div>
   
    <div className='text-end register_btn_wrapper mt-3'>
      <button onClick={()=>{setShowRegiterModal(true)}} className='cmn_btn'><IoMdAdd /> Register</button>
    </div>
    <div className="table-responsive candidate_table_outer cmn_radius">
    <Table hover className="user-table candidate_entry_table">
      <thead>
        <tr>
          <th>Sr.no</th>
          <th>Username</th>
          <th>Email</th>
          <th>Profile</th>
          <th>Experience</th>
          <th>HR round</th>
          <th>Invite(HR round)</th>
          <th>Technical round</th>
          <th>Invite(Tech round)</th>
          <th>Final Result</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>1</td>
            <td>John</td>
            <td>john@creative-tim.com</td>
            <td>Designer</td>
            <td>1.5</td>
            <td>Pending</td>
            <td>
             <div className='d-flex gap-2'>
                <button className="invite_btn  resend_btn">Resend</button> 
                <button className="invite_btn cmn_btn_color">Invite</button>
             </div>
         
            </td>
            <td>testStatus</td>
            <td>
            <div className='d-flex gap-2'>
                <button className="invite_btn  resend_btn">Resend</button> 
                <button className="invite_btn cmn_btn_color" onClick={()=>{setShowTechRoundModal(true)}}>Invite</button>
             </div>
              
            </td>
            <td>
                <div className='d-flex gap-1'>
                    <h3 className='mb-0 selected_text'>Selected</h3>
                    <GoDotFill className='selectedResult_icon'/>
                </div>
            </td>
            <td>
              <div className="actions_wrapper">
                <CiEdit className="MdEdit cursor-pointer me-2"  />
                <RiDeleteBinLine className="cursor-pointer MdEdit" onClick={()=>{setShowDeleteModal(true)}}  />
              </div>
            </td>
          </tr>
      
      </tbody>
    </Table>
    <PaginationComp/>
  </div>
{showRegisterModal && <RegisterCandidate show={showRegisterModal} setShow={setShowRegiterModal}/>}
{showTechRoundModal && <InviteTechRoundModal show={showTechRoundModal} setShow={setShowTechRoundModal}/>}
{showDeleteModal && <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal}/>}
    </div>
  
</>
  )
}

export default Candidate