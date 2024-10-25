import React, { useEffect, useState } from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import { useAppContext } from "../../Utils/appContecxt";
import { useDispatch, useSelector } from "react-redux";
import { get_user_attendance_report } from "../../../utils/redux/attendanceSlice/getAttendanceRepot";
import { useNavigate } from "react-router-dom";
import PaginationComp from "../../Pagination/Pagination";
import CustomSelectComp from "../../Common/CustomSelectComp";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import Loader from "../../assets/Loader.gif";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";
import { Table } from "react-bootstrap";

const AttendenceReport = () => {
  let i = 0;
  const dispatch = useDispatch();
  const permissions = UsePermissions("Attandance");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const obj = [{ name: "Attendance Report", path: "/attendenceReport" }];
  let [all_names, setAllNames] = useState([]);
  const navigate = useNavigate();
  const { show } = useAppContext();
  const [enableSearch, setEnableSearch] = useState(false);
  const user_attendance_report = useSelector(
    (store) => store.GET_USER_ATTENDANCE_REPORT
  );

  useEffect(() => {
    dispatch(get_user_attendance_report({ name, month, year, page }));
    localStorage.removeItem("tab");
  }, [dispatch, name, month, year, page]);

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
    if (!time || time === "--") return 0;
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
        className={`${
          localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "
        }gray_bg admin_outer  ${show ? "cmn_margin" : ""}`}
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
              {!enableSearch ? (
                <button
                  className="cmn_Button_style"
                  onClick={() => {
                    dispatch(get_user_attendance_report({ name, month, year }));
                    setEnableSearch(true);
                  }}
                >
                  Search
                </button>
              ) : (
                <button
                  className="cmn_Button_style cmn_darkgray_btn"
                  onClick={() => {
                    dispatch(
                      get_user_attendance_report({
                        name: "",
                        month: "",
                        year: "",
                      })
                    );
                    setEnableSearch(false);
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className=" mt-3 card-cmn">
            <Table responsive className="leave_table mb-0 ">
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
                  <tr>
                    <td className="text-center" colSpan={9}>
                      <img className="loader_gif" src={Loader} alt="loader" />
                    </td>
                  </tr>
                ) : (
                  user_attendance_report?.data?.data?.map((report, index) => {
                    if (report?.role !== "Admin") {
                      return (
                        <tr key={index}>
                          <td>{++i}</td>
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
                          <td>
                            {report?.report ? report?.report : "Not Available"}
                          </td>
                          <td>Not Available</td>
                          <td>
                            {report?.review ? report?.review : "Not Available"}
                          </td>
                          <td>
                            {report?.rating ? report?.rating : "Not Available"}
                          </td>
                          <td>
                            {report?.login_mobile
                              ? report?.name + "/" + report?.login_mobile
                              : "Not Available"}
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
                    }
                  })
                )}
              </tbody>
            </Table>
          </div>
        </div>
        {user_attendance_report?.data?.totalPages > 1 && (
          <PaginationComp
            totalPage={user_attendance_report?.data?.totalPages}
            setPage={setPage}
          />
        )}
      </div>
    </section>
  ) : (
    <UnauthorizedPage />
  );
};

export default AttendenceReport;
