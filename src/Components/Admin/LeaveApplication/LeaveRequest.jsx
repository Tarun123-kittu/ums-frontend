import React from 'react'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import Notification from '../Notification/Notification'
import { FiEdit } from 'react-icons/fi';
import Sidebar from '../../Sidebar/Sidebar';
import { useAppContext } from '../../Utils/appContecxt';


const LeaveRequest = () => {
    const obj = [
        { name: "Leave Application", path: "/leaveApplication" },
        { name: "Leave Request", path: "/leaveRequest" },
        
      ];

const {show} = useAppContext()

  return (
    <section className='leaveRequest_outer'>
      <Sidebar/>
    <div className={`wrapper gray_bg admin_outer  ${show?"cmn_margin":""}`  }>
      <Notification/>
    
      <div className='cmn_padding_outer'>
        <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"}  onBreadcrumbClick={""} 
        />


        <div className='table-responsive mt-3 transparent_bg'>
      <table className='employee_detail_table'>
        <thead>
        <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Type</th>
            <th>Apply On</th>
            <th>From</th>
            <th>To</th>
            <th>Total</th>
            <th>Description</th>
            <th>Status</th>
            <th>Remark</th>
            <th>Action</th>
          </tr>
         
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>John</td>
            <td>Casual Leave</td>
            <td>11/08/24</td>
            <td>19/08/24</td>
            <td>29/08/24</td>
            <td>10</td>
            <td>Leave for marriage</td>
            <td>PENDING</td>
            <td></td>
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

export default LeaveRequest