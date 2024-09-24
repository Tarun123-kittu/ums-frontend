import React, { useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import Notification from '../Notification/Notification'
import { useAppContext } from '../../Utils/appContecxt'
import { FaRegEdit, FaSortDown } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TiArrowSortedUp } from 'react-icons/ti'
import "./holiday.css"
import AddEventModal from '../../Modal/AddEventModal'
import Select from '../../Common/Select'
import EditEventModal from '../../Modal/EditEventModal'
import CommonDeleteModal from '../../Modal/CommonDeleteModal'
import CustomSelectComp from '../../Common/CustomSelectComp'
const HolidayEvent = () => {
const {show} = useAppContext()
const [showEventModal,setShowEventModal]=useState(false)
const [showEditEventModal,setShowEditEventModal]=useState(false)
const [showDeleteModal,setShowDeleteModal]=useState(false)


  return (
    <section className='holiday_event_wrapper'>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer ${show?"cmn_margin":""}`  }>
    <Notification/>
  
    <div className='cmn_padding_outer'>
     
    <div className='d-flex employee_container align-items-end mt-3'>
    <div className='form-group new_employee_form_group w-100'>
            <label>Holiday</label>
             <div className='mt-2'>
             <CustomSelectComp/>
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
                <div className='cmn_action_outer yellow_bg cursor_pointer' onClick={()=>{setShowEditEventModal(true)}}><FaRegEdit /></div>
                <div className='cmn_action_outer red_bg cursor_pointer' onClick={()=>{setShowDeleteModal(true)}}><RiDeleteBin6Line /></div>
     
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
   
   
    </div>

  
{showEventModal && <AddEventModal show={showEventModal} setShow={setShowEventModal} />}
{showEditEventModal && <EditEventModal show={showEditEventModal} setShow={setShowEditEventModal}/>}
{showDeleteModal && <CommonDeleteModal dialogClassname={"custom_modal_width"} show={showDeleteModal} setShow={setShowDeleteModal}  heading_text={"Are you sure to delete the Holiday & Events"} paragraph_text={""}/>}

  </div>
  </section>
  )
}

export default HolidayEvent