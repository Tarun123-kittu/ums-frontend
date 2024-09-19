import React, { useState } from 'react'
import { useAppContext } from '../../Utils/appContecxt';
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp';
import Notification from '../Notification/Notification';
import Sidebar from '../../Sidebar/Sidebar';

const QuestionAnswerSheet = () => {
    const {show}=useAppContext()
const obj = [
    { name: "Interview Leads", path: "/interviewLead" },
    { name: "Technical Round", path: "" },
  
    
  ];
 
  return (
    <section className='Interviewlead_outer'>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer  ${show?"cmn_margin":""}`  }>
    <Notification/>
    <div className='cmn_padding_outer'>
    <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"} />
     
     <div className='row'>
        <div className='col-lg-6 col-sm-12 col-md-12'>
            <div className='question_container'>
                <h3 className='answer_heading'>Original Answers</h3>
                <div className='question_inner_content'>
                    <h3>Objective</h3>
                  <h4>01 What is NODE.Js?</h4>
                  <ul className='question_list_wrapper'>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                  </ul>
                  <h4 className='correct_ans_heading'>Correct Answer: 3 Lorem ipsum</h4>
                </div>
            </div>
        </div>
        <div className='col-lg-6 col-sm-12 col-md-12'>
            <div className='question_container'>
                <h3 className='answer_heading'>Candidate Answers</h3>
                <div className='question_inner_content'>
                    <h3>Objective</h3>
                  <h4>01 What is NODE.Js?</h4>
                  <ul className='question_list_wrapper'>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                  </ul>
                  <h4 className='correct_ans_heading'>Correct Answer: 3 Lorem ipsum</h4>
                  <div className='d-flex gap-2 justify-content-end check_btn_wrapper mt-4'>
                    <button className='check_btn'>Check</button>
                    <button className='correct_btn'>Correct</button>
                    <button className='incorrect_btn'>Incorrect</button>
                  </div>
                </div>
            </div>
        </div>
     </div>
    </div>
    </div>
    </section>
  )
}

export default QuestionAnswerSheet