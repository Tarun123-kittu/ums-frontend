import React, { useEffect, useState } from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import UseUserAttendanceReport from "../../Utils/customHooks/useUserAttendanceReport";
import { useDispatch, useSelector } from "react-redux";
import { get_user_attendance_report } from "../../../utils/redux/attendanceSlice/getAttendanceRepot";
import { useNavigate } from "react-router-dom";
import PaginationComp from "../../Pagination/Pagination";
import CustomSelectComp from "../../Common/CustomSelectComp";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import Loader from "../../assets/Loader.gif";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";

const AttendenceReport = () => {
  const dispatch = useDispatch();
  const permissions = UsePermissions("Attandance");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  UseUserAttendanceReport({ name, month, year });
  const obj = [
    { name: "Attendance Report", path: "/attendenceReport" },
    { name: "Attendance Report", path: "/attendenceReport" },
  ];
  let [all_names, setAllNames] = useState([]);
  const navigate = useNavigate();
  const { show } = useAppContext();
  const all_permissions = useSelector((store) => store.USER_PERMISSIONS);
  const user_attendance_report = useSelector(
    (store) => store.GET_USER_ATTENDANCE_REPORT
  );
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  useEffect(() => {
    dispatch(get_user_attendance_report({ name, month, year, page }));
  }, [name, month, year, page]);

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
  const generateYearOptions = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ label: year, value: year });
    }
    return years;
  };
  const years = generateYearOptions(2022, new Date().getFullYear());

  const yearDataObj = years;

  const convertTo12Hour = (time24) => {
    if (!time24) return "--";

    let [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`;
  };

  const timeToHours = (time) => {
    if (!time || time === "--") return 0; // Handle cases where there's no time or it's '--'
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600;
  };

  useEffect(() => {
    let user_data = [];
    user_attendance_report?.data?.data?.forEach((user_name) => {
      if (!user_data.some((user) => user.value === user_name?.name)) {
        user_data.push({ value: user_name?.name, label: user_name?.name });
      }
    });
    setAllNames(user_data);
  }, [user_attendance_report]);

  const handleSelectChange = (field, e) => {
    field === "name" && setName(e.value);
    field === "month" && setMonth(e.value);
    field === "year" && setYear(e.value);
  };

  return permissions?.can_view ? (
    <section className="attendenceReport_outer">
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
            <div className="employee_wrapper">
              <div className="form-group new_employee_form_group">
                <label>Employee</label>
              </div>
              <div className="mt-2">
                <CustomSelectComp
                  value={name}
                  changeHandler={(e) => handleSelectChange("name", e)}
                  optionsData={all_names}
                />
              </div>
            </div>

            <div className="employee_wrapper">
              <div className="form-group new_employee_form_group">
                <label>Month</label>
              </div>
              <div className="mt-2">
                <CustomSelectComp
                  value={month}
                  changeHandler={(e) => handleSelectChange("month", e)}
                  optionsData={monthDataObj}
                />
              </div>
            </div>
            <div className="employee_wrapper">
              <div className="form-group new_employee_form_group">
                <label>Year</label>
              </div>
              <div className="mt-2">
                <CustomSelectComp
                  value={year}
                  changeHandler={(e) => handleSelectChange("year", e)}
                  optionsData={yearDataObj}
                />
              </div>
            </div>

            <div className="employee_wrapper text-center serach_add_outer">
              <button
                className="cmn_Button_style"
                onClick={() =>
                  dispatch(get_user_attendance_report({ name, month, year }))
                }
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
                  <th>Date</th>
                  <th>Employee Name</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Total Time</th>
                  <th>Task</th>
                  <th>OT Hours</th>
                  <th>Review</th>
                  <th>Rating</th>
                  <th>Login Detail</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user_attendance_report?.isLoading ? (
                  <img className="loader_gif" src={Loader} alt="loader" />
                ) : (
                  user_attendance_report?.data?.data?.map((report, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {report?.date}-{report?.date_in_week_day}
                        </td>
                        <td>{report?.name}</td>
                        <td>{convertTo12Hour(report?.in_time)}</td>
                        <td>
                          {report?.out_time
                            ? convertTo12Hour(report?.out_time)
                            : "--"}
                        </td>
                        <td
                          style={{
                            color:
                              timeToHours(report?.total_time) < 9
                                ? "red"
                                : "#33b070",
                          }}
                        >
                          {report?.total_time
                            ? `${report.total_time} hours`
                            : "--"}
                        </td>
                        <td>{report?.report}</td>
                        <td>NA</td>
                        <td>{report?.review ? report?.review : "NA"}</td>
                        <td>{report?.rating}</td>
                        <td>
                          {report?.name}:{report?.login_mobile}
                        </td>
                        <td>
                          {permissions?.can_update && report?.id && (
                            <div className="cmn_action_outer yellow_bg">
                              <FiEdit
                                onClick={() => {
                                  navigate("/editAttendenceReport ", {
                                    state: { id: report?.id },
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
        <PaginationComp
          totalPage={user_attendance_report?.data?.totalPages}
          setPage={setPage}
        />
      </div>
    </section>
  ) : (
    <UnauthorizedPage />
  );
};

export default AttendenceReport;
