import React, { useEffect, useState } from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import { FaSort } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_all_user_leave } from "../../../utils/redux/leaveSlice/getUsersAllLeaves";
import PaginationComp from "../../Pagination/Pagination";
import CustomSelectComp from "../../Common/CustomSelectComp";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import Loader from "../../assets/Loader.gif";

const LeaveReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const obj = [
    { name: "Leave Application", path: "" },
    { name: "Leave Report", path: "/leaveReport" },
  ];

  useEffect(() => {
    if (localStorage.getItem("roles")?.includes("Employee")) {
      navigate("/mark-attendence");
    }
  }, [navigate]);
  const leave_data = useSelector((store) => store.USER_ALL_LEAVES);
  const all_userNames = useSelector((store) => store.ALL_USERNAMES);
  const all_permissions = useSelector((store) => store.USER_PERMISSIONS);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );
  const [hr_user_permissions, setHr_user_permissions] = useState({});
  const [year, setYear] = useState([]);
  const [selected_employee, setSelected_employee] = useState();
  const [selected_month, setSelected_month] = useState();
  const [selected_year, setSelected_year] = useState();

  useEffect(() => {
    const can_hr_create = all_permissions?.data?.data?.find(
      (el) => el.role === "HR" && el.permission === "Leave"
    );
    setHr_user_permissions(can_hr_create);
  }, [all_permissions]);

  useEffect(() => {
    dispatch(
      get_all_user_leave({
        name: selected_employee,
        month: selected_month,
        year: selected_year,
      })
    );
    years();
  }, []);

  const { show } = useAppContext();
  const formatDate = (dateString) => {
    if (!dateString) return ""; // handle the case when the date is null or undefined
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with '0' if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (months are 0-based)
    const year = date.getFullYear(); // Get the year
    return `${year}-${month}-${day}`;
  };

  const years = (startYear = 2022) => {
    let currentYear = new Date().getFullYear();
    let result = [];

    while (startYear <= currentYear) {
      // result.push(startYear++);
      result.push({ label: startYear, value: startYear });
      startYear++;
    }
    setYear(result);
  };

  const handleManageFilters = () => {
    if (selected_employee || selected_month || selected_year) {
      dispatch(
        get_all_user_leave({
          name: selected_employee,
          month: selected_month,
          year: selected_year,
        })
      );
    }
  };
  const monthDataObj = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  if (
    !(
      user_all_permissions?.roles_data?.includes("Admin") ||
      user_all_permissions?.roles_data?.includes("HR")
    )
  ) {
    return <UnauthorizedPage />;
  }

  return (
    <section className="leaveReport_outer">
      <div
        className={`wrapper gray_bg admin_outer  ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="cmn_padding_outer minheight">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
            onBreadcrumbClick={""}
          />

          <div className="d-flex employee_container align-items-end mt-3">
            <div className="new_employee_form_group employee_wrapper">
              <label className="inter_fontfamily">Employees</label>
              <div class="custom-select-wrapper ">
                <select
                  class="custom-select form-control"
                  placeholder="Select Financial Year"
                  value={selected_employee}
                  onChange={(e) => setSelected_employee(e.target.value)}
                >
                  <option>Select</option>
                  {all_userNames?.data?.data?.map((name, i) => {
                    return (
                      <option key={i} value={name?.id}>
                        {name?.name}-({name?.username})
                      </option>
                    );
                  })}
                </select>
                <FaSort className="dropdown-icon " />
              </div>
            </div>

            <div className="new_employee_form_group employee_wrapper">
              <div className="form-group new_employee_form_group mt-2">
                <label className="inter_fontfamily">Month</label>
                <div className="mt-2">
                  <CustomSelectComp
                    optionsData={monthDataObj}
                    changeHandler={(e) => setSelected_month(e.value)}
                    value={selected_month}
                  />
                </div>
              </div>
            </div>

            <div className="new_employee_form_group employee_wrapper">
              <label className="inter_fontfamily">Year</label>
              <div className="mt-2">
                <CustomSelectComp
                  optionsData={year}
                  changeHandler={(e) => setSelected_year(e.value)}
                  value={selected_year}
                />
              </div>
            </div>

            <div className="employee_wrapper text-center serach_add_outer">
              <button
                className="cmn_Button_style"
                onClick={() => handleManageFilters()}
              >
                Search
              </button>
            </div>
          </div>
          <div className="table-responsive mt-3 transparent_bg">
            <table className="employee_detail_table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee </th>
                  <th>Type</th>
                  <th>Apply On</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Total</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Remark</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leave_data?.isLoading ? (
                  <img className="loader_gif" src={Loader} alt="loader" />
                ) : (
                  leave_data?.data?.data?.map((leave, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{leave?.name}</td>
                        <td>{leave?.type}</td>
                        <td>{formatDate(leave?.createdAt)}</td>
                        <td>{leave?.from_date}</td>
                        <td>{leave?.to_date}</td>
                        <td>{leave?.count}</td>
                        <td>{leave?.description}</td>
                        <td>{leave?.status}</td>
                        <td>{leave?.remark}</td>
                        <td>
                          {(user_all_permissions?.roles_data?.includes(
                            "Admin"
                          ) ||
                            hr_user_permissions?.can_view) && (
                            <div className="cmn_action_outer yellow_bg cursor_pointer">
                              <FiEdit
                                onClick={() => {
                                  navigate("/editLeaveRequest", {
                                    state: {
                                      leave_id: leave?.id,
                                      back_to_report: true,
                                      leave_status: leave?.status,
                                      leave_remark: leave?.remark,
                                    },
                                  });
                                }}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <PaginationComp />
      </div>
    </section>
  );
};

export default LeaveReport;
