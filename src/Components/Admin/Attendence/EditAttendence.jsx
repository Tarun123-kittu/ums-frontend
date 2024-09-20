import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { useAppContext } from '../../Utils/appContecxt'
import InputField from '../../Common/InputField'
import { PiArrowBendDownLeftBold, PiCalendarPlusDuotone } from 'react-icons/pi'
import "./attendence.css"

const EditAttendence = () => {

  const {show} =useAppContext()
  return (
    <section className='edit_attendence_wrapper'>
      <Sidebar/>
    <div className={` lightgray_bg ${show?"cmn_margin":"cmn_margin_outer"}`  }>
   <div className='admin_dashboard_container'>
    <h3 className='attendence_heading'><PiCalendarPlusDuotone /> Attendence</h3>
   </div>
   <div className='admin_dashboard_outer'>
   <div className='info_header d-flex justify-content-end'>
    
   <div className='cmn_edit_outer darkGray_bg'><PiArrowBendDownLeftBold /></div>

   </div>
   <div className='user_info_wrapper'>
    <div className='row'>
     <div className='col-lg-6 col-sm-12 col-md-12'>
     <InputField classname={"new_employee_form_group"} labelname={"Employee"} type={"text"}/>
     </div>
     <div className='col-lg-6 col-sm-12 col-md-12'>
     <InputField classname={"new_employee_form_group"} labelname={"Mobile"} type={"number"}/>
     </div>
     <div className='col-lg-6 col-sm-12 col-md-12'>
     <InputField classname={"new_employee_form_group"} labelname={"Date"} type={"date"}/>
     </div>
     <div className='col-lg-6 col-sm-12 col-md-12'>
     <InputField classname={"new_employee_form_group"} labelname={"Total Time"} type={'time'}/>
     </div>

     <div className='col-lg-6 col-sm-12 col-md-12'>
     <InputField classname={"new_employee_form_group"} labelname={"In Time"} type={"time"}/>
     </div>

     <div className='col-lg-6 col-sm-12 col-md-12'>
     <InputField classname={"new_employee_form_group"} labelname={"Out Time"} type={"time"}/>
     </div>

    </div>
    <div className='new_employee_form_group'>
    <label>Report</label>
    <textarea className='form-control mt-2'/>
    </div>
    <div className='new_employee_form_group'>
    <label>Remark</label>
    <textarea className='form-control mt-2'/>
    </div>
    <div className='text-center mt-4'>
    <button className='cmn_Button_style'>Update</button>
    </div>
   </div>
    </div>



    </div>
    </section>
  )
}

export default EditAttendence