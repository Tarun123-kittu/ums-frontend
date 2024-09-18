import React from 'react'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import Notification from '../Notification/Notification'
import { FiEdit } from 'react-icons/fi';
import Sidebar from '../../Sidebar/Sidebar';
import { useAppContext } from '../../Utils/appContecxt';
import { FaSortDown } from 'react-icons/fa';
import { TiArrowSortedUp } from 'react-icons/ti';
import Select from '../../Common/Select';

const LeaveBank = () => {
    const obj = [
        { name: "Leave Application", path: "/leaveApplication" },
        { name: "Leave Bank", path: "/leaveBank" },
        
      ];
      const yearObj=[
        {
          value:2022,
          option:2022
        },
        {
          value:2023,
          option:2023
        },
        {
          value:2024,
          option:2023
        },
        ]
        const monthDataObj=[

          { value: "01", option: "January" },
          { value: "02", option: "February" },
          { value: "03", option: "March" },
          { value: "04", option: "April" },
          { value: "05", option: "May" },
          { value: "06", option: "June" },
          { value: "07", option: "July" },
          { value: "08", option: "August" },
          { value: "09", option: "September" },
          { value: "10", option: "October" },
          { value: "11", option: "November" },
          { value: "12", option: "December" },
      
      ]
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

<div className='employee_wrapper'>
<Select labelname={"Select Financial Year"}  labelClass={""} options={yearObj}/>

</div>

<div className='employee_wrapper'>
<Select labelname={"Months"}  labelClass={""} options={monthDataObj}/>

</div>
<div className='employee_wrapper'>
<Select labelname={"Years"}  labelClass={""} options={yearObj}/>

   </div>

<div className='employee_wrapper text-end serach_add_outer'>
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