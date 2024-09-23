import React from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import { useSelector } from "react-redux";
import "./attendence.css"
import { useNavigate } from "react-router-dom";
const IncompleteAttendence = () => {
  const obj = [
    { name: "Attendance Report", path: "/attendenceReport" },
    { name: "Incomplete Attendance", path: "/incompleteAttendence" },
  ];
const navigate=useNavigate()
  const { show } = useAppContext();
  const attendance_report = useSelector((store) => store.ATTENDANCE_REPORT);

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
                  <th>Date</th>
                  <th>Employee Name</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {attendance_report?.data?.data?.map((report, i) => {
                  if (!report?.out_time) {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          {report?.data} -{report?.date_in_week_day}
                        </td>
                        <td>{report?.name}</td>
                        <td>{convertTo12Hour(report?.in_time)}</td>
                        <td>--</td>
                        <td>
                          <div className="cmn_action_outer yellow_bg cursor_pointer">
                            <FiEdit onClick={()=>{navigate('/editIncompleteAttendence')}}/>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncompleteAttendence;
