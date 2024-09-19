import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { useAppContext } from '../Utils/appContecxt'
import "./style.css"
import { useNavigate } from 'react-router-dom'
const UnauthorizedPage = () => {
const {show} =useAppContext()
const navigate =useNavigate()
  return (
    <section className='unauthorized_page_outer'>
    <Sidebar/>
    <div className={`wrapper gray_bg admin_outer  ${show? "cmn_margin":"cmn_margin_outer"}`  }>
       <div className='d-flex justify-content-center align-items-center unauthorized_page_content'>
       <div className='text-center unauthorized_wrapper'>
        <h2>Error 401</h2>
       <h3>You Are Not Authorized To<br></br> Access this Page.</h3>
        <button className='cmn_Button_style mt-4' onClick={()=>{navigate("/adminDashboard")}}>Return Home</button>
       </div>
        </div>
    </div>
    </section>
  )
}

export default UnauthorizedPage