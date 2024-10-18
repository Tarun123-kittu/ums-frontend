import React from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import { useAppContext } from "../../Utils/appContecxt";
import { useSelector } from "react-redux";
import UseFetchAllAppliedLeaves from "../../Utils/customHooks/useFetchAllAppliedLeaves";
import { useNavigate } from "react-router-dom";
import PaginationComp from "../../Pagination/Pagination";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import Loader from "../../assets/Loader.gif";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";

const LeaveRequest = () => {
  const permissions = UsePermissions("Leaves");
  const navigate = useNavigate();
  UseFetchAllAppliedLeaves();
  const all_applied_leaves = useSelector(
    (store) => store.GET_ALL_APPLIED_LEAVES
  );
  const obj = [
    { name: "Leave Application", path: "/leaveApplication" },
    { name: "Leave Request", path: "/leaveRequest" },
  ];

  const { show } = useAppContext();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return permissions?.can_view ? (
    <section className="leaveRequest_outer">
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
                {all_applied_leaves?.isLoading ? (
                  <img className="loader_gif" src={Loader} alt="loader" />
                ) : (
                  all_applied_leaves?.data?.data?.map((leaves, i) => {
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
                          {permissions?.can_update && (
                            <div className="cmn_action_outer yellow_bg">
                              <FiEdit
                                onClick={() => {
                                  navigate("/editLeaveRequest", {
                                    state: {
                                      leave_id: leaves?.id,
                                      leave_status: leaves?.status,
                                      leave_remark: leaves?.remark,
                                      from_date: leaves?.date_from,
                                      to_date: leaves?.to_date,
                                      leave_count: leaves?.count,
                                      user_id: leaves?.user_id,
                                      name: leaves?.name,
                                      email: leaves?.email,
                                    },
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
        <PaginationComp />
      </div>
    </section>
  ) : (
    <UnauthorizedPage />
  );
};

export default LeaveRequest;
