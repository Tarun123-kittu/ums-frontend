import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Utils/appContecxt";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import InputField from "../../Common/InputField";
import Notification from "../Notification/Notification";
import CustomSelectComp from "../../Common/CustomSelectComp";
import { useDispatch, useSelector } from "react-redux";
import {
  add_interview_leads,
  clear_interview_leads_state,
} from "../../../utils/redux/interviewLeadsSlice/addLeads";
import { indianStates } from "../../Utils/customData/statesData";
import { ProfileData } from "../../Utils/customData/profileData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import { get_all_languages } from "../../../utils/redux/testSeries/getAllLanguages";

const AddNewPerson = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const obj = [
    { name: "Interview Lead", path: "/interviewLead" },
    { name: "Add Person", path: "/addPerson" },
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
  const add_lead_state = useSelector((state) => state.ADD_INTERVIEW_LEADS);
  const languages = useSelector((store) => store.ALL_LANGUAGES?.data?.data);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  useEffect(() => {
    dispatch(get_all_languages());
  }, []);

  useEffect(() => {
    if (localStorage.getItem("roles")?.includes("Employee")) {
      navigate("/mark-attendence");
    }
  }, [navigate]);

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
  const [all_languagages, setAll_languages] = useState([]);

  const changeHandler = (field, e) => {
    if (field === "gender") setGender(e.value);
    if (field === "state") setState(e.value);
    if (field === "profile") setProfile(e.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (
      name &&
      mobile &&
      email &&
      gender &&
      dob &&
      profile &&
      state &&
      address &&
      experience
    ) {
      dispatch(
        add_interview_leads({
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
        })
      );
    } else {
      toast.error("All fields are required");
    }
  };

  useEffect(() => {
    if (add_lead_state?.isSuccess) {
      toast.success("Lead created successfully");
      dispatch(clear_interview_leads_state());
      navigate("/interviewLead");
    }
    if (add_lead_state?.isError) {
      toast.error(add_lead_state?.error?.message);
      dispatch(clear_interview_leads_state());
    }
  }, [add_lead_state]);

  useEffect(() => {
    if (languages?.length !== 0) {
      languages?.forEach((data) => {
        if (!all_languagages.some((item) => item.value === data?.id)) {
          all_languagages.push({
            value: data?.id,
            label: data?.language,
          });
        }
      });
    }
  }, [languages]);

  if (
    !(
      user_all_permissions?.roles_data?.includes("Admin") ||
      user_all_permissions?.roles_data?.includes("HR")
    )
  ) {
    return <UnauthorizedPage />;
  }

  return (
    <section>
      <div
        className={` gray_bg admin_outer ${show ? "cmn_margin" : ""}`}
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
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue === "" || parseFloat(newValue) >= 0) {
                      setMobile(newValue);
                    }
                  }}
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
                  type={"number"}
                  value={current_salary}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setCurrent_salary(value);
                    }
                  }}
                />
              </div>
              <div className="col-lg-4 col-sm-12 col-md-6">
                <InputField
                  labelname={"Expected salary (optional)"}
                  placeholder={"Enter Expected salary"}
                  classname={"new_employee_form_group"}
                  type={"number"}
                  value={expected_salary}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setExpected_salary(value);
                    }
                  }}
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
                      optionsData={all_languagages}
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
              <button
                className="cmn_Button_style"
                onClick={(e) => {
                  handleSave(e);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddNewPerson;
