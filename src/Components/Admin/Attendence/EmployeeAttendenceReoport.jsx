import React, { useState, useEffect } from "react";
import Notification from "../Notification/Notification";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { get_user_monthly_attendence } from "../../../utils/redux/attendanceSlice/getUserMonthlyReport";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../../Utils/appContecxt";
const EmployeeAttendenceReoport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { valid } = location?.state ? location?.state : location;
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [enable_search, setEnableSearch] = useState(false);
  const monthly_report = useSelector(
    (store) => store.ATTENDENCE_MONTHLY_REPORT
  );
  const { show } = useAppContext();

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
  useEffect(() => {
    dispatch(get_user_monthly_attendence({ month, year }));
  }, []);

  const generateYearOptions = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ label: year, value: year });
    }
    return years;
  };
  const years = generateYearOptions(2022, new Date().getFullYear());

  const yearDataObj = years;

  const get_report = () => {
    if (!enable_search) {
      toast.error("please select any filters first");
    } else {
      dispatch(get_user_monthly_attendence({ month, year }));
    }
  };
  return (
    <section>
      <div
        // className={`${localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "
        //   } gray_bg admin_outer   ${show ? "cmn_margin" : ""}`}
          className={`${localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "} min-vh-100 bg-light ${show ? "cmn_margin" : "cmn_margin_outer"}`}
      >
        <div className=" min-vh-100 bg-light ">
          <Notification view={true} />
          <div className="p-4 py-5 ">
            <h1 class="maine-heading">Attendance Reports</h1>
            <div className=" admin_dashboard_outer m-0 ">
              <div className="attendence_submit cmn_card">
                <div className="reporting-sub-heading-box">
                  <h3>Monthly Attendance</h3>
                  <p>Your Monthly Attendance Snapshot!</p>
                </div>
                <div className="attendence_submit cmn_card">
                  <div className="report_header">
                    <div className="flex-grow-1 form-group">
                      <select
                        class="form-select"
                        name=""
                        id=""
                        onChange={(e) => {
                          setMonth(e.target.value);
                          setEnableSearch(true);
                        }}
                      >
                        <option>Select</option>
                        {monthDataObj?.map((month, i) => {
                          return (
                            <option key={i} value={month?.value}>
                              {month?.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="flex-grow-1 form-group">
                      <select
                        class="form-select"
                        name=""
                        id=""
                        onChange={(e) => {
                          setYear(e.target.value);
                          setEnableSearch(true);
                        }}
                      >
                        <option>Select</option>
                        {yearDataObj?.map((year, i) => {
                          return (
                            <option key={i} value={year?.value}>
                              {year?.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <button className="all-btn-red" onClick={() => get_report()}>
                      Get Report
                    </button>
                  </div>
                </div>


                <Table
                  responsive
                  bordered
                  hover
                  className="mb-0 leave_table table report_table"
                >
                  <thead >
                    <tr className="report-table-header">
                      {/* <th colSpan={1}>#</th> */}
                      <th>Date</th>
                      <th>In Time</th>
                      <th>Out Time</th>
                      <th colSpan={1}>Task</th>
                      <th>Total Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthly_report?.data?.message?.map((report, i) => {
                      if (report?.isHoliday || report?.isWeekend) {
                        return (
                          <tr className="report-table-body">
                            {/* <td
                            style={
                              report?.isHoliday
                                ? { color: "blue" }
                                : { color: "green" }
                            }
                          >
                            {i + 1}
                          </td> */}
                            {report?.isHoliday && (
                              <td
                                colSpan={7}
                                className="text-center"
                                style={{ color: "blue" }}
                              >
                                {report?.date} - {report?.holidayName}
                              </td>
                            )}
                            {report?.isWeekend && (
                              <td
                                colSpan={7}
                                className="text-center"
                                style={{ color: "#27AE60" }}
                              >
                                {report?.date} - {report?.dayOfWeek}
                              </td>
                            )}
                          </tr>
                        );
                      }
                      return (
                        <tr className="report-table-body">
                          {/* <td colSpan={1}>{i + 1}</td> */}
                          <td>
                            {" "}
                            {report?.date} <br /> <span className=""> {report.dayOfWeek}</span>
                          </td>
                          <td>{report?.in_time}</td>
                          <td>{report?.out_time}</td>
                          <td colSpan={1}>{report?.report}</td>
                          <td>{report?.total_time}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default EmployeeAttendenceReoport;
