import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import InputField from "../../Common/InputField";

import "./leaveApplication.css";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { get_applied_leave_detail } from "../../../utils/redux/leaveSlice/getAppliedLeavesDetails";

const EditLeaveReport = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { leave_id } = location?.state ? location?.state : location;
  console.log(leave_id, "this is the leave_id");
  const obj = [
    { name: "Leave Application", path: "" },
    { name: "Edit Leave Report", path: "/editLeaveReport" },
  ];
  const { show } = useAppContext();
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
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Mobile"}
                    type={"number"}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Leave Date"}
                    type={"text"}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Apply Date"}
                    type={"text"}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Number Of Dates"}
                    type={"number"}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Sandwich"}
                    type={"text "}
                  />
                </div>
                <div className="col-lg-12 col-sm-12 col-md-12">
                  <div className="new_employee_form_group">
                    <label>Description</label>
                    <textarea className="form-control mt-2" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>Type</label>
                    <select className="form-control">
                      <option>Short Day Leave</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <div className="new_employee_form_group">
                    <label>Status</label>
                    <select className="form-control">
                      <option>Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="new_employee_form_group">
                <label>Remark</label>
                <textarea className="form-control mt-2" />
              </div>

              <div className="text-center mt-4">
                <button className="cmn_Button_style">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditLeaveReport;
