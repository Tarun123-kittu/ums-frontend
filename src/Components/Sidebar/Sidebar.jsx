import React, { useEffect, useState } from "react";
import { FaBars, FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { RiLockPasswordLine, RiQuestionnaireFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { PiNotebookFill } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import logout from "../assets/logout.svg"
import {

  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,

} from "react-icons/md";
import logo from "../assets/logo1.png";
import { IoIosLogOut } from "react-icons/io";

import "./Sidebar.css";

import { useAppContext } from "../Utils/appContecxt";
import LogoutModal from "../Modal/LogoutModal";
import ChangePassword from "../Modal/ChangePassword";

import menuitems, { developerMenuitems, hrMenuitems } from "./MenuItem";

import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const path = useLocation();
  const { show, setShow } = useAppContext();
  const [showChangePassword, setShowChangePassword] = useState(false);
 

  // useEffect(() => {
  //   if (!localStorage.getItem("ums_token")) {
  //     navigate("/login");
  //   }
  // }, []);
  const handleLogout = () => {
    localStorage.clear("ums_token");
    toast.success("Logout successfully!!", { autoClose: 2000 });
    navigate("/");
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };
  const[expanded,setExpanded]=useState(null)

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index); 
  };
  return (
    <>
      <div className={`sidebar ${show ? "cmn_width" : ""}`}>
        <h3
          className={`bar ${show ? "text-center" : "pe-3"}`}
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? <FaBars /> : <RxCross2 className="p-0 text-center" />}
        </h3>
        <div
          className={`${show ? "d-none" : "text-center sidebar_logo_outer"}`}
        >
          <img src={logo} height={"40px"} width={"158px"} />
          {/* <h3 className="mt-1">TECHNOLOGIES</h3> */}
        </div>

        <div className="mt-4">
        
        {/* admin sidebar */}
        
         {menuitems.map((data, i) => {
        const isActive = path.pathname === data?.pathname;

        return (
          <>
          <div
            key={i} 
            className={`sidebar-button ${isActive ? 'active-pathname' : ''}`}
          >
            {  data.subItems ? (
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
           {!show && expanded === i && 
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
      
      {/* admin-sidebar end */}
       {/* hr sidebar start */}
      {/* {hrMenuitems.map((data,i)=>{
          const isActive = path.pathname === data?.pathname;
        return(
          <div
            key={i} 
            className={`sidebar-button ${isActive ? 'active-pathname' : ''}`}
          >
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
            </div>
        )
      })} */}
      {/* hr sidebar end */}
      
     {/* developer siebar */}
          {/* {developerMenuitems.map((data,i)=>{
            const isActive = path.pathname === data?.pathname;
          return(
            <div
              key={i} 
              className={`sidebar-button ${isActive ? 'active-pathname' : ''}`}
            >
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
  
              </div>
          )
        })} */}
        {/* developer sidebar end  */}
        <div onClick={handleLogout} className='sidebar-button' >
            <div className="sidebar_content ">
                  <img
                    src={logout}
                    alt="logout"
                    height="18px"
                    width="18px"
                    
                  />
                  <h4 className={show ? 'd-none' : ''}>
                    Logout
                  </h4>
                </div>
          </div>
        
    </div>

      </div>


      
      
    </>
  );
};

export default Sidebar;
