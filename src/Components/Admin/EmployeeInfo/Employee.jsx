import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { useAppContext } from '../../Utils/appContecxt'
import "./employee.css"

import BreadcrumbComp from '../../Breadcrumb/BreadcrumbComp';
import Notification from '../Notification/Notification';
import EmployeeList from './EmployeeList';
import AddnewEmployee from './AddnewEmployee';

const EmployeeInfo = () => {

  const {show} =useAppContext()
  const obj = [
    { name: "Employees", path: "/employee" },
  ];



 
  return (
    <section>
      <Sidebar/>
    <div className={`wrapper gray_bg admin_outer ${show?"cmn_margin":""}`  }>
      <Notification/>
    
      <div className='employee_wrapper cmn_padding_outer'>
        <BreadcrumbComp data={obj} classname={"inter_fontfamily employee_heading"} 
        />
     <EmployeeList/>
      
     
      </div>

    


    </div>
    </section>
  )
}

export default EmployeeInfo