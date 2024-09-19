import React, { useState } from 'react'

import Sidebar from '../../Sidebar/Sidebar';
import { useAppContext } from '../../Utils/appContecxt';
import Notification from '../Notification/Notification';
import { FaSort } from 'react-icons/fa';
import TabComp from '../../Common/Tabs/Tabs';
import "./interviewLead.css"
import { useNavigate } from 'react-router-dom';
import CommonDeleteModal from '../../Modal/CommonDeleteModal';
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp';

const InterviewLead = () => {

const {show}=useAppContext()
const navigate=useNavigate()
const[showDeleteModal,setShowDeleteModal]=useState(false)

const obj = [
  { name: "Interview Leads", path: "/interviewLead" },
  
];
  return (
    <section className='Interviewlead_outer'>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer  ${show?"cmn_margin":""}`  }>
    <Notification/>
    <div className='cmn_padding_outer'>
      <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"}/>
    <div className='employee_list_outer '>
    <div className='d-flex employee_container align-items-end mt-3'>

    <div className='new_employee_form_group employee_wrapper'>

<label className='inter_fontfamily'>Profile</label>
<div class="custom-select-wrapper ">
<select class="custom-select form-control" placeholder="Select Profile">

 <option  value="2022">java developer</option>
      
  
</select>
<FaSort className='dropdown-icon '/>
</div>
</div>
   

<div className='new_employee_form_group employee_wrapper'>
<label className='inter_fontfamily'>Date</label>
<div class="custom-select-wrapper ">
<input class=" form-control" type='date'>

</input>
</div>
   </div>

   <div className='new_employee_form_group employee_wrapper'>

<label className='inter_fontfamily'>Experience</label>
<div class="custom-select-wrapper ">
<select class="custom-select form-control" placeholder="Select Experience">

 <option >1</option>
      
  
</select>
<FaSort className='dropdown-icon '/>
</div>
</div>

<div className='new_employee_form_group employee_wrapper'>

<label className='inter_fontfamily'>Result</label>
<div class="custom-select-wrapper ">
<select class="custom-select form-control" placeholder="Result">

 <option>Pass</option>
</select>
<FaSort className='dropdown-icon '/>
</div>
</div>
   
    <div className='employee_wrapper text-end serach_add_outer d-flex gap-2'>
      <button className='cmn_Button_style cmn_darkgray_btn' onClick={()=>{setShowDeleteModal(true)}}>Delete</button>
      <button className='cmn_Button_style'>Search</button>
    </div>

    </div>
   <div className='inerterview_lead_tabs cmn_border mt-3'>
    <TabComp/>
    <div>
    <button className='cmn_Button_style addnew_btn_outer' onClick={()=>{navigate("/addNewPerson")}}>Add New</button>
    </div>
    

   </div>


    </div>

    </div>
    </div>
{showDeleteModal && <CommonDeleteModal dialogClassname={"custom_modal_width"} show={showDeleteModal} setShow={setShowDeleteModal}  heading_text={"Are you sure to delete the user list"} paragraph_text={"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. "}/>}
    </section>
 
  )
}

export default InterviewLead