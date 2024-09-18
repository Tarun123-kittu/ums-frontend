import React, { useState } from "react";
import { FaBars, FaRegUser  } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { RiLockPasswordLine, RiQuestionnaireFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { PiNotebookFill } from "react-icons/pi"
import { FaUserGroup } from "react-icons/fa6";

import {  MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineQuickreply } from "react-icons/md";
import logo from '../assets/logo1.png'

import "./Sidebar.css"
import { useAppContext } from "../Utils/appContecxt";
import LogoutModal from "../Modal/LogoutModal";
import ChangePassword from "../Modal/ChangePassword";
import { AiOutlineDashboard } from "react-icons/ai";

import menuitems from "./MenuItem";
const Sidebar = () => {
 
  

  const path = useLocation()

  const { show, setShow } = useAppContext();

const [showChangePassword, setShowChangePassword] = useState(false)
const[showLogoutModal,setShowLogoutModal]=useState(false)

  const handleLogout = () => {

    setShowLogoutModal(true)
   
  };

  const[expanded,setExpanded]=useState(null)

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index); 
  };

  const handleChangePassword = () => {
    setShowChangePassword(true)
  }

 


  return (
    <>
      <div className={`sidebar ${show ? "cmn_width" : ""}`}>

        <h3 className={`bar ${show?"text-center":"pe-3"}`} onClick={() => { setShow(!show) }}>{show ?  <FaBars /> :<RxCross2 className="p-0 text-center" />}</h3>
       <div className={`${show?"d-none":"text-center sidebar_logo_outer"}`}>
       <img src={logo} height={"40px"} width={"158px"}/>
       {/* <h3 className="mt-1">TECHNOLOGIES</h3> */}
       </div>
       
    
       <div className="mt-4">
        
      {menuitems.map((data, i) => {
        const isActive = path.pathname === data?.pathname;

        return (
          <>
          <div
            key={i} 
            className={`sidebar-button ${isActive ? 'active-pathname' : ''}`}
          >
            {data.subItems ? (
              <>
                <div className="sidebar_content justify-content-between" onClick={() => handleToggle(i)}>
                  <div className={`transition_class ${show ?"":"d-flex flex-grow-1 gap-2 "}` }>
                  <img
                    src={data?.icon}
                    alt={data?.name}
                    height="18px"
                    width="18px"
                    className={isActive ? "filterClass" : ""}
                  />
                  <h4 className={show ? 'd-none' : ''}>
                    {data?.name}
                  </h4>

                  </div>
                  {show ?"":
                    expanded === i ? <MdOutlineKeyboardArrowUp onClick={()=>{handleToggle(i)}}/>: <MdOutlineKeyboardArrowDown/>}
                </div>
                
             
               
              </>
            ) : (
              <Link to={data?.pathname}>
                <div className="sidebar_content ">
                  <img
                    src={data?.icon}
                    alt={data?.name}
                    height="18px"
                    width="18px"
                    className={isActive ? "filterClass" : ""}
                  />
                  <h4 className={show ? 'd-none' : ''}>
                    {data?.name}
                  </h4>
                </div>
              </Link>
            )}
          </div>
           {expanded === i && 
            (
              <ul className="list_inner_item_outer">
                {data?.subItems?.map((subItem, j) => (
                  <li className="">
                  
                  <Link to={subItem.pathname} className={path.pathname===subItem.pathname?"active_path":""}>
                        {subItem.name}
                      
                    </Link>
                 
                </li>
               
                ))}
              </ul>
            )}
          </>
        );
      })}
    </div>
    
      </div>
      
    </>

  );
};

export default Sidebar;


