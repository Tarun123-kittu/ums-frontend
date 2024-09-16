import React, { useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import Notification from '../Notification/Notification'
import { useAppContext } from '../../Utils/appContecxt'
import { FaRegEdit, FaSortDown } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TiArrowSortedUp } from 'react-icons/ti'
import "./holiday.css"
import AddEventModal from '../../Modal/AddEventModal'
const HolidayEvent = () => {
const {show} = useAppContext()
const [showEventModal,setShowEventModal]=useState(false)
  return (
    <section className='holiday_event_wrapper'>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer ${show?"cmn_margin":""}`  }>
    <Notification/>
  
    <div className='cmn_padding_outer'>
     
    <div className='d-flex employee_container align-items-center mt-3'>

<div className='employee_wrapper'>
    <h4 className='inter_fontfamily'>Happy Holidays</h4>
   <div className='serach_user_outer'>
    <input placeholder='2024'/>
   <div className='sort_outer d-flex '>
   <TiArrowSortedUp />
   <FaSortDown />
   </div>
   </div>
</div>





<div className='employee_wrapper text-end serach_add_outer'>
  <button className='cmn_Button_style'>Search</button>
  <button className='cmn_Button_style ms-3' onClick={()=>{setShowEventModal(true)}}>Add Event</button>
</div>

</div>
      <div className='table-responsive mt-3 transparent_bg'>
      <table className='employee_detail_table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Event</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>Friday 26/01/24</td>
            <td>Republic Day</td>
           
            <td>
              <div className='d-flex gap-2 justify-content-center'>
                <div className='cmn_action_outer yellow_bg'><FaRegEdit /></div>
                <div className='cmn_action_outer red_bg'><RiDeleteBin6Line /></div>
     
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
   
   
    </div>

  
{showEventModal && <AddEventModal show={showEventModal} setShow={setShowEventModal} />}

  </div>
  </section>
  )
}

export default HolidayEvent