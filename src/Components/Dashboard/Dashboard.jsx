import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { useAppContext } from '../Utils/appContecxt';

import { IoMdAdd } from "react-icons/io";
import "./dashboard.css"
import Header from '../Header/Header';

const Dashboard = () => {
  const { show } = useAppContext();


  return (
    <div>
   <Sidebar/>
    <div className={`wrapper ${show?"cmn_margin":""}`  }>
    <Header/>
    <div className='text-end register_btn_wrapper'>
      <button className='cmn_btn'><IoMdAdd /> Register</button>
    </div>
    </div>
    </div>
  )
}

export default Dashboard