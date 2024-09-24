import React, { useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import Notification from '../Notification/Notification'
import { useAppContext } from '../../Utils/appContecxt'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import './testseries.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ObjectiveQuesModal from '../../Modal/ObjectiveQuesModal'
import SubjectiveQuesModal from '../../Modal/SubjectiveQuesModal'
import LogicalQuesModal from '../../Modal/LogicalQuesModal'
import CommonDeleteModal from '../../Modal/CommonDeleteModal'
import EditLogicalQuesModal from '../../Modal/EditLogicalQuesModal'
import EditObjectiveQuesModal from '../../Modal/EditObjectiveQuesModal'
import EditSubjectiveQuesModal from '../../Modal/EditSubjectiveQuesModal'
import { useLocation } from 'react-router-dom'

const ViewTestseriesQuestions = () => {

const {show} =useAppContext()

const [showObjectiveQuesModal,setShowObjectiveQuesModal]=useState(false)
const [showSubjectiveQuesModal,setShowSubjectiveQuesModal]=useState(false)
const [showLogicalQuesModal,setShowLogicalQuesModal]=useState(false)
const [showDelSubjectiveQuesModal,setShowDelSubjectiveQuesModal]=useState(false)
const [showDelLogicalQuesModal,setShowDelLogicalQuesModal]=useState(false)
const [showDelObjectiveQuesModal,setShowDelObjectiveQuesModal]=useState(false)

const [showEditObjectiveQuesModal,setShowEditObjectiveQuesModal]=useState(false)
const [showEditSubjectiveQuesModal,setShowEditSubjectiveQuesModal]=useState(false)
const [showEditLogicalQuesModal,setShowEditLogicalQuesModal]=useState(false)

const obj=[{name:"Test Series",path:"/testSeries"},{name:"Create Test Series Question",path:""}]
  return (
    <section className='test_serie_wrapper'>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer ${show?"cmn_margin":""}`  }>
    <Notification/>
  
    <div className='cmn_padding_outer'>
      <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"} 
      />
      <div className='position-relative'>
     <div className='cmn_border view_question_wrapper cmn_padding_wrapper'>


    <Tabs
      defaultActiveKey="Objective"
      id="uncontrolled-tab-example"
      className="interview_lead_tabs_outer "
    >
      <Tab eventKey="Objective" title="Objective" className=' cmn_padding_wrapper cmn_border'>
        <button className='add_question_btn cmn_Button_style' onClick={()=>{setShowObjectiveQuesModal(true)}}>Add</button>
      <div className='cmn_border view_question_tab_content'>
        <h2 className='heading'>What is VUE.JS?</h2>
        <div className='form-group new_employee_form_group'>
        <input type='text' className={'form-control'} placeholder={"lorem 1"}/>

        </div>
        <div className='form-group new_employee_form_group'>
        <input type='text' className={'form-control'} placeholder={"lorem 1"}/>

        </div>
        <div className='form-group new_employee_form_group'>
        <input type='text' className={'form-control'} placeholder={"lorem 1"}/>

        </div>
        <div className='form-group new_employee_form_group'>
        <input type='text' className={'form-control'} placeholder={"lorem 1"}/>

        </div>
        <div className='d-flex justify-content-end gap-3 mt-4'>
            <button className='cmn_Button_style cmn_darkgray_btn cursor_pointer' onClick={()=>setShowDelObjectiveQuesModal(true)}>Delete</button>
            <button className='cmn_Button_style cursor_pointer' onClick={()=>{setShowEditObjectiveQuesModal(true)}}>Edit</button>
        </div>
      </div>
      </Tab>
      <Tab eventKey="Subjective" title="Subjective" className=' cmn_padding_wrapper cmn_border'>
      <button className='add_question_btn cmn_Button_style' onClick={()=>{setShowSubjectiveQuesModal(true)}}>Add</button>
      <div className='cmn_border view_question_tab_content'>
        <h2 className='heading'>What are the main features of Vue.js?</h2>
        <div className='form-group new_employee_form_group'>
        <textarea type='text' className={'form-control'} placeholder={"lorem 1"}/>

        </div>
        
        <div className='d-flex justify-content-end gap-3 mt-4'>
            <button className='cmn_Button_style cmn_darkgray_btn cursor_pointer' onClick={()=>{setShowDelSubjectiveQuesModal(true)}}>Delete</button>
            <button className='cmn_Button_style cursor_pointer' onClick={()=>{setShowEditSubjectiveQuesModal(true)}}>Edit</button>
        </div>
      </div>
      </Tab>
      <Tab eventKey="Logical" title="Logical">
      <button className='add_question_btn cmn_Button_style' onClick={()=>{setShowLogicalQuesModal(true)}}>Add</button>
      <div className='cmn_border view_question_tab_content'>
        <h2 className='heading'>You are given a 7-minute hourglass and an 11-minute hourglass. How can you measure exactly 15 minutes?</h2>
        <div className='form-group new_employee_form_group'>
        <textarea type='text' className={'form-control'} placeholder={"lorem 1"} rows={3}/>

        </div>
        
        <div className='d-flex justify-content-end gap-3 mt-4'>
            <button className='cmn_Button_style cmn_darkgray_btn cursor_pointer' onClick={()=>{setShowDelLogicalQuesModal(true)}}>Delete</button>
            <button className='cmn_Button_style cursor_pointer' onClick={()=>{setShowEditLogicalQuesModal(true)}}>Edit</button>
        </div>
      </div>
      </Tab>
    </Tabs>

     </div>

      </div>

    </div>
      </div>
      {showObjectiveQuesModal && <ObjectiveQuesModal show={showObjectiveQuesModal} setShow={setShowObjectiveQuesModal}/>}
      {showSubjectiveQuesModal && <SubjectiveQuesModal show={showSubjectiveQuesModal} setShow={setShowSubjectiveQuesModal}/>}
      {showLogicalQuesModal && <LogicalQuesModal show={showLogicalQuesModal} setShow={setShowLogicalQuesModal}/>}
      
      {showDelSubjectiveQuesModal && <CommonDeleteModal dialogClassname={'custom_modal_width'} heading_text={"Are you sure you want to delete?"} show={showDelSubjectiveQuesModal} setShow={setShowDelSubjectiveQuesModal}/>}
      {showDelLogicalQuesModal && <CommonDeleteModal dialogClassname={'custom_modal_width'} heading_text={"Are you sure you want to delete?"} show={showDelLogicalQuesModal} setShow={setShowDelLogicalQuesModal}/>}
      {showDelObjectiveQuesModal && <CommonDeleteModal dialogClassname={'custom_modal_width'} heading_text={"Are you sure you want to delete?"} show={showDelObjectiveQuesModal} setShow={setShowDelObjectiveQuesModal}/>}
       
       {showEditLogicalQuesModal && <EditLogicalQuesModal show={showEditLogicalQuesModal} setShow={setShowEditLogicalQuesModal}/>}
       {showEditObjectiveQuesModal && <EditObjectiveQuesModal show={showEditObjectiveQuesModal} setShow={setShowEditObjectiveQuesModal}/>}
       {showEditSubjectiveQuesModal && <EditSubjectiveQuesModal show={showEditSubjectiveQuesModal} setShow={setShowEditSubjectiveQuesModal}/>}

      </section>
  )
}

export default ViewTestseriesQuestions