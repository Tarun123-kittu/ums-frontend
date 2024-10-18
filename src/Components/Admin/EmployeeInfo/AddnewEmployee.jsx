import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import InputField from "../../Common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "./employee.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  create_new_user,
  clear_create_user_state,
} from "../../../utils/redux/userSlice/createNewUserSlice";
import CustomSelectComp from "../../Common/CustomSelectComp";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import { ProfileData } from "../../Utils/customData/profileData";
import { get_all_roles } from "../../../utils/redux/rolesAndPermissionSlice/getAllRoles";
import UserValidations from "../../Utils/UserValidations";

const AddnewEmployee = () => {
  const dispatch = useDispatch();
  const { show } = useAppContext();
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const obj = [
    { name: "Employees", path: "/employee" },
    { name: "Add New Employees", path: "/addemployee" },
  ];
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  const roles = useSelector((store) => store.ALL_ROLES);

  useEffect(() => {
    dispatch(get_all_roles());
  }, []);

  useEffect(() => {
    if (roles?.isSuccess) {
      if (roles?.data?.data?.length !== 0) {
        roles.data.data.forEach((data) => {
          const shouldAddAdmin =
            !user_all_permissions?.roles_data?.includes("HR") ||
            data?.role !== "Admin";
          if (
            shouldAddAdmin &&
            !role.some((item) => item.value === data?.role)
          ) {
            role.push({ value: data?.role, label: data?.role });
          }
        });
      }
    }
  }, [roles, user_all_permissions]);

  const installmentObj = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  const positionData = [
    { value: "INTERN", label: "Intern" },
    { value: "TRAINEE", label: "Trainee" },
    { value: "JRDEVELOPER", label: "Jr Developer" },
    { value: "SRDEVELOPER", label: "Sr Developer" },
    { value: "PROJECTMANAGER", label: "Project Manager" },
    { value: "HR", label: "HR" },
    { value: "TESTER", label: "Tester" },
    { value: "BDE", label: "BDE" },
    { value: "TEAMLEAD", label: "Team Lead" },
  ];

  const statusObj = [
    { value: 0, label: "Terminated" },
    { value: 1, label: "OnProbation" },
    { value: 2, label: "Confirmed" },
    { value: 3, label: "Resignation" },
    { value: 4, label: "None" },
  ];

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [emergency_contact, setEmergencyContact] = useState("");
  const [emergency_contact_relationship, setEmergencyContactRelationship] =
    useState("");
  const [emergency_contact_name, setEmergencyContactName] = useState("");
  const [bank_name, setBankName] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [increment_date, setIncrementDate] = useState(null);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [doj, setDoj] = useState(null);
  const [skype_email, setSkypeEmail] = useState("");
  const [ultivic_email, setUltivicEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [security, setSecurity] = useState("");
  const [total_security, setTotalSecurity] = useState("");
  const [installments, setInstallments] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [selected_role, setSelected_role] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [Alldocuments, setAllDocuments] = useState(selectedDocuments);
  const [validationErrors, setValidationErrors] = useState({});
  console.log(validationErrors, "this is the validation error");

  const is_user_created = useSelector((store) => store.CREATE_NEW_USER);

  useEffect(() => {
    if (is_user_created?.isSuccess) {
      toast.success(is_user_created?.message?.message, {
        autoClose: 2000,
      });
      navigate("/employee");
      dispatch(clear_create_user_state());
    }
    if (is_user_created?.isError) {
      toast.error(is_user_created?.error?.message, {
        autoClose: 2000,
      });
      dispatch(clear_create_user_state());
    }
  }, [is_user_created]);

  const handleSaveUser = (
    e,
    name,
    email,
    mobile,
    emergency_contact_relationship,
    emergency_contact_name,
    emergency_contact,
    bank_name,
    account_number,
    ifsc,
    increment_date,
    gender,
    dob,
    doj,
    skype_email,
    ultivic_email,
    salary,
    security,
    total_security,
    installments,
    position,
    department,
    status,
    username,
    password,
    confirm_password,
    role,
    address,
    selectedDocuments
  ) => {
    e.preventDefault();
    const checkValidations = UserValidations(
      name,
      email,
      mobile,
      emergency_contact_relationship,
      emergency_contact_name,
      emergency_contact,
      bank_name,
      account_number,
      ifsc,
      increment_date,
      gender,
      dob,
      doj,
      skype_email,
      ultivic_email,
      salary,
      security,
      total_security,
      installments,
      position,
      department,
      status,
      username,
      password,
      confirm_password,
      role,
      address,
      selectedDocuments
    );

    if (Object.keys(checkValidations).length === 0) {
      create_new_user({
        name,
        email,
        mobile,
        emergency_contact_relationship,
        emergency_contact_name,
        emergency_contact,
        bank_name,
        account_number,
        ifsc,
        increment_date,
        gender,
        dob,
        doj,
        skype_email,
        ultivic_email,
        salary,
        security,
        total_security,
        installments,
        position,
        department,
        status,
        username,
        password,
        confirm_password,
        role,
        address,
        selectedDocuments,
      });
    } else {
      setValidationErrors(checkValidations); // Ensure this function is defined in your component
    }
  };

  // const handleInputChange = (name, value) => {
  //   if (name === "mobile" || name === "emergency_contact") {
  //     value = value.replace(/\D/g, "");
  //     if (value.length > 10) {
  //       value = value.slice(0, 10);
  //     }
  //   }

  //   if (
  //     name === "salary" ||
  //     name === "security" ||
  //     name === "total_security" ||
  //     name === "account_number"
  //   ) {
  //     if (value < 0) {
  //       return;
  //     }
  //   }

  //   setField_date({
  //     ...field_data,
  //     [name]: value,
  //   });
  // };

  // const handleSaveUser = (e) => {
  //   e.preventDefault();

  //   const emails = [
  //     { field: field_data?.email, name: "email" },
  //     { field: field_data?.skype_email, name: "skype_email" },
  //     { field: field_data?.ultivic_email, name: "ultivic_email" },
  //   ];

  //   for (const { field, name } of emails) {
  //     if (field && !validator.isEmail(field)) {
  //       toast.error(`${name} is not valid`);
  //       return;
  //     }
  //   }

  //   handleSave();
  // };

  // const handleSave = () => {
  //   const optionalFields = [
  //     "emergency_contact",
  //     "emergency_contact_relationship",
  //     "emergency_contact_name",
  //     "bank_name",
  //     "account_number",
  //     "ifsc",
  //     "increment_date",
  //     "skype_email",
  //     "ultivic_email",
  //     "salary",
  //     "security",
  //     "total_security",
  //     "installments",
  //     "address",
  //     "role",
  //     "documents",
  //   ];

  //   const missingFields = Object.entries(field_data)
  //     .filter(([key, value]) => {
  //       if (optionalFields.includes(key)) {
  //         return false;
  //       }
  //       return typeof value === "string" ? value.trim() === "" : value === null;
  //     })
  //     .map(([key]) => key);

  //   if (missingFields.length > 0) {
  //     console.log(missingFields);

  //     setvalidationErrors((prevState) => ({
  //       ...prevState,
  //       username: missingFields.includes("username"),
  //       name: missingFields.includes("name"),
  //       email: missingFields.includes("email"),
  //       mobile: missingFields.includes("mobile"),
  //       gender: missingFields.includes("gender"),
  //       dob: missingFields.includes("dob"),
  //       doj: missingFields.includes("doj"),
  //       position: missingFields.includes("position"),
  //       department: missingFields.includes("department"),
  //       confirm_password: missingFields.includes("confirm_password"),
  //       password: missingFields.includes("password"),
  //       status: missingFields.includes("status"),
  //     }));
  //   } else {
  //     dispatch(create_new_user({ field_data }));
  //   }
  // };

  const getMaxDate = () => {
    const today = new Date();
    const nextYear = new Date(today.setFullYear(today.getFullYear() + 1));
    return nextYear;
  };

  if (
    !(
      user_all_permissions?.roles_data?.includes("Admin") ||
      user_all_permissions?.roles_data?.includes("HR")
    )
  ) {
    return <UnauthorizedPage />;
  }

  const documents = [
    { id: 1, name: "Aadhar Card" },
    { id: 2, name: "PAN Card" },
    { id: 3, name: "Qualification" },
    { id: 4, name: "Experience" },
    { id: 5, name: "Bank Statement" },
    { id: 6, name: "Training Certificate" },
  ];

  const handleCheckboxChange = (name) => {
    if (documents.includes(name)) {
      const updatedDocuments = documents.filter((doc) => doc !== name);
      setSelectedDocuments(updatedDocuments);
      setSelectedDocuments({
        ...selectedDocuments,
        updatedDocuments,
      });
    } else {
      const updatedDocuments = [...selectedDocuments, name];
      setSelectedDocuments(updatedDocuments);
      setSelectedDocuments({
        ...selectedDocuments,
        updatedDocuments,
      });
    }
  };

  const handleGender = (e) => {
    setGender(e.value);
  };

  return (
    <section className="add_new_emp_container">
      <div
        className={`wrapper admin_outer gray_bg ${show ? "cmn_margin" : ""}`}
      >
        <Notification />
        <div className="cmn_padding_outer">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />
          <div className="new_employee_wrapper cmn_border">
            <form>
              <div className="row">
                <div className="col-lg-4 col-sm-12 col-md-12" id="name">
                  <InputField
                    labelname={"Name"}
                    span={true}
                    placeholder={"Name of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {validationErrors?.name}
                  </span>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Email"}
                    span={true}
                    placeholder={"Email of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    styleTrue={validationErrors?.email}
                  />
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {validationErrors?.email}
                  </span>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Mobile"}
                    span={true}
                    placeholder={"Mobile of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={mobile}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (/^\d*$/.test(newValue)) {
                        setMobile(newValue);
                      }
                    }}
                  />

                  <span style={{ color: "red", fontSize: "13px" }}>
                    {validationErrors?.mobile}
                  </span>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Emergency Contact Relationship "}
                    placeholder={"Relationship of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={emergency_contact_relationship}
                    onChange={(e) =>
                      setEmergencyContactRelationship(e.target.value)
                    }
                  />
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {validationErrors?.emergency_contact_relationship}
                  </span>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Emergency Contact Name"}
                    placeholder={"Emergency Contact Name"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={emergency_contact_name}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Emergency Contact"}
                    placeholder={"Emergency mobile no of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={emergency_contact}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (/^\d*$/.test(newValue)) {
                        setEmergencyContact(newValue);
                      }
                    }}
                  />
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {validationErrors?.emergency_contact}
                  </span>
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Bank Name"}
                    placeholder={"Bank Name"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={bank_name}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Account Number"}
                    placeholder={"Account Number"}
                    classname={"new_employee_form_group"}
                    type={"number"}
                    value={account_number}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (/^\d*$/.test(newValue)) {
                        setAccountNumber(newValue);
                      }
                    }}
                  />
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"IFCE"}
                    placeholder={"Bank IFCE Code"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label htmlFor="">Increment Date</label>
                    <DatePicker
                      selected={increment_date && increment_date}
                      onSelect={(date) => {
                        if (
                          date instanceof Date &&
                          !isNaN(date) &&
                          date <= getMaxDate()
                        ) {
                          setIncrementDate(date);
                        } else {
                          alert("Invalid date. Please select a valid date.");
                        }
                      }}
                      placeholderText="DD/MM/YYYY"
                      onKeyDown={(e) => e.preventDefault()}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      maxDate={getMaxDate()}
                      minDate={new Date()}
                      className="form-control"
                    />
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {validationErrors?.increment_date}
                    </span>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Gender </label>
                    <div
                      className="mt-2"
                      style={
                        validationErrors?.gender
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <CustomSelectComp
                        optionsData={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                        changeHandler={(e) => handleGender(e)}
                        value={gender}
                      />
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {validationErrors?.gender}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group ">
                    <label htmlFor="">Date of Birth</label>
                    <div
                      style={
                        validationErrors?.dob
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <DatePicker
                        selected={dob}
                        onChange={(date) => setDob(date)}
                        placeholderText="DD/MM/YYYY"
                        onKeyDown={(e) => e.preventDefault()}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        className="form-control"
                      />
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {validationErrors?.dob}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group ">
                    <label htmlFor="">Date of joining </label>
                    <div
                      style={
                        validationErrors?.doj
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <DatePicker
                        className={"form-control"}
                        selected={doj}
                        onChange={(date) => setDoj(date)}
                        placeholderText="DD/MM/YYYY"
                        onKeyDown={(e) => e.preventDefault()}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                      />
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {validationErrors?.doj}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Skype"}
                    placeholder={"Skype"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={skype_email}
                    onChange={(e) => setSkypeEmail(e.target.value)}
                  />
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {validationErrors?.skype_email}
                  </span>
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Ultivic Email"}
                    placeholder={"Ultivic Email"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={ultivic_email}
                    onChange={(e) => setUltivicEmail(e.target.value)}
                  />
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {validationErrors?.ultivic_email}
                  </span>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    isRequred={true}
                    symbol={"₹"}
                    labelname={"Salary"}
                    placeholder={"Salary"}
                    classname={"new_employee_form_group"}
                    type={"number"}
                    value={salary}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue === "" || parseFloat(newValue) >= 0) {
                        setSalary(newValue);
                      }
                    }}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    isRequred={true}
                    symbol={"%"}
                    labelname={"Security"}
                    placeholder={"Security"}
                    classname={"new_employee_form_group"}
                    type={"number"}
                    value={security}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue === "" || parseFloat(newValue) >= 0) {
                        setSecurity(newValue);
                      }
                    }}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    isRequred={true}
                    symbol={"₹"}
                    labelname={"Total Security"}
                    placeholder={"Security"}
                    classname={"new_employee_form_group"}
                    type={"number"}
                    value={total_security}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue === "" || parseFloat(newValue) >= 0) {
                        setTotalSecurity(newValue);
                      }
                    }}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Installment</label>
                    <div className="mt-2">
                      <CustomSelectComp
                        optionsData={installmentObj}
                        changeHandler={(e) => setInstallments(e.value)}
                        value={installments}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>
                      Position <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                      className="mt-2"
                      style={
                        validationErrors?.position
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <CustomSelectComp
                        optionsData={positionData}
                        changeHandler={(e) => setPosition(e.value)}
                        value={position}
                      />
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {validationErrors?.position}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>
                      Technology/Department{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                      className="mt-2"
                      style={
                        validationErrors?.department
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <CustomSelectComp
                        optionsData={ProfileData}
                        changeHandler={(e) => setDepartment(e.value)}
                        value={department}
                      />
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {validationErrors?.department}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>
                      {" "}
                      Status <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                      className="mt-2"
                      style={
                        validationErrors?.status
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <CustomSelectComp
                        optionsData={statusObj}
                        changeHandler={(e) => setStatus(e.value)}
                        value={status}
                      />
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {validationErrors?.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    span={true}
                    labelname={"Username"}
                    placeholder={"Username"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    styleTrue={validationErrors?.username}
                  />
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {validationErrors?.username}
                  </span>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Password"}
                    placeholder={"Password"}
                    classname={"new_employee_form_group"}
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    styleTrue={validationErrors?.password}
                  />
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {validationErrors?.password}
                  </span>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Confirm Password"}
                    placeholder={"Confirm Password"}
                    classname={"new_employee_form_group"}
                    type={"password"}
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    styleTrue={validationErrors?.confirm_password}
                  />
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {validationErrors?.confirm_password}
                  </span>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Role</label>
                    <div className="mt-2">
                      <CustomSelectComp
                        optionsData={role}
                        changeHandler={(e) => setSelected_role(e.value)}
                        value={selected_role}
                      />
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {validationErrors?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group new_employee_form_group">
                <label>Address</label>
                <textarea
                  className="form-control mt-3"
                  placeholder="Address"
                  rows={5}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={
                    validationErrors?.username
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {validationErrors?.address}
                </span>
              </div>

              <div className="text-end mt-3"></div>
              <div className="table-responsive mt-4 transparent_bg">
                <table className="employee_detail_table mt-3">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Document Name</th>
                      <th>Checked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id}>
                        <td>{doc.id}</td>
                        <td>{doc.name}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedDocuments.includes(doc.name)}
                            onChange={() => handleCheckboxChange(doc.name)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-end mt-3">
                <button
                  className="cmn_Button_style"
                  onClick={(e) =>
                    handleSaveUser(
                      e,
                      name,
                      email,
                      mobile,
                      emergency_contact_relationship,
                      emergency_contact_name,
                      emergency_contact,
                      bank_name,
                      account_number,
                      ifsc,
                      increment_date,
                      gender,
                      dob,
                      doj,
                      skype_email,
                      ultivic_email,
                      salary,
                      security,
                      total_security,
                      installments,
                      position,
                      department,
                      status,
                      username,
                      password,
                      confirm_password,
                      role,
                      address,
                      selectedDocuments
                    )
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddnewEmployee;
