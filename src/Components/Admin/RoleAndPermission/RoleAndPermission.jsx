import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { useAppContext } from '../../Utils/appContecxt'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import Notification from '../Notification/Notification'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import "./rolePermission.css"
const RoleAndPermission = () => {
    const obj = [
        { name: "Role & Permissions", path: "/rolePermission" },
  
      ];
const {show}=useAppContext()

  return (
    <section className='role_permission_outer'>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer ${show?"cmn_margin":""}`  }>
    <Notification/>
  
    <div className='employee_wrapper cmn_padding_outer'>
      <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"} 
      />
      <div className='text-end'>
        <button className='cmn_Button_style'>Add</button>
      </div>
     
     <div className='table-responsive mt-3 transparent_bg'>
    
     <table className='employee_detail_table'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Role Name</th>
            <th>Assigned To</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>Admin</td>
            <td>Harmeet Sohi</td>
            <td> 
                <div className='d-flex gap-2'>
             
                <div className='cmn_action_outer yellow_bg'><FiEdit /></div>
                <div className='cmn_action_outer red_bg'><RiDeleteBin6Line /></div>
              </div></td>
        
         
          </tr>
        </tbody>
      </table>
     </div>
   
   
    </div>
  </div>
  </section>
  )
}

export default RoleAndPermission