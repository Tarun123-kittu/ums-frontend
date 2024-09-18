import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import Notification from '../Notification/Notification'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import { useAppContext } from '../../Utils/appContecxt'

const ViewEmployeeInfo = () => {
    const {show} =useAppContext()

    const obj = [
        { name: "Attendence Report", path: "/attendenceReport" },
        { name: "Information About Dinesh Kumar", path: "/viewEmployeeInfo" },
      ];
  return (
    <section>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer ${show?"cmn_margin":""}`  }>
    <Notification/>
  
    <div className='employee_wrapper cmn_padding_outer'>
      <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"} 
      />
     <div className='employee_info_wrappers'>
  
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
  <div className='table-responsive mt-4 transparent_bg'>
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

export default ViewEmployeeInfo