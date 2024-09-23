import React, { useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { useAppContext } from '../../Utils/appContecxt'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import Notification from '../Notification/Notification'
import "./rolePermission.css"
import { IoMdAdd } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'
import CommonDeleteModal from '../../Modal/CommonDeleteModal'
import AssignNameModal from '../../Modal/AssignNameModal'

const EditRoleAndPermission = () => {
    const obj = [
        { name: "Role & Permissions", path: "/rolePermission" },
        { name: "Edit the Ux/Ui Designer Role", path: "/editRole" },
        
      ];
const {show}=useAppContext()
const [showDeleteModal,setShowDeleteModal]=useState(false)
const [showAssignModal,setShowAssignModal]=useState(false)
const [showDeleteRoleModal,setShowDeleteRoleModal]=useState(false)

  return (
    <section className='role_permission_outer'>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer ${show?"cmn_margin":""}`  }>
    <Notification/>
  
    <div className='employee_wrapper cmn_padding_outer'>
      <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"} 
      />
      <div className='row'>
        <div className='col-lg-8 col-sm-12 col-md-12'>
        <div className='cmn_border edit_role_wrapper'>
      <div className='d-flex assign_role_wrapper'>
     <div className='form-group new_employee_form_group'>
        <label>Role Name</label>
        <input className='form-control'/>
     </div>
     <div className='edit_role_delete_outer'>
     <button className='cmn_Button_style cmn_darkgray_btn' onClick={()=>{setShowDeleteRoleModal(true)}}>Delete</button>

     </div>

      </div>
      {/* permissions */}
      <div className='table-responsive transparent_bg mt-4'>
     <table className='edit_role_table'>
        <thead>
          <tr>
            <th>Permissions</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View</th>
            <th>Read</th>
            <th>Create</th>
         
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>Abc Permission</td>
            <td>
              <input type='checkbox'/>
            </td>
            <td>  <input type='checkbox'/></td>
            <td>  <input type='checkbox'/></td>
            <td>  <input type='checkbox'/></td>
            <td>  <input type='checkbox'/></td>
          </tr>
        </tbody>
      </table>
     </div>

        <div className='d-flex gap-3 justify-content-end mt-4'>
        <button className='cmn_Button_style cmn_darkgray_btn'>Exit</button>
        <button className='cmn_Button_style'>Save</button>

        </div>
    </div>
        </div>
        <div className='col-lg-4 col-sm-12 col-md-12'>
          <div className='cmn_border'>
            <div className='d-flex  assign_role_header'>
          <h3 className='cmn_text_heading'>Assigned Role List Names</h3>
          <div>
          <button className='dark_red_bg add_role_btn' onClick={()=>{setShowAssignModal(true)}}><IoMdAdd /></button>

          </div>

            </div>
          
            <ul className='role_list'>
            <li>
                <div className='d-flex role_list_wrapper'>
                <h3 className='cmn_text_heading'>Pritpal Sohi</h3>
                <RiDeleteBin6Line className='cursor_pointer' onClick={()=>{setShowDeleteModal(true)}}/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    
    
    </div>
    {showAssignModal && <AssignNameModal dialogClassname={'custom_modal_width'} show={showAssignModal} setShow={ setShowAssignModal}/>}
{showDeleteModal && <CommonDeleteModal dialogClassname ={'custom_modal_width'} show={showDeleteModal} setShow={setShowDeleteModal} 
heading_text={"Are you sure to delete the Pritpal Sohi form Test Series."} paragraph_text={""}/>}
 {showDeleteRoleModal && 
 <CommonDeleteModal dialogClassname={"custom_modal_width"} className={""}show={showDeleteRoleModal} setShow={setShowDeleteRoleModal} 
  heading_text={"Are you sure to delete Test Series role"}
  paragraph_text={"Confirm deletion of Test Series Once deleted, this action cannot be reversed."}/>}
  </div>
  </section>
  )
}

export default EditRoleAndPermission