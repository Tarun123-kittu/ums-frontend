import React, { useEffect, useState } from "react";
import { FaBars, FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import logo from "../assets/logo1.png";
import { IoIosLogOut } from "react-icons/io";
import "./Sidebar.css";
import { useAppContext } from "../Utils/appContecxt";
import { useNavigate } from "react-router-dom";
import { get_logged_in_user_permissions } from "../../utils/redux/userPermissionSlice/userpermissionSlice";
import { useDispatch, useSelector } from "react-redux";
import menuitems from "./MenuItem";
import { save_user_permission_and_roles_globally } from "../../utils/redux/userPermissionSlice/userRolesAndPermissionSlice";
import UseAllUsernames from "../Utils/customHooks/useAllUserNames";

const AllPermissions = [
  "Salary",
  "Attandance",
  "Events",
  "Interviews",
  "Users",
  "Test",
  "Leaves",
  "Dashboard",
  "Teams",
];

const Sidebar = () => {
  UseAllUsernames();
  const navigate = useNavigate();
  const path = useLocation();
  console.log(path, "this is the path from the sidebr");
  const dispatch = useDispatch();
  const { show, setShow } = useAppContext();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [uniqueRoles, setUniqueRoles] = useState();
  const all_permissions = useSelector((store) => store.USER_PERMISSIONS);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  const [permissions, setPermissions] = useState({});
  const checkPermissions = (permission, rolesData, permissionData) => {
    return rolesData.some((role) => {
      const userPermission = permissionData.find(
        (up) => up.permission === permission && up.role === role
      );
      return userPermission ? !!userPermission.can_view : false;
    });
  };
  useEffect(() => {
    const permissionsStatus = {};

    AllPermissions.forEach((permission) => {
      permissionsStatus[`${permission}_can_view`] = checkPermissions(
        permission,
        user_all_permissions?.roles_data,
        user_all_permissions?.permission_data
      );
    });

    setPermissions(permissionsStatus);
  }, [user_all_permissions]);

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
    navigate("/");
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };
  const [expanded, setExpanded] = useState(null);

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };
  useEffect(() => {
    menuitems.forEach((data, index) => {
      if (data.subItems) {
        const subItemMatch = data.subItems.some(
          (subItem) => path.pathname === subItem.pathname
        );
        if (subItemMatch) {
          setExpanded(index);
        }
      }
    });
  }, [path.pathname, menuitems]);

  return (uniqueRoles?.length === 1 && uniqueRoles?.includes("Employee")) ||
    path?.pathname === "/change-password" ? null : (
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
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        <img src={logo} height={"40px"} width={"158px"} alt="" />
      </div>

      <div className="mt-4">
        {menuitems.map((data, i) => {
          const isActive = path.pathname === data?.pathname;
          if (permissions?.Dashboard_can_view && data?.name === "Dashboard") {
            return (
              <>
                <div
                  key={i}
                  className={`sidebar-button ${
                    isActive ? "active-pathname" : ""
                  }`}
                >
                  {data.subItems ? (
                    <>
                      <div
                        className="sidebar_content justify-content-between"
                        onClick={() => handleToggle(i)}
                      >
                        <div
                          className={`transition_class ${
                            show ? "" : "d-flex flex-grow-1 gap-2 "
                          }`}
                        >
                          <img
                            src={data?.icon}
                            alt={data?.name}
                            height="18px"
                            width="18px"
                            className={isActive ? "filterClass" : ""}
                          />
                          <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                        </div>
                        {show ? (
                          ""
                        ) : expanded === i ? (
                          <MdOutlineKeyboardArrowUp
                            onClick={() => {
                              handleToggle(i);
                            }}
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )}
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
                        <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                      </div>
                    </Link>
                  )}
                </div>
                {expanded === i && (
                  <ul className="list_inner_item_outer">
                    {data?.subItems?.map((subItem, j) => (
                      <li className="">
                        <Link
                          to={subItem.pathname}
                          className={
                            path.pathname === subItem.pathname
                              ? "active_path"
                              : ""
                          }
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          }
          if (permissions?.Users_can_view && data?.name === "Employees") {
            return (
              <>
                <div
                  key={i}
                  className={`sidebar-button ${
                    isActive ? "active-pathname" : ""
                  }`}
                >
                  {data.subItems ? (
                    <>
                      <div
                        className="sidebar_content justify-content-between"
                        onClick={() => handleToggle(i)}
                      >
                        <div
                          className={`transition_class ${
                            show ? "" : "d-flex flex-grow-1 gap-2 "
                          }`}
                        >
                          <img
                            src={data?.icon}
                            alt={data?.name}
                            height="18px"
                            width="18px"
                            className={isActive ? "filterClass" : ""}
                          />
                          <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                        </div>
                        {show ? (
                          ""
                        ) : expanded === i ? (
                          <MdOutlineKeyboardArrowUp
                            onClick={() => {
                              handleToggle(i);
                            }}
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )}
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
                        <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                      </div>
                    </Link>
                  )}
                </div>
                {expanded === i && (
                  <ul className="list_inner_item_outer">
                    {data?.subItems?.map((subItem, j) => (
                      <li className="">
                        <Link
                          to={subItem.pathname}
                          className={
                            path.pathname === subItem.pathname
                              ? "active_path"
                              : ""
                          }
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          }
          if (
            permissions?.Attandance_can_view &&
            data?.name === "Attendance Report"
          ) {
            return (
              <>
                <div
                  key={i}
                  className={`sidebar-button ${
                    isActive ? "active-pathname" : ""
                  }`}
                >
                  {data.subItems ? (
                    <>
                      <div
                        className="sidebar_content justify-content-between"
                        onClick={() => handleToggle(i)}
                      >
                        <div
                          className={`transition_class ${
                            show ? "" : "d-flex flex-grow-1 gap-2 "
                          }`}
                        >
                          <img
                            src={data?.icon}
                            alt={data?.name}
                            height="18px"
                            width="18px"
                            className={isActive ? "filterClass" : ""}
                          />
                          <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                        </div>
                        {show ? (
                          ""
                        ) : expanded === i ? (
                          <MdOutlineKeyboardArrowUp
                            onClick={() => {
                              handleToggle(i);
                            }}
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )}
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
                        <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                      </div>
                    </Link>
                  )}
                </div>
                {expanded === i && (
                  <ul className="list_inner_item_outer">
                    {data?.subItems?.map((subItem, j) => (
                      <li className="">
                        <Link
                          to={subItem.pathname}
                          className={
                            path.pathname === subItem.pathname
                              ? "active_path"
                              : ""
                          }
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          }
          if (
            permissions?.Events_can_view &&
            data?.name === "Holiday & Events"
          ) {
            return (
              <>
                <div
                  key={i}
                  className={`sidebar-button ${
                    isActive ? "active-pathname" : ""
                  }`}
                >
                  {data.subItems ? (
                    <>
                      <div
                        className="sidebar_content justify-content-between"
                        onClick={() => handleToggle(i)}
                      >
                        <div
                          className={`transition_class ${
                            show ? "" : "d-flex flex-grow-1 gap-2 "
                          }`}
                        >
                          <img
                            src={data?.icon}
                            alt={data?.name}
                            height="18px"
                            width="18px"
                            className={isActive ? "filterClass" : ""}
                          />
                          <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                        </div>
                        {show ? (
                          ""
                        ) : expanded === i ? (
                          <MdOutlineKeyboardArrowUp
                            onClick={() => {
                              handleToggle(i);
                            }}
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )}
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
                        <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                      </div>
                    </Link>
                  )}
                </div>
                {expanded === i && (
                  <ul className="list_inner_item_outer">
                    {data?.subItems?.map((subItem, j) => (
                      <li className="">
                        <Link
                          to={subItem.pathname}
                          className={
                            path.pathname === subItem.pathname
                              ? "active_path"
                              : ""
                          }
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          }
          if (
            permissions?.Leaves_can_view &&
            data?.name === "Leave Application"
          ) {
            return (
              <>
                <div
                  key={i}
                  className={`sidebar-button ${
                    isActive ? "active-pathname" : ""
                  }`}
                >
                  {data.subItems ? (
                    <>
                      <div
                        className="sidebar_content justify-content-between"
                        onClick={() => handleToggle(i)}
                      >
                        <div
                          className={`transition_class ${
                            show ? "" : "d-flex flex-grow-1 gap-2 "
                          }`}
                        >
                          <img
                            src={data?.icon}
                            alt={data?.name}
                            height="18px"
                            width="18px"
                            className={isActive ? "filterClass" : ""}
                          />
                          <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                        </div>
                        {show ? (
                          ""
                        ) : expanded === i ? (
                          <MdOutlineKeyboardArrowUp
                            onClick={() => {
                              handleToggle(i);
                            }}
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )}
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
                        <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                      </div>
                    </Link>
                  )}
                </div>
                {expanded === i && (
                  <ul className="list_inner_item_outer">
                    {data?.subItems?.map((subItem, j) => (
                      <li className="">
                        <Link
                          to={subItem.pathname}
                          className={
                            path.pathname === subItem.pathname
                              ? "active_path"
                              : ""
                          }
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          }
          if (
            permissions?.Interviews_can_view &&
            data?.name === "InterView Leads"
          ) {
            return (
              <>
                <div
                  key={i}
                  className={`sidebar-button ${
                    isActive ? "active-pathname" : ""
                  }`}
                >
                  {data.subItems ? (
                    <>
                      <div
                        className="sidebar_content justify-content-between"
                        onClick={() => handleToggle(i)}
                      >
                        <div
                          className={`transition_class ${
                            show ? "" : "d-flex flex-grow-1 gap-2 "
                          }`}
                        >
                          <img
                            src={data?.icon}
                            alt={data?.name}
                            height="18px"
                            width="18px"
                            className={isActive ? "filterClass" : ""}
                          />
                          <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                        </div>
                        {show ? (
                          ""
                        ) : expanded === i ? (
                          <MdOutlineKeyboardArrowUp
                            onClick={() => {
                              handleToggle(i);
                            }}
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )}
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
                        <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                      </div>
                    </Link>
                  )}
                </div>
                {expanded === i && (
                  <ul className="list_inner_item_outer">
                    {data?.subItems?.map((subItem, j) => (
                      <li className="">
                        <Link
                          to={subItem.pathname}
                          className={
                            path.pathname === subItem.pathname
                              ? "active_path"
                              : ""
                          }
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          }
          if (permissions?.Test_can_view && data?.name === "Test Series") {
            return (
              <>
                <div
                  key={i}
                  className={`sidebar-button ${
                    isActive ? "active-pathname" : ""
                  }`}
                >
                  {data.subItems ? (
                    <>
                      <div
                        className="sidebar_content justify-content-between"
                        onClick={() => handleToggle(i)}
                      >
                        <div
                          className={`transition_class ${
                            show ? "" : "d-flex flex-grow-1 gap-2 "
                          }`}
                        >
                          <img
                            src={data?.icon}
                            alt={data?.name}
                            height="18px"
                            width="18px"
                            className={isActive ? "filterClass" : ""}
                          />
                          <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                        </div>
                        {show ? (
                          ""
                        ) : expanded === i ? (
                          <MdOutlineKeyboardArrowUp
                            onClick={() => {
                              handleToggle(i);
                            }}
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )}
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
                        <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                      </div>
                    </Link>
                  )}
                </div>
                {expanded === i && (
                  <ul className="list_inner_item_outer">
                    {data?.subItems?.map((subItem, j) => (
                      <li className="">
                        <Link
                          to={subItem.pathname}
                          className={
                            path.pathname === subItem.pathname
                              ? "active_path"
                              : ""
                          }
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          }
          if (permissions?.Teams_can_view && data?.name === "Teams & Roles") {
            return (
              <>
                <div
                  key={i}
                  className={`sidebar-button ${
                    isActive ? "active-pathname" : ""
                  }`}
                >
                  {data.subItems ? (
                    <>
                      <div
                        className="sidebar_content justify-content-between"
                        onClick={() => handleToggle(i)}
                      >
                        <div
                          className={`transition_class ${
                            show ? "" : "d-flex flex-grow-1 gap-2 "
                          }`}
                        >
                          <img
                            src={data?.icon}
                            alt={data?.name}
                            height="18px"
                            width="18px"
                            className={isActive ? "filterClass" : ""}
                          />
                          <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                        </div>
                        {show ? (
                          ""
                        ) : expanded === i ? (
                          <MdOutlineKeyboardArrowUp
                            onClick={() => {
                              handleToggle(i);
                            }}
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )}
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
                        <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                      </div>
                    </Link>
                  )}
                </div>
                {expanded === i && (
                  <ul className="list_inner_item_outer">
                    {data?.subItems?.map((subItem, j) => (
                      <li className="">
                        <Link
                          to={subItem.pathname}
                          className={
                            path.pathname === subItem.pathname
                              ? "active_path"
                              : ""
                          }
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          }
        })}
        {!(
          uniqueRoles?.includes("Admin") || uniqueRoles?.includes("Employee")
        ) && (
          <div
            className={`sidebar-button`}
            onClick={() => navigate("/mark-attendence")}
          >
            <div className="sidebar_content">
              <IoIosLogOut className="sidebar_content" />
              <h4 className={show ? "d-none" : "sidebar_content"}>
                Mark Attendance
              </h4>
            </div>
          </div>
        )}
        <div className={`sidebar-button`} onClick={handleLogout}>
          <div className="sidebar_content">
            <IoIosLogOut className="sidebar_content" />
            <h4 className={show ? "d-none" : "sidebar_content"}> Logout</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
