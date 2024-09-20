import React, { useEffect, useState } from "react";
import { FaBars, FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import {
  MdKeyboardArrowDown,
  MdOutlineEditCalendar,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import logo from "../assets/logo1.png";
import { IoIosLogOut } from "react-icons/io";
import "./Sidebar.css";
import { useAppContext } from "../Utils/appContecxt";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import { TbUsersGroup } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { get_logged_in_user_permissions } from "../../utils/redux/userPermissionSlice/userpermissionSlice";
import { useDispatch, useSelector } from "react-redux";
import { save_user_permission_and_roles_globally } from "../../utils/redux/userPermissionSlice/userRolesAndPermissionSlice";
const Sidebar = () => {
  const navigate = useNavigate();
  const path = useLocation();
  const dispatch = useDispatch();
  const { show, setShow } = useAppContext();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showAttendenceReportDropdown, setShowAttendenceReportDropdown] =
    useState(false);
  const [showLeaveDropdown, setShowLeaveDropdown] = useState(false);
  const [uniqueRoles, setUniqueRoles] = useState();
  const all_permissions = useSelector((store) => store.USER_PERMISSIONS);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  // useEffect(() => {
  //   if (!localStorage.getItem("ums_token")) {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    dispatch(get_logged_in_user_permissions());
  }, [dispatch]);

  useEffect(() => {
    if (all_permissions?.isSuccess) {
      const uniqueRole = [];
      all_permissions?.data?.data?.forEach((item) => {
        if (!uniqueRole.includes(item?.role)) {
          uniqueRole.push(item?.role);
        }
      });
      setUniqueRoles(uniqueRole);
      dispatch(
        save_user_permission_and_roles_globally({
          uniqueRole,
          permissions: all_permissions?.data?.data,
        })
      );
    }
  }, [all_permissions]);

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
          <img src={logo} height={"40px"} width={"158px"} alt="logo" />
        </div>
        {uniqueRoles?.includes("Admin") && (
          <div
            className={`sidebar-button mt-4 ${
              path.pathname === "/dashboard" ? "active-pathname" : ""
            }`}
          >
            <Link to="/dashboard">
              <div className="sidebar_content">
                <AiOutlineDashboard />
                <h4 className={show ? "d-none" : "sidebar_content"}>
                  Dashboard
                </h4>
              </div>
            </Link>
          </div>
        )}
        {uniqueRoles?.includes("Admin") && (
          <div
            className={`sidebar-button ${
              path.pathname === "/employee" ? "active-pathname" : ""
            }`}
          >
            <Link to="/employee">
              <div className="sidebar_content">
                <FaRegUser />
                <h4 className={show ? "d-none" : "sidebar_content"}>
                  Employees
                </h4>
              </div>
            </Link>
          </div>
        )}
        {uniqueRoles?.includes("Admin") && (
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
        )}
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

        {uniqueRoles?.includes("Admin") && (
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
        )}

        {uniqueRoles?.includes("Admin") && (
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
        )}
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

        {uniqueRoles?.includes("Admin") && (
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
        )}

        {uniqueRoles?.includes("Admin") && (
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
        )}
        <div className={`sidebar-button`} onClick={handleLogout}>
          <div className="sidebar_content">
            <IoIosLogOut className="sidebar_content" />
            <h4 className={show ? "d-none" : "sidebar_content"}> Logout</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
