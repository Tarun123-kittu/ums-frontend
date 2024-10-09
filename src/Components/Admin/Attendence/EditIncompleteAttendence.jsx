import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import InputField from "../../Common/InputField";

import "./attendence.css";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { MdStar } from "react-icons/md";

const EditIncompleteAttendence = () => {
  const obj = [
    { name: "Attendance Report", path: "/attendenceReport" },
    { name: "Edit Incomplete Attendance", path: "/editIncompleteAttendence" },
  ];
  const { show } = useAppContext();
  return (
    <section className="attendenceReport_outer">
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
                    labelname={"Date"}
                    type={"date"}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Total Time"}
                    type={"time"}
                  />
                </div>

                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"In Time"}
                    type={"time"}
                  />
                </div>

                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Out Time"}
                    type={"time"}
                  />
                </div>
              </div>
              <div className="new_employee_form_group">
                <label>Report</label>
                <textarea className="form-control mt-2" />
              </div>
              <div className="new_employee_form_group">
                <label>Remark</label>
                <textarea className="form-control mt-2" />
              </div>
              <div className="rating_outer">
                <h3>Rating</h3>
                <MdStar />
                <MdStar />
                <MdStar />
                <MdStar />
                <MdStar />
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

export default EditIncompleteAttendence;
