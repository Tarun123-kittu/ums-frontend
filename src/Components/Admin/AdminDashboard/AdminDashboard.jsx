import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { useAppContext } from '../../Utils/appContecxt'
import "./adminDashboard.css"

import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from 'react-icons/fi';
import { PiArrowBendDownLeftBold } from 'react-icons/pi';

const AdminDashboard = () => {

  const {show} =useAppContext()
  return (
    <section>
      <Sidebar/>
    <div className={` lightgray_bg ${show?"cmn_margin":"cmn_margin_outer"}`  }>
   <div className='admin_dashboard_container'>
   </div>
   <div className='admin_dashboard_outer'>
   
    <div className='info_header d-flex justify-content-between align-items-center'>
    <h3 className='mb-0'>Information About Dinesh Kumar</h3>
    <div className='d-flex justify-content-end gap-2'>
    <div className='cmn_edit_outer darkGray_bg'><PiArrowBendDownLeftBold /></div>
    <div className='cmn_edit_outer yellow_bg'><FiEdit /></div>
     <div className='red_bg cmn_edit_outer'><RiDeleteBin6Line /></div>
  
    </div>

    </div>

    <div className='user_info_wrapper'>
  
     <ul className='user_info_list_outer'>
     <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>Name</h3>
        <h3 className='heading_style'>John</h3>
        <h3 className='heading_style'>Email</h3>
        <h3 className='heading_style'>john@gmail.com</h3>
      </li>
        <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>Mobile</h3>
        <h3 className='heading_style'>45454534</h3>
        <h3 className='heading_style'>User Name</h3>
        <h3 className='heading_style'>john</h3>
      </li>
      <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>DOB</h3>
        <h3 className='heading_style'>12-2-1998</h3>
        <h3 className='heading_style'>DOJ</h3>
        <h3 className='heading_style'>07-2-2024</h3>
      </li>
      <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>Skepe</h3>
        <h3 className='heading_style'>DineshKumar@ultivic.com</h3>
        <h3 className='heading_style'>Ultivic email</h3>
        <h3 className='heading_style'>john@ultivic.com</h3>
      </li>
      <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>Position</h3>
        <h3 className='heading_style'>Intern</h3>
        <h3 className='heading_style'>Technology/Department</h3>
        <h3 className='heading_style'>Backend</h3>
      </li>
      <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>Staus</h3>
        <h3 className='heading_style'>On Probition</h3>
        <h3 className='heading_style'>Salary</h3>
        <h3 className='heading_style'>1</h3>
      </li>
      <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>Emergency Contact Relationship</h3>
        <h3 className='heading_style'>Father</h3>
        <h3 className='heading_style'>Emergency Contact Name</h3>
        <h3 className='heading_style'>Harry</h3>
      </li>
      <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>Emergency Contact</h3>
        <h3 className='heading_style'>465576767</h3>
        <h3 className='heading_style'>Bank Name</h3>
        <h3 className='heading_style'>465576767</h3>
      </li>  
      <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>Account Number</h3>
        <h3 className='heading_style'>2343423243434</h3>
        <h3 className='heading_style'>Bank IFC Code</h3>
        <h3 className='heading_style'>2343423243434</h3>
      </li>
      <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>Increment Date</h3>
        <h3 className='heading_style'>2025-08-07 00:00:00</h3>
        <h3 className='heading_style'>Increment Date</h3>
        <h3 className='heading_style'>2025-08-07 00:00:00</h3>
      </li>
      <li className='d-flex align-items-center info_content'>
        <h3 className='heading_style'>Address</h3>
        <h3 className='heading_style'>Mohali tdi city sector 118</h3>
      </li>
      </ul>
     <div className='table-responsive mt-4'>
      <h3 className='heading_style'>Documents</h3>
     <table className='employee_detail_table mt-3'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Document Name</th>
            <th>Verified At</th>
            <th>Status</th>
         
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>John</td>
            <td>sd</td>
            <td>12:00</td>
            <td>Pending</td>
           
         
          </tr>
        </tbody>
      </table>
     </div>
    </div>
   </div>


    </div>
    </section>
  )
}

export default AdminDashboard