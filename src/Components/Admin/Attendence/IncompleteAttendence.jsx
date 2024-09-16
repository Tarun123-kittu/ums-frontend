import React from 'react'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import Notification from '../Notification/Notification'
import { FiEdit } from 'react-icons/fi';
import Sidebar from '../../Sidebar/Sidebar';
import { useAppContext } from '../../Utils/appContecxt';

const IncompleteAttendence = () => {
    const obj = [
        { name: "Attendance Report", path: "/attendenceReport" },
        { name: "Incomplete Attendance", path: "/incompleteAttendence" },
        
      ];

const {show} = useAppContext()

  return (
    <section className='incomplete_attendence_outer'>
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
            <th>Date</th>
            <th>Employee Name</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>19/08/24 -Monday</td>
            <td>John</td>
            <td>01:30:40 PM</td>
            <td>--</td>
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

export default IncompleteAttendence