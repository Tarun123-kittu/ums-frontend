import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import InputField from "../../Common/InputField";

import "./leaveApplication.css";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { get_applied_leave_detail } from "../../../utils/redux/leaveSlice/getAppliedLeavesDetails";
import moment from "moment";
import {
  update_leave,
  clear_update_leave_state,
} from "../../../utils/redux/leaveSlice/updateLeaves";
import toast from "react-hot-toast";

const EditLeaveRequest = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    leave_id,
    back_to_report,
    leave_status,
    leave_remark,
    from_date,
    to_date,
    leave_count,
    user_id,
    name,
    email,
  } = location?.state ? location?.state : location;
  const leave_details = useSelector((store) => store.APPLIED_LEAVE_DETAIL);
  const update_leave_data = useSelector((store) => store.UPDATE_LEAVE);
  const [leaveDetail, setLeaveDetail] = useState();
  const [status, setStatus] = useState(leave_status);
  const [remark, setRemark] = useState(leave_remark);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (!leave_id) navigate("/leaveRequest");
    leave_id && dispatch(get_applied_leave_detail({ leave_id }));
  }, [leave_id]);

  useEffect(() => {
    if (leave_details?.isSuccess) {
      setLeaveDetail(leave_details?.data?.data[0]);
    }
  }, [leave_details]);

  useEffect(() => {
    if (update_leave_data?.isSuccess) {
      toast.success("Leave updated successfully");
      dispatch(clear_update_leave_state());
      back_to_report ? navigate("/leaveReport") : navigate("/leaveRequest");
    }
    if (update_leave_data?.isError) {
      toast.error("Something went Wrong");
      dispatch(clear_update_leave_state());
    }
  }, [update_leave_data]);

  const obj = [
    { name: "Leave Application", path: "" },
    { name: "Edit Leave Request", path: "/editLeaveRequest" },
  ];
  const { show } = useAppContext();

  const handleUpdateLeave = () => {
    dispatch(
      update_leave({
        leave_id,
        status,
        remark,
        email,
        name,
        from_date,
        to_date,
        user_id,
        leave_count,
      })
    );
  };
  return (
    <section className="editLeave_outer">
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
          <div>
            <div className="cmn_editattendence_outer cmn_border">
              <div className="row">
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Employee"}
                    type={"text"}
                    value={leaveDetail?.name}
                    disabled={true}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Mobile"}
                    type={"number"}
                    value={leaveDetail?.mobile}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Leave Date"}
                    type={"text"}
                    value={
                      leaveDetail?.from_date && leaveDetail?.to_date
                        ? `${moment(leaveDetail.from_date).format(
                            "MM/DD/YYYY"
                          )} - ${moment(leaveDetail.to_date).format(
                            "MM/DD/YYYY"
                          )}`
                        : ""
                    }
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Apply Date"}
                    type={"text"}
                    value={moment(leaveDetail?.createdAt).format("MM/DD/YYYY")}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Number Of Dates"}
                    type={"number"}
                    value={leaveDetail?.count}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Sandwich"}
                    type={"text "}
                    value={leaveDetail?.sandwich === 0 ? "No" : "Yes"}
                  />
                </div>
                <div className="col-lg-12 col-sm-12 col-md-12">
                  <div className="new_employee_form_group form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control mt-2"
                      value={leaveDetail?.description}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>Type</label>
                    <select className="form-control form-group">
                      <option>{leaveDetail?.type}</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <div className="new_employee_form_group form-group">
                    <label>Status</label>
                    <select
                      className="form-control"
                      value={status ? status : leaveDetail?.status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="ACCEPTED">Accepted</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="new_employee_form_group form-group">
                <label>Remark</label>
                <textarea
                  className="form-control mt-2"
                  value={remark ? remark : leaveDetail?.remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>

              <div className="text-center mt-4">
                <button
                  className="cmn_Button_style"
                  onClick={() => handleUpdateLeave()}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditLeaveRequest;
