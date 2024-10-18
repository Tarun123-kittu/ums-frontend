import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Utils/appContecxt";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import InputField from "../../Common/InputField";
import Notification from "../Notification/Notification";
import CustomSelectComp from "../../Common/CustomSelectComp";
import { indianStates } from "../../Utils/customData/statesData";
import { ProfileData } from "../../Utils/customData/profileData";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  update_lead,
  clear_update_lead_state,
} from "../../../utils/redux/interviewLeadsSlice/updateLead";
import toast from "react-hot-toast";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";

const EditPerson = () => {
  const permissions = UsePermissions("Interviews");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leadData } = location?.state ? location?.state : location;
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [profile, setProfile] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [current_salary, setCurrent_salary] = useState("");
  const [expected_salary, setExpected_salary] = useState("");
  const [last_company, setLast_company] = useState("");
  const [id, setId] = useState(null);
  const update_lead_data = useSelector((store) => store.UPDATE_LEAD);
  console.log(update_lead_data, "this is the lead update data");

  useEffect(() => {
    if (!leadData) {
      navigate("/interviewLead");
    } else {
      setId(leadData?.id);
      setName(leadData?.name);
      setMobile(leadData?.phone_number);
      setEmail(leadData?.email);
      setGender(leadData?.gender);
      setDob(leadData?.dob);
      setProfile(leadData?.profile);
      setState(leadData?.state);
      setAddress(leadData?.house_address);
      setExperience(leadData?.experience);
      setCurrent_salary(leadData?.current_salary);
      setExpected_salary(leadData?.expected_salary);
      setLast_company(leadData?.last_company);
    }
  }, [leadData]);

  const obj = [
    { name: "Interview Lead", path: "/interviewLead" },
    { name: "Edit Person", path: "/editPerson" },
  ];
  const { show } = useAppContext();
  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const indianStatesKeyValuePairs = indianStates.map((state) => ({
    value: state,
    label: state,
  }));

  const changeHandler = (field, e) => {
    if (field === "gender") setGender(e.value);
    if (field === "state") setState(e.value);
    if (field === "profile") setProfile(e.value);
  };

  const handleUpdate = () => {
    dispatch(
      update_lead({
        name,
        mobile,
        email,
        gender,
        dob,
        profile,
        state,
        address,
        experience,
        current_salary,
        expected_salary,
        last_company,
        id,
      })
    );
  };

  useEffect(() => {
    if (update_lead_data?.isSuccess) {
      toast.success("Lead updated successfully");
      dispatch(clear_update_lead_state());
      navigate("/interviewLead");
    }
    if (update_lead_data?.isError) {
      toast.error(update_lead_data?.error?.message);
      dispatch(clear_update_lead_state());
    }
  }, [update_lead_data]);

  return permissions?.can_view ? (
    <section>
      <div
        className={`wrapper gray_bg admin_outer ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="employee_wrapper cmn_padding_outer">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />
          <div className="cmn_border px-4 pt-2 pb-4">
            <div className="row">
              <div className="col-lg-4 col-sm-12 col-md-6">
                <InputField
                  labelname={"Full Name"}
                  span={true}
                  placeholder={"Enter Full Name"}
                  classname={"new_employee_form_group"}
                  type={"text"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <InputField
                  labelname={"Phone Number"}
                  span={true}
                  placeholder={"Enter Phone Number"}
                  classname={"new_employee_form_group"}
                  type={"number"}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <InputField
                  labelname={"Email Address"}
                  span={true}
                  placeholder={"Enter Email Address"}
                  classname={"new_employee_form_group"}
                  type={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <div className="form-group new_employee_form_group">
                  <label>
                    Select Gender <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="mt-2">
                    <CustomSelectComp
                      placeholder={"Select Gender"}
                      optionsData={options}
                      changeHandler={(e) => changeHandler("gender", e)}
                      value={gender}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <InputField
                  labelname={"DOB"}
                  span={true}
                  placeholder={"Select DOB"}
                  classname={"new_employee_form_group"}
                  type={"date"}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <InputField
                  labelname={"Experience "}
                  placeholder={"Enter Experience"}
                  classname={"new_employee_form_group"}
                  type={"number"}
                  value={experience}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setExperience(value);
                    }
                  }}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <InputField
                  labelname={"Current salary (optional)"}
                  placeholder={"Enter Current salary"}
                  classname={"new_employee_form_group"}
                  type={"text"}
                  value={current_salary}
                  onChange={(e) => setCurrent_salary(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <InputField
                  labelname={"Expected salary (optional)"}
                  placeholder={"Enter Expected salary"}
                  classname={"new_employee_form_group"}
                  type={"text"}
                  value={expected_salary}
                  onChange={(e) => setExpected_salary(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <div className="form-group new_employee_form_group">
                  <label>
                    Profile <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="mt-2">
                    <CustomSelectComp
                      placeholder={"Select profile"}
                      optionsData={ProfileData}
                      changeHandler={(e) => changeHandler("profile", e)}
                      value={profile}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <InputField
                  labelname={"Last Company (optional)"}
                  placeholder={"Enter Last Company Name"}
                  classname={"new_employee_form_group"}
                  type={"text"}
                  value={last_company}
                  onChange={(e) => setLast_company(e.target.value)}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <div className="form-group new_employee_form_group">
                  <label>
                    State <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="mt-2">
                    <CustomSelectComp
                      placeholder={"Select State"}
                      optionsData={indianStatesKeyValuePairs}
                      changeHandler={(e) => changeHandler("state", e)}
                      value={state}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group new_employee_form_group">
              <label>
                House Address <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                className="form-control mt-2"
                placeholder="Enter Address"
                rows={5}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="d-flex gap-2 mt-4 justify-content-end exit_save_btn_outer">
              <button
                className="cmn_Button_style cmn_darkgray_btn"
                onClick={() => navigate("/interviewLead")}
              >
                Exit
              </button>
              {permissions?.can_update && (
                <button
                  className="cmn_Button_style"
                  onClick={() => handleUpdate()}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <UnauthorizedPage />
  );
};

export default EditPerson;
