import React, { useEffect, useState } from "react";
import { FaBars, FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { RiLockPasswordLine, RiQuestionnaireFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { PiNotebookFill } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import {
  MdKeyboardArrowDown,
  MdOutlineEditCalendar,
  MdOutlineKeyboardArrowUp,
  MdOutlineQuickreply,
} from "react-icons/md";
import logo from "../assets/logo1.png";
import { IoIosArrowUp, IoIosLogOut } from "react-icons/io";

import "./Sidebar.css";
import { CiUser } from "react-icons/ci";
import { useAppContext } from "../Utils/appContecxt";
import LogoutModal from "../Modal/LogoutModal";
import ChangePassword from "../Modal/ChangePassword";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import { TbUsersGroup } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const path = useLocation();
  const { show, setShow } = useAppContext();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showAttendenceReportDropdown, setShowAttendenceReportDropdown] =
    useState(false);
  const [showLeaveDropdown, setShowLeaveDropdown] = useState(false);
  const [showInterviewDropdown, setShowInterviewDropdown] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("ums_token")) {
      navigate("/login");
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear("ums_token");
    toast.success("Logout successfully!!", { autoClose: 2000 });
    navigate("/login");
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
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

        {/* <>
              <div className={`sidebar-button mt-4 ${path.pathname === "/candidates" ? "active-pathname" : ""}`} >
                <div className="sidebar_content"><CiUser /> 
                  <h4 className={show ? "d-none" : "sidebar_content"} >Candidates</h4>
                </div>
              </div>
              <div className={`sidebar-button ${path.pathname === "/ultivic-team" ? "active-pathname" : ""}`}  >
                <div className="sidebar_content">
                  <FaUserGroup />
                  <h4 className={show ? "d-none" : "sidebar_content"} >Team Hub</h4>
                </div>
              </div>
              <div className={`sidebar-button ${path.pathname === "/hr-screening" ? "active-pathname" : ""}`}  >
                <div className="sidebar_content"><CiUser />
                  <h4 className={show ? "d-none" : "sidebar_content"} >HR Screening</h4>
                </div>
              </div>
              <div className={`sidebar-button ${path.pathname === "/hr-round-response" ? "active-pathname" : ""}`}  >
                <div className="sidebar_content"><MdOutlineQuickreply />
                  <h4 className={show ? "d-none" : "sidebar_content"} >HR feedback </h4>
                </div>
              </div>
            </> */}

        {/* <div className="mt-4">
            <div className={`sidebar-button  ${path.pathname === "/homepage" ? "active-pathname" : ""}`}  >
              <div className="sidebar_content">
                <RiQuestionnaireFill />
                <h4 className={show ? "d-none" : "sidebar_content"}>Questionnaire</h4>

              </div>
            </div>

            <div className={`sidebar-button ${path.pathname === "/candidates-performance" ? "active-pathname" : ""}`}>
              <div className="sidebar_content">
                <PiNotebookFill className="sidebar_content" />
                <h4 className={show ? "d-none" : "sidebar_content"}> Candidate Results</h4>
              </div>
            </div>
            
            
            

          </div>  */}
        {/* <div className={`sidebar-button`} onClick={handleChangePassword}>
              <div className="sidebar_content">
                <RiLockPasswordLine className="sidebar_content" />
                <h4 className={show ? "d-none" : "sidebar_content"}> Change Password </h4>
              </div>
            </div> */}
        {/* admin sidebar */}
        <div
          className={`sidebar-button mt-4 ${
            path.pathname === "/adminDashboard" ? "active-pathname" : ""
          }`}
        >
          <Link to="/adminDashboard">
            <div className="sidebar_content">
              <AiOutlineDashboard />
              <h4 className={show ? "d-none" : "sidebar_content"}>Dashboard</h4>
            </div>
          </Link>
        </div>
        <div
          className={`sidebar-button ${
            path.pathname === "/employee" ? "active-pathname" : ""
          }`}
        >
          <Link to="/employee">
            <div className="sidebar_content">
              <FaRegUser />
              <h4 className={show ? "d-none" : "sidebar_content"}>Employees</h4>
            </div>
          </Link>
        </div>
        <div
          className={`sidebar-button ${
            path.pathname === "/ultivic-team" ? "active-pathname" : ""
          }`}
        >
          <div
            className="sidebar_content justify-content-between "
            onClick={() => {
              setShowAttendenceReportDropdown(!showAttendenceReportDropdown);
            }}
          >
            <div className={show ? "" : "gap-2 d-flex flex-grow-1"}>
              <MdOutlineEditCalendar />
              <h4 className={show ? "d-none" : "sidebar_content"}>
                Attendence Report{" "}
              </h4>
            </div>
            {show ? (
              ""
            ) : showAttendenceReportDropdown ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </div>
        </div>
        {show
          ? ""
          : showAttendenceReportDropdown && (
              <ul className="list_inner_item_outer">
                <li>
                  <Link
                    to="/todayAttendence"
                    className={
                      path.pathname === "/todayAttendence" ? "active_path" : ""
                    }
                  >
                    Attendence Today
                  </Link>
                </li>
                <li>
                  <Link
                    to="/attendenceReport"
                    className={
                      path.pathname === "/attendenceReport" ? "active_path" : ""
                    }
                  >
                    Attendence Report
                  </Link>
                </li>
                <li>
                  <Link
                    to="/incompleteAttendence"
                    className={
                      path.pathname === "/incompleteAttendence"
                        ? "active_path"
                        : ""
                    }
                  >
                    Incomplete Attendence
                  </Link>
                </li>
              </ul>
            )}

        <div
          className={`sidebar-button ${
            path.pathname === "/holiday" ? "active-pathname" : ""
          }`}
        >
          <Link to="/holiday">
            <div className="sidebar_content">
              <IoCalendarOutline />
              <h4 className={show ? "d-none" : "sidebar_content"}>
                Holidays & Events
              </h4>
            </div>
          </Link>
        </div>

        <div
          className={`sidebar-button ${
            path.pathname === "/leaveApplication" ? "active-pathname" : ""
          }`}
        >
          <div
            className="sidebar_content justify-content-between"
            onClick={() => {
              setShowLeaveDropdown(!showLeaveDropdown);
            }}
          >
            <div className={show ? "" : "gap-2 d-flex flex-grow-1"}>
              <MdOutlineEditCalendar />
              <h4 className={show ? "d-none" : "sidebar_content"}>
                Leave Application{" "}
              </h4>
            </div>

            {show ? (
              ""
            ) : showLeaveDropdown ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </div>
        </div>
        {show
          ? ""
          : showLeaveDropdown && (
              <ul className="list_inner_item_outer">
                <li>
                  <Link
                    to="/leaveRequest"
                    className={
                      path.pathname === "/leaveRequest" ? "active_path" : ""
                    }
                  >
                    Leave Request
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leaveBank"
                    className={
                      path.pathname === "/leaveBank" ? "active_path" : ""
                    }
                  >
                    Leave Bank
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leaveReport"
                    className={
                      path.pathname === "/leaveReport" ? "active_path" : ""
                    }
                  >
                    Leave Report
                  </Link>
                </li>
              </ul>
            )}

        <div
          className={`sidebar-button ${
            path.pathname === "/interviewLead" ? "active-pathname" : ""
          }`}
        >
          <Link to="/interviewLead">
            <div className="sidebar_content justify-content-between">
              <div className={show ? "" : "gap-2 d-flex flex-grow-1"}>
                <HiOutlineUsers />
                <h4 className={show ? "d-none" : "sidebar_content"}>
                  Interview Leads{" "}
                </h4>
              </div>
            </div>
          </Link>
        </div>

        <div
          className={`sidebar-button ${
            path.pathname === "/rolePermission" ? "active-pathname" : ""
          }`}
        >
          <Link to="/rolePermission">
            <div className="sidebar_content">
              <TbUsersGroup />
              <h4 className={show ? "d-none" : "sidebar_content"}>
                Teams & Roles
              </h4>
            </div>
          </Link>
        </div>
        {/* admin sidebar end */}
        <div className={`sidebar-button`} onClick={handleLogout}>
          <div className="sidebar_content">
            <IoIosLogOut className="sidebar_content" />
            <h4 className={show ? "d-none" : "sidebar_content"}> Logout</h4>
          </div>
        </div>
      </div>
      {/* {
      //   showChangePassword && (
      //   )
      // } */}
      {/* <ChangePassword
        // show={showChangePassword}
        // onHide={() => setShowChangePassword(false)}
      /> */}
      {/* {showLogoutModal && <LogoutModal show={showLogoutModal} setShow={setShowLogoutModal}/>} */}
    </>
  );
};

export default Sidebar;
