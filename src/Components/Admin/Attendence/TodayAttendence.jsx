import React from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import UseAttendanceReport from "../../Utils/customHooks/useAttendanceReport";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TodayAttendence = () => {
  UseAttendanceReport();
  const obj = [
    { name: "Attendance Report", path: "/attendenceReport" },
    { name: "Attendance Today", path: "/todayAttendence" },
  ];
  const navigate = useNavigate();

  const attendance_report = useSelector((store) => store.ATTENDANCE_REPORT);
  const { show } = useAppContext();

  const convertTo12Hour = (time24) => {
    if (!time24) return "--";

    let [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`;
  };

  return (
    <section className="incomplete_attendence_outer">
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

          <div className="table-responsive mt-3 transparent_bg">
            <table className="employee_detail_table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Total Time</th>
                  <th>Login Detail</th>
                  <th>Logout Detail</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {attendance_report?.data?.data?.map((report, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{report?.name}</td>
                      <td>
                        {report?.in_time
                          ? convertTo12Hour(report.in_time)
                          : "--"}
                      </td>
                      <td>
                        {report?.out_time
                          ? convertTo12Hour(report?.out_time)
                          : "--"}
                      </td>
                      <td>{report?.total_time ? report?.total_time : "--"}</td>
                      <td>
                        {report?.name && report?.login_mobile
                          ? `${report.name}/mobile ${
                              report.login_mobile === "1" ? "true" : "false"
                            }`
                          : "--"}
                      </td>
                      <td>
                        {report?.name && report?.logout_mobile
                          ? `${report.name}/mobile ${
                              report.logout_mobile === "1" ? "true" : "false"
                            }`
                          : "--"}
                      </td>

                      <td>
                        {report?.id && (
                          <div className="cmn_action_outer yellow_bg">
                            <FiEdit
                              onClick={() => {
                                navigate("/editAttendenceReport", {
                                  state: { id: report?.id },
                                });
                              }}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodayAttendence;
