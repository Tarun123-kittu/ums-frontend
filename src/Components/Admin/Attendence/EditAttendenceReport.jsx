import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import InputField from "../../Common/InputField";
import "./attendence.css";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { MdStar } from "react-icons/md";
import "./attendence.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  get_selected_attendance_details,
  clear_selected_attendance_slice,
} from "../../../utils/redux/attendanceSlice/getSelectedAttendanceDetails";
import toast from "react-hot-toast";
import {
  update_attendance,
  clear_update_attendance_state,
} from "../../../utils/redux/attendanceSlice/updateAttendance";

const EditAttendenceReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = location?.state ? location?.state : location;
  const [in_time, setIn_time] = useState("");
  const [out_time, setOut_time] = useState("");
  const [report, setReport] = useState("");
  const [remark, setRemark] = useState("");
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate(-1);
    } else {
      dispatch(get_selected_attendance_details({ id }));
    }
  }, [id]);

  const obj = [
    { name: "Attendance Report", path: "/attendenceReport" },
    { name: "Edit  Attendance Report", path: "/editAttendenceReport" },
  ];

  const { show } = useAppContext();

  const attendance_detail = useSelector(
    (store) => store.SELECTED_ATTENDANCE_DETAIL
  );

  const is_attendance_updated = useSelector((store) => store.UPDATE_ATTENDANCE);

  useEffect(() => {
    if (attendance_detail.isSuccess) {
      setIn_time(attendance_detail?.data?.in_time);
      setOut_time(attendance_detail?.data?.out_time);
      setRemark(attendance_detail?.data?.remark);
      setReport(attendance_detail?.data?.report);
    }
    if (attendance_detail.isError) {
      toast.error("Something went wrong");
      dispatch(clear_selected_attendance_slice());
    }
  }, [attendance_detail]);

  const handleChange = (field, e) => {
    setEnable(true);
    if (field === "out_time") setOut_time(e.target.value);
    if (field === "in_time") setIn_time(e.target.value);
    if (field === "report") setReport(e.target.value);
    if (field === "remark") setRemark(e.target.value);
  };

  const handleUpdate = () => {
    if (!enable) {
      toast.error("You have not changed any field");
    } else {
      dispatch(update_attendance({ id, in_time, out_time, remark, report }));
    }
  };

  useEffect(() => {
    if (is_attendance_updated?.isSuccess) {
      toast.success("Attendance Updated Successfully");
      dispatch(clear_selected_attendance_slice());
      dispatch(clear_update_attendance_state());
      navigate(-1);
    }
    if (is_attendance_updated?.ieError) {
      toast.success(is_attendance_updated?.error?.message);
      dispatch(clear_selected_attendance_slice());
      dispatch(clear_update_attendance_state());
    }
  }, [is_attendance_updated]);

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
                    value={attendance_detail?.data?.name}
                    disabled={true}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Mobile"}
                    type={"number"}
                    value={attendance_detail?.data?.mobile}
                    disabled={true}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Date"}
                    type={"date"}
                    value={attendance_detail?.data?.date}
                    disabled={true}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Total Time"}
                    type={"time"}
                    value={attendance_detail?.data?.total_time}
                    disabled={true}
                  />
                </div>

                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"In Time"}
                    type={"time"}
                    value={in_time}
                    onChange={(e) => handleChange("in_time", e)}
                  />
                </div>

                <div className="col-lg-6 col-sm-12 col-md-12">
                  <InputField
                    classname={"new_employee_form_group"}
                    labelname={"Out Time"}
                    type={"time"}
                    value={out_time}
                    onChange={(e) => handleChange("out_time", e)}
                  />
                </div>
              </div>
              <div className="new_employee_form_group form-group">
                <label>Report</label>
                <textarea
                  className="form-control mt-2"
                  value={report}
                  onChange={(e) => handleChange("report", e)}
                />
              </div>
              <div className="new_employee_form_group form-group">
                <label>Remark</label>
                <textarea
                  className="form-control mt-2"
                  value={remark}
                  onChange={(e) => handleChange("remark", e)}
                />
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
                <button
                  className="cmn_Button_style"
                  onClick={() => handleUpdate()}
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

export default EditAttendenceReport;
