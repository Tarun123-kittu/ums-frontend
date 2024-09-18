import React from 'react'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import Notification from '../Notification/Notification'
import Sidebar from '../../Sidebar/Sidebar';
import { useAppContext } from '../../Utils/appContecxt';
import { FaSort } from 'react-icons/fa';

const LeaveReport = () => {
    const obj = [
        { name: "Leave Application", path: "/leaveApplication" },
        { name: "Leave Report", path: "/leaveReport" },
        
      ];

const {show} = useAppContext()

  return (
    <section className='attendenceReport_outer'>
      <Sidebar/>
    <div className={`wrapper gray_bg admin_outer  ${show?"cmn_margin":""}`  }>
      <Notification/>
    
      <div className='cmn_padding_outer'>
        <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"}  onBreadcrumbClick={""} 
        />

<div className='d-flex employee_container align-items-end mt-3'>

<div className='new_employee_form_group employee_wrapper'>

<label className='inter_fontfamily'>Select Financial Year</label>
<div class="custom-select-wrapper ">
<select class="custom-select form-control" placeholder="Select Financial Year">

 <option  value="2022">jan</option>
      
  
</select>
<FaSort className='dropdown-icon '/>
</div>
</div>

<div className='new_employee_form_group employee_wrapper'>

<label className='inter_fontfamily'>Month</label>
<div class="custom-select-wrapper ">
<select class="custom-select form-control" placeholder="Month">
   
 <option  value="2022">Jan</option>
  
</select>
<FaSort className='dropdown-icon '/>
</div>
</div>


<div className='new_employee_form_group employee_wrapper'>
<label className='inter_fontfamily'>Year</label>
<div class="custom-select-wrapper ">
<select class="custom-select form-control" placeholder='Year'>
  <option  value="2022">2022</option>
 
  
</select>
<FaSort className='dropdown-icon '/>
</div>
</div>

<div className='employee_wrapper text-center serach_add_outer'>
  <button className='cmn_Button_style'>Search</button>

</div>

</div>
        <div className='table-responsive mt-3 transparent_bg'>
      <table className='employee_detail_table'>
        <thead>
        <tr>
            <th>#</th>
            <th>Employee </th>
            <th>Type</th>
            <th>Apply On</th>
            <th>From</th>
            <th>To</th>
            <th>Total</th>
            <th>Description</th>
            <th>Status</th>
            <th>Remark</th>
          </tr>
         
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>John</td>
            <td>Casual Leave</td>
            <td>19/08/24</td>
            <td>21/08/24</td>
            <td>23/08/24</td>
            <td>2</td>
            <td>Leave For Rakhi</td>
            <td>Accepted</td>
            <td></td>
         
           
          </tr>
        </tbody>
        </table>
         </div>
      </div>

    


    </div>
    </section>
  )
}

export default LeaveReport