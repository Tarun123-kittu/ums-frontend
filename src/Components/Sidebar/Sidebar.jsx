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
import menuitems, { hrMenuitems, developerMenuitems } from "./MenuItem";
import { save_user_permission_and_roles_globally } from "../../utils/redux/userPermissionSlice/userRolesAndPermissionSlice";
import UseAllUsernames from "../Utils/customHooks/useAllUserNames";

const Sidebar = () => {
  UseAllUsernames();
  const navigate = useNavigate();
  const path = useLocation();
  const dispatch = useDispatch();
  const { show, setShow } = useAppContext();
  const [uniqueRoles, setUniqueRoles] = useState();
  const all_permissions = useSelector((store) => store.USER_PERMISSIONS);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

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

  // Determine which menu items to show based on the user's role
  let availableMenuItems = [];
  if (uniqueRoles?.includes("Admin") || uniqueRoles?.includes("HR")) {
    availableMenuItems = menuitems; // Admin and HR see all menu items
  } else if (uniqueRoles?.includes("Developer")) {
    availableMenuItems = menuitems.filter(
      (item) => (item.name === "Test Series" || item.name === "InterView Leads")
    ); // Developer sees only Test Series
  }

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

  return (
    <div className={`sidebar ${show ? "cmn_width" : ""}`}>
      <div>
        <h3
          className={`bar ${show ? "text-center" : "pe-3"}`}
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? <FaBars /> : <RxCross2 className="p-0 text-center" />}
        </h3>
        <div className={`${show ? "d-none" : "text-center sidebar_logo_outer"}`}>
          <img src={logo} height={"40px"} width={"158px"} />
        </div>

        <div className="mt-4">
          {availableMenuItems.map((data, i) => {
            const isActive = path.pathname === data?.pathname;

            return (
              <div key={i} className={`sidebar-button ${isActive ? "active-pathname" : ""}`}>
                {data.subItems ? (
                  <>
                    <div
                      className="sidebar_content justify-content-between"
                      onClick={() => handleToggle(i)}
                    >
                      <div className={`transition_class ${show ? "" : "d-flex flex-grow-1 gap-2 "}`}>
                        <img
                          src={data?.icon}
                          alt={data?.name}
                          height="18px"
                          width="18px"
                          className={isActive ? "filterClass" : ""}
                        />
                        <h4 className={show ? "d-none" : ""}>{data?.name}</h4>
                      </div>
                      {show ? "" : expanded === i ? (
                        <MdOutlineKeyboardArrowUp onClick={() => handleToggle(i)} />
                      ) : (
                        <MdOutlineKeyboardArrowDown />
                      )}
                    </div>
                  </>
                ) : (
                  <Link to={data?.pathname}>
                    <div className="sidebar_content">
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
            );
          })}
          <div className={`sidebar-button`} onClick={handleLogout}>
            <div className="sidebar_content">
              <IoIosLogOut className="sidebar_content" />
              <h4 className={show ? "d-none" : "sidebar_content"}> Logout</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
