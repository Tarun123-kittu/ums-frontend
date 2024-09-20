import React from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import { FaSortDown } from "react-icons/fa";
import { TiArrowSortedUp } from "react-icons/ti";
import Select from "../../Common/Select";
import UseAttendanceReport from "../../Utils/customHooks/useAttendanceReport";

const AttendenceReport = () => {
  const obj = [
    { name: "Attendance Report", path: "/attendenceReport" },
    { name: "Attendance Report", path: "/attendenceReport" },
  ];

  const { show } = useAppContext();

  const employeeDataObj = [
    { option: "Akriti", value: "Akriti" },
    { option: "Amit", value: "Amit" },
  ];
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
                options={employeeDataObj}
              />
            </div>
            <div className="employee_wrapper">
              <Select
                labelname={"Pending Leaves"}
                labelClass={""}
                options={leaveDataObj}
              />
            </div>
            <div className="employee_wrapper">
              <Select
                labelname={"Month"}
                labelClass={""}
                options={monthDataObj}
              />
            </div>
            <div className="employee_wrapper">
              <Select
                labelname={"Year"}
                labelClass={""}
                options={yearDataObj}
              />
            </div>

            <div className="employee_wrapper text-center serach_add_outer">
              <button className="cmn_Button_style">Search</button>
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
                <tr>
                  <td>1</td>
                  <td>19/08/24 -Monday</td>
                  <td>John</td>
                  <td>01:30:40 PM</td>
                  <td>--</td>
                  <td style={{ color: "#33b070" }}>14:51:23</td>
                  <td>Bids Project understanding</td>
                  <td>NA</td>
                  <td>AA</td>
                  <td>John Mobile:false</td>
                  <td>John Mobile:false</td>
                  <td>
                    <div className="cmn_action_outer yellow_bg">
                      <FiEdit />
                    </div>
                  </td>
                </tr>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendenceReport;
