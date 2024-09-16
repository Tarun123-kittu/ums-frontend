import React from 'react'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import Notification from '../Notification/Notification'
import { FiEdit } from 'react-icons/fi';
import Sidebar from '../../Sidebar/Sidebar';
import { useAppContext } from '../../Utils/appContecxt';
import { FaSortDown } from 'react-icons/fa';
import { TiArrowSortedUp } from 'react-icons/ti';

const LeaveBank = () => {
    const obj = [
        { name: "Leave Application", path: "/leaveApplication" },
        { name: "Leave Bank", path: "/leaveBank" },
        
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

<div className='d-flex employee_container align-items-center mt-3'>

<div className='employee_wrapper'>
    <h4 className='inter_fontfamily'>Select Financial Year</h4>
   <div className='serach_user_outer'>
    <input placeholder='2024'/>
   <div className='sort_outer d-flex '>
   <TiArrowSortedUp />
   <FaSortDown />
   </div>
   </div>
</div>

<div className='employee_wrapper'>
    <h4 className='inter_fontfamily'>Month</h4>
   <div className='serach_user_outer'>
    <input placeholder='2024'/>
   <div className='sort_outer d-flex '>
   <TiArrowSortedUp />
   <FaSortDown />
   </div>
   </div>
</div>
<div className='employee_wrapper'>
    <h4 className='inter_fontfamily'>Year</h4>
   <div className='serach_user_outer'>
    <input placeholder='2024'/>
   <div className='sort_outer d-flex '>
   <TiArrowSortedUp />
   <FaSortDown />
   </div>
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
            <th>Taken Leave</th>
            <th>Paid Leave</th>
            <th>Action</th>
          </tr>
         
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>John</td>
            <td>2</td>
            <td>4</td>
         
            <td>
            <div className='cmn_action_outer yellow_bg'><FiEdit /></div>
            </td>
          </tr>
        </tbody>
        </table>
         </div>
      </div>

    


    </div>
    </section>
  )
}

export default LeaveBank