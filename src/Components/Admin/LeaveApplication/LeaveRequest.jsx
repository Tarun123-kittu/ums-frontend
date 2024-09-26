import React from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import { useSelector } from "react-redux";
import UseFetchAllAppliedLeaves from "../../Utils/customHooks/useFetchAllAppliedLeaves";
import { useNavigate } from "react-router-dom";
import PaginationComp from "../../Pagination/Pagination";

const LeaveRequest = () => {
  UseFetchAllAppliedLeaves();
  const all_applied_leaves = useSelector(
    (store) => store.GET_ALL_APPLIED_LEAVES
  );
  console.log(all_applied_leaves, "all_applied_leaves");
  const obj = [
    { name: "Leave Application", path: "/leaveApplication" },
    { name: "Leave Request", path: "/leaveRequest" },
  ];

  const { show } = useAppContext();

  const formatDate = (dateString) => {
    if (!dateString) return ""; // handle the case when the date is null or undefined
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with '0' if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (months are 0-based)
    const year = date.getFullYear(); // Get the year
    return `${year}-${month}-${day}`;
  };
  const navigate = useNavigate();
  return (
    <section className="leaveRequest_outer">
      <Sidebar />
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

          <div className="table-responsive mt-3 transparent_bg">
            <table className="employee_detail_table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
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
                {all_applied_leaves?.data?.data?.map((leaves, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{leaves?.name}</td>
                      <td>{leaves?.type}</td>
                      <td>{formatDate(leaves?.applied_on)}</td>
                      <td>{leaves?.date_from}</td>
                      <td>{leaves?.to_date}</td>
                      <td>{leaves?.count}</td>
                      <td>{leaves?.description}</td>
                      <td>{leaves?.status}</td>
                      <td>{leaves?.remark}</td>
                      <td>
                        <div className="cmn_action_outer yellow_bg">
                          <FiEdit
                            onClick={() => {
                              navigate("/editLeaveRequest", {
                                state: {
                                  leave_id: leaves?.id,
                                  leave_status: leaves?.status,
                                  leave_remark: leaves?.remark,
                                },
                              });
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <PaginationComp/>
      </div>
    </section>
  );
};

export default LeaveRequest;
