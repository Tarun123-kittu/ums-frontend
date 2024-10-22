import React, { useEffect, useState } from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import { useSelector, useDispatch } from "react-redux";
import "./attendence.css";
import { useNavigate } from "react-router-dom";
import PaginationComp from "../../Pagination/Pagination";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import Loader from "../../assets/Loader.gif";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";
import { Table } from "react-bootstrap";
import { get_attendance_report } from "../../../utils/redux/attendanceSlice/getTodayAttendance";

const IncompleteAttendence = () => {
  const dispatch = useDispatch();
  const permissions = UsePermissions("Attandance");
  const obj = [
    { name: "Incomplete Attendance", path: "/incompleteAttendence" },
  ];
  const navigate = useNavigate();
  const { show } = useAppContext();
  const [page, setPage] = useState(1);
  const attendance_report = useSelector((store) => store.ATTENDANCE_REPORT);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  useEffect(() => {
    dispatch(get_attendance_report({ page }));
  }, [page]);

  const convertTo12Hour = (time24) => {
    if (!time24) return "--";

    let [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`;
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
                  <th>Date</th>
                  <th>Employee Name</th>
                  <th>In Time</th>
                  <th>Out Time</th>
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
                            {permissions?.can_update && report?.id && (
                              <div className="cmn_action_outer yellow_bg cursor_pointer">
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
                    }
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

export default IncompleteAttendence;
