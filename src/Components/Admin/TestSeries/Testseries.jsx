import React, { useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import Notification from '../Notification/Notification'
import { useAppContext } from '../../Utils/appContecxt'
import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp'
import CustomSelectComp from '../../Common/CustomSelectComp'
import './testseries.css'
import { RiDeleteBinLine } from "react-icons/ri";
import CreateTestSeriesModal from '../../Modal/CreateTestSeriesModal'
import { useNavigate } from 'react-router-dom'
import CommonDeleteModal from '../../Modal/CommonDeleteModal'
import EditTestSeriesModal from '../../Modal/EditTestSeries'

const Testseries = () => {

const {show} =useAppContext()
const[showCreateTestSeriesModal,setShowCreateTestSeriesModal]=useState(false)
const[showDeleteModal,setShowDeleteModal]=useState(false)
const[showEditSeriesModal,setShowEditSeriesModal]=useState(false)

const navigate=useNavigate()
const obj=[{name:"Test Series",path:""}]
  return (
    <section className='test_serie_wrapper'>
    <Sidebar/>
  <div className={`wrapper gray_bg admin_outer ${show?"cmn_margin":""}`  }>
    <Notification/>
  
    <div className='cmn_padding_outer'>
      <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"} 
      />
     
      <div className="d-flex test_series_header employee_container align-items-end mt-3">
        <div className='d-flex gap-3 test_series_header_wrapper'>
      <div className='form-group new_employee_form_group'>
      <label>Profile</label>
     <div className='profile_select_box'> <CustomSelectComp/></div>
      </div>
       <div className='form-group new_employee_form_group'>
        <label>Date</label>
        <input className='form-control' type='date'/>
       </div>

        </div>
      
        <div className="gap-3 d-flex text-center serach_add_outer">
              <button
                className="cmn_Button_style cmn_darkgray_btn" >
                Search
              </button>
              <button onClick={()=>{setShowCreateTestSeriesModal(true)}}
                className="cmn_Button_style" >
                Add
              </button>
        </div>
      </div>
    
    <div className='create_series_outer mt-3'>
      <div className='row'>
        <div className='col-lg-4 col-sm-12 col-md-6'>
          <div className='series_card'>
            <h3 className='series_created_heading text-end'><span className='series_created_text'>1 hours</span><RiDeleteBinLine className='cursor_pointer' onClick={()=>{setShowDeleteModal(true)}}/></h3>
            <h2 className='card_heading'> 4 Years of Experience</h2>
            <h6>In publishing and graphic design, Lorem ipsum is a placeholder text without relying on meaningful content. </h6>
          <div className='create_series_btn_outer'>
          <button className='cmn_cancel_btn' onClick={()=>{setShowEditSeriesModal(true)}}>Edit</button>
          <button className='cmn_Button_style mt-3' onClick={()=>{navigate("/viewTestSeriesQuestion")}}>View Questions</button>

          </div>
          </div>

        </div>
      </div>
    </div>
        </div>
      </div>
      {showDeleteModal && <CommonDeleteModal dialogClassname={'custom_modal_width'} heading_text={"Are you sure to delete the 4 Year of Experience form Test Series"} paragraph_text={""} show={showDeleteModal} setShow={setShowDeleteModal}/>}
      {showCreateTestSeriesModal && <CreateTestSeriesModal show={showCreateTestSeriesModal} setShow={setShowCreateTestSeriesModal}/>}
      {showEditSeriesModal && <EditTestSeriesModal show={showEditSeriesModal} setShow={setShowEditSeriesModal}/>}
      </section>
  )
}

export default Testseries