import React, { useEffect, useState } from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import { FaSortDown } from "react-icons/fa";
import { TiArrowSortedUp } from "react-icons/ti";
import Select from "../../Common/Select";
import UseUserAttendanceReport from "../../Utils/customHooks/useUserAttendanceReport";
import { useDispatch, useSelector } from "react-redux";
import { get_user_attendance_report } from "../../../utils/redux/attendanceSlice/getAttendanceRepot";
import { useNavigate } from "react-router-dom";

const AttendenceReport = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  UseUserAttendanceReport({ name, month, year });
  const obj = [
    { name: "Attendance Report", path: "/attendenceReport" },
    { name: "Attendance Report", path: "/attendenceReport" },
  ];
  let [all_names, setAllNames] = useState([]);
  console.log(all_names, "this is the all naes  ");
const navigate =useNavigate()
  const { show } = useAppContext();
  const user_attendance_report = useSelector(
    (store) => store.GET_USER_ATTENDANCE_REPORT
  );
  console.log(user_attendance_report, "user_attendance_report");
  const leaveDataObj = [
    { option: "1", value: "1" },
    { option: "2", value: "2" },
  ];
  const monthDataObj = [
    { value: "01", option: "January" },
    { value: "02", option: "February" },
    { value: "03", option: "March" },
    { value: "04", option: "April" },
    { value: "05", option: "May" },
    { value: "06", option: "June" },
    { value: "07", option: "July" },
    { value: "08", option: "August" },
    { value: "09", option: "September" },
    { value: "10", option: "October" },
    { value: "11", option: "November" },
    { value: "12", option: "December" },
  ];
  const generateYearOptions = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ option: year, value: year });
    }
    return years;
  };
  const years = generateYearOptions(2015, new Date().getFullYear());

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
        user_data.push({ value: user_name?.name, option: user_name?.name });
      }
    });
    setAllNames(user_data);
  }, [user_attendance_report]);

  const handleSelectChange = (field, e) => {
    field === "name" && setName(e.target.value);
    field === "month" && setMonth(e.target.value);
    field === "year" && setYear(e.target.value);
  };

  return (
    <section className="attendenceReport_outer">
      <Sidebar />
      <div
        className={`wrapper gray_bg admin_outer  ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="cmn_padding_outer">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
            onBreadcrumbClick={""}
          />

          <div className="d-flex employee_container align-items-end mt-3">
            <div className="employee_wrapper">
              <Select
                labelname={"Employee"}
                labelClass={""}
                onChange={(e) => handleSelectChange("name", e)}
                options={all_names}
              />
            </div>

            <div className="employee_wrapper">
              <Select
                labelname={"Month"}
                labelClass={""}
                onChange={(e) => handleSelectChange("month", e)}
                options={monthDataObj}
              />
            </div>
            <div className="employee_wrapper">
              <Select
                labelname={"Year"}
                labelClass={""}
                onChange={(e) => handleSelectChange("year", e)}
                options={yearDataObj}
              />
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
                {user_attendance_report?.data?.data?.map((report, index) => {
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
                        <div className="cmn_action_outer yellow_bg">
                          <FiEdit onClick={()=>{navigate('/editAttendenceReport')}}/>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/*       
                <tr>
                  <td style={{ color: "#33b070" }}>2</td>
                  <td colspan="5" style={{ color: "#33b070" }}>
                    19/08/24 Saturday
                  </td>
                  <td>NA</td>
                  <td>NA</td>
                  <td>AA</td>
                  <td colspan="3"></td>
                </tr>
                <tr>
                  <td style={{ color: "#33b070" }}>3</td>
                  <td colspan="5" style={{ color: "#33b070" }}>
                    19/08/24 Sunday
                  </td>
                  <td>NA</td>
                  <td style={{ color: "#33b070" }}>AA</td>
                  <td style={{ color: "#33b070" }}>AA</td>
                  <td colspan="3"></td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendenceReport;
