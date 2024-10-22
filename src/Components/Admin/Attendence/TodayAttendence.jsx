import React, { useEffect, useState } from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import { useAppContext } from "../../Utils/appContecxt";
import UseAttendanceReport from "../../Utils/customHooks/useAttendanceReport";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaginationComp from "../../Pagination/Pagination";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import { get_attendance_report } from "../../../utils/redux/attendanceSlice/getTodayAttendance";
import Loader from "../../assets/Loader.gif";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";
import { Table } from "react-bootstrap";

const TodayAttendence = () => {
  const permissions = UsePermissions("Attandance");
  UseAttendanceReport({ page: 1 });
  const dispatch = useDispatch();

  const obj = [{ name: "Attendance Today", path: "/todayAttendence" }];
  const navigate = useNavigate();

  const attendance_report = useSelector((store) => store.ATTENDANCE_REPORT);
  const all_permissions = useSelector((store) => store.USER_PERMISSIONS);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(get_attendance_report({ page }));
  }, [page]);
  const { show } = useAppContext();

  useEffect(() => {
    if (localStorage.getItem("roles")?.includes("Employee")) {
      navigate("/mark-attendence");
    }
  }, [navigate]);

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

  return permissions?.can_view ? (
    <section className="incomplete_attendence_outer">
      <div
        className={`${
          localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "
        } gray_bg admin_outer  ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="cmn_padding_outer minheight">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
            onBreadcrumbClick={""}
          />

          <div className=" mt-3 card-cmn">
            <Table responsive className="leave_table mb-0 ">
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
                {attendance_report?.isLoading ? (
                  <tr>
                    <td className="text-center" colSpan={9}>
                      <img className="loader_gif" src={Loader} alt="loader" />
                    </td>
                  </tr>
                ) : (
                  attendance_report?.data?.data?.map((report, i) => {
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
                          {permissions?.can_update && report?.id && (
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
                  })
                )}
              </tbody>
            </Table>
          </div>
        </div>
        {attendance_report?.data?.totalPages > 1 && (
          <PaginationComp
            totalPage={attendance_report?.data?.totalPages}
            setPage={setPage}
          />
        )}
      </div>
    </section>
  ) : (
    <UnauthorizedPage />
  );
};

export default TodayAttendence;
