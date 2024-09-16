import React from 'react'

import Sidebar from '../../Sidebar/Sidebar';
import { useAppContext } from '../../Utils/appContecxt';
import Notification from '../Notification/Notification';

import "./interviewLead.css"
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp';


const HrInterViewQuestion = () => {

const {show}=useAppContext()
const obj = [
    { name: "Interview Leads", path: "/interviewLead" },
    { name: "Hr Round", path: "/hrRound" },
    { name: "Interview Question Round", path: "/hrInterViewQuestion" },
    
  ];

  return (
    <section className='Interviewlead_outer'>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer  ${show?"cmn_margin":""}`  }>
    <Notification/>
    <div className='cmn_padding_outer'>
    <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"} />
    <div className='hr_interview_question_round_outer'>

   <div className='cmn_border mt-3 hr_interview_question_round_content'>
  <div className='row'>
    <div className='col-lg-6 col-sm-12 col-md-12'>
        <div className='form-group new_employee_form_group mt-3'>
            <h3 className='hr_question_heading'>0.1  Tell me about yourself.</h3>
            <input className='form-control' placeholder='Enter 1 to 5 Rating'/>
        </div>
        <div className='form-group new_employee_form_group mt-3'>
            <h3 className='hr_question_heading'>0.3  What are your strengths and weaknesses?</h3>
            <input className='form-control' placeholder='Enter 1 to 5 Rating'/>
        </div>
        <div className='form-group new_employee_form_group mt-3'>
            <h3 className='hr_question_heading'>0.5  Why are you leaving your current job?</h3>
            <input className='form-control' placeholder='Enter 1 to 5 Rating'/>
        </div>
        <div className='form-group new_employee_form_group mt-3'>
            <h3 className='hr_question_heading'>0.7  How do you handle stress and pressure?</h3>
            <input className='form-control' placeholder='Enter 1 to 5 Rating'/>
        </div>
        <div className='form-group new_employee_form_group mt-3'>
            <h3 className='hr_question_heading'>0.9  Do you have any questions for us?</h3>
            <input className='form-control' placeholder='Enter 1 to 5 Rating'/>
        </div>
    </div>
    <div className='col-lg-6 col-sm-12 col-md-12'>
    <div className='form-group new_employee_form_group mt-3'>
            <h3 className='hr_question_heading'>0.2  Why are you interested in this position/company?</h3>
            <input className='form-control' placeholder='Enter 1 to 5 Rating'/>
        </div>
        <div className='form-group new_employee_form_group mt-3'>
            <h3 className='hr_question_heading'>0.4  Where do you see yourself in five years?</h3>
            <input className='form-control' placeholder='Enter 1 to 5 Rating'/>
        </div>
        <div className='form-group new_employee_form_group mt-3'>
            <h3 className='hr_question_heading'>0.6  What do you know about our company?</h3>
            <input className='form-control' placeholder='Enter 1 to 5 Rating'/>
        </div>
        <div className='form-group new_employee_form_group mt-3'>
            <h3 className='hr_question_heading'>0.8  Describe a time when you had to work as part of a team.</h3>
            <input className='form-control' placeholder='Enter 1 to 5 Rating'/>
        </div>
       
    </div>
  </div>
  <div className='d-flex gap-2 mt-4 justify-content-end exit_save_btn_outer'>
            <button className='cmn_Button_style cmn_darkgray_btn'>Exit</button>
            <button className='cmn_Button_style'>Save</button>
        </div>

   </div>


    </div>

    </div>
    </div>

    </section>
 
  )
}

export default HrInterViewQuestion