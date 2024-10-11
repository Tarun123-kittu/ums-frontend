import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { useAppContext } from '../../Utils/appContecxt'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'


const localizer = momentLocalizer(moment)
const myEventsList = [
    {
      id: 0,
      title: 'Morning Meeting',
      start: new Date(2024, 9, 10, 9, 0),
      end: new Date(2024, 9, 10, 10, 0),
      color: '#FF5733' // Custom color for this event
    },
    {
      id: 1,
      title: 'Client Presentation',
      start: new Date(2024, 9, 10, 10, 30),
      end: new Date(2024, 9, 10, 11, 30),
      color: '#33C1FF' // Another custom color
    },
    {
      id: 2,
      title: 'Lunch with Team',
      start: new Date(2024, 10, 10, 12, 0),
      end: new Date(2024, 10, 10, 13, 0),
      color: '#8E44AD'
    },
    {
      id: 3,
      title: 'Project Review',
      start: new Date(2024, 10, 10, 14, 0),
      end: new Date(2024, 10, 10, 15, 0),
      color: '#28B463'
    }
  ];
const MarkAttendence = () => {
    const {show} =useAppContext()
  return (
    <section>
    <Sidebar/>
  <div className={` lightgray_bg ${show?"cmn_margin":"cmn_margin_outer"}`  }>

 <div className='admin_dashboard_outer mt-0'>
    <div className='attendence_submit cmn_card'>
        <h4>Mark Attendence</h4>
        <div className='row align-items-end row-gap-2'>
            <div className='col-md-3'>
                <div className='form-group'>
                    <label htmlFor="Day">Day</label>
                    <input type="text" placeholder='tuesday' className='form-control' />
                </div>
            </div>
            <div className='col-md-3'>
                <div className='form-group'>
                    <label htmlFor="date">Date</label>
                    <input type="text" placeholder='08-10-2024' className='form-control' />
                </div>
            </div>
            <div className='col-md-3'>
                <div className='form-group'>
                    <label htmlFor="time">Time</label>
                    <input type="text" placeholder='01:09:26 PM' className='form-control' />
                </div>
            </div>
            <div className='col-md-3 text-center'>
                <button className='cmn_bg_btn'>Mark Your Attendence</button>    
            </div>
        </div>
    </div>
    <div className='attendence_submit cmn_card'>
        <h4>Ready To Go?</h4>
        <div className='row align-items-end row-gap-2'>
            <div className='col-md-3'>
                <div className='form-group'>
                    <label htmlFor="Day">Day</label>
                    <input type="text" placeholder='tuesday' className='form-control' />
                </div>
            </div>
            <div className='col-md-3'>
                <div className='form-group'>
                    <label htmlFor="date">Date</label>
                    <input type="text" placeholder='08-10-2024' className='form-control' />
                </div>
            </div>
            <div className='col-md-3'>
                <div className='form-group'>
                    <label htmlFor="Intime">In Time</label>
                    <input type="text" placeholder='01:09:26 PM' className='form-control' />
                </div>
            </div>
            <div className='col-md-3'>
                <div className='form-group'>
                    <label htmlFor="CurrentTime">Current Time</label>
                    <input type="text" placeholder='01:09:26 PM' className='form-control' />
                </div>
            </div>
            <div className='col-md-12'>
            <div className='form-group'>
                    <label htmlFor="addTask">Add Your task</label>
                    <input type="text" placeholder='Add you task' className='form-control' />
                </div>
            </div>
            <div className='col-md-12'>
            <div className='form-group'>
                    <label htmlFor="searchtask">Add task</label>
                    <textarea name="" id="" className='form-control'></textarea>
                </div>
            </div>
            <div className='col-md-12 text-center mt-2'>
                <button className='cmn_bg_btn'>Submit</button>    
            </div>
        </div>
    </div>
   <div className='mt-3 cmn_card'>
   <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    //   eventPropGetter={eventStyleGetter}
      views={['month', 'agenda']}    
      style={{ height: 500 }}
    />
   </div>
 </div> 


  </div>
  </section>
  )
}

export default MarkAttendence