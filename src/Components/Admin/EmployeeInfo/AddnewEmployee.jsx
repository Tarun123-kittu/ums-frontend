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
import validator from "validator";

const AddnewEmployee = () => {
  const dispatch = useDispatch();
  const { show } = useAppContext();
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  console.log(selectedDocuments, "get_employeesss");
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

  useEffect(() => {
    if (localStorage.getItem("roles")?.includes("Employee")) {
      navigate("/mark-attendence");
    }
  }, [navigate]);

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

  const [missingData, setMissingData] = useState({
    username: false,
    name: false,
    email: false,
    mobile: false,
    position: false,
    department: false,
    dob: false,
    doj: false,
    status: false,
    gender: false,
    role: false,
    confirm_password: false,
    password: false,
  });
  console.log(missingData, "this is the missing data");

  const [field_data, setField_date] = useState({
    username: "",
    email: "",
    name: "",
    mobile: "",
    emergency_contact: "",
    emergency_contact_relationship: "",
    emergency_contact_name: "",
    bank_name: "",
    account_number: "",
    ifsc: "",
    increment_date: null,
    gender: "",
    dob: null,
    doj: null,
    skype_email: "",
    ultivic_email: "",
    salary: "",
    security: "",
    total_security: "",
    installments: "",
    position: "",
    department: "",
    status: "",
    address: "",
    role: "",
    confirm_password: "",
    password: "",
    documents: selectedDocuments,
  });

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

  const handleInputChange = (name, value) => {
    if (name === "mobile" || name === "emergency_contact") {
      value = value.replace(/\D/g, "");
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
    }

    if (
      name === "salary" ||
      name === "security" ||
      name === "total_security" ||
      name === "account_number"
    ) {
      if (value < 0) {
        return;
      }
    }

    setField_date({
      ...field_data,
      [name]: value,
    });
  };

  const handleSaveUser = (e) => {
    e.preventDefault();

    const emails = [
      { field: field_data?.email, name: "email" },
      { field: field_data?.skype_email, name: "skype_email" },
      { field: field_data?.ultivic_email, name: "ultivic_email" },
    ];

    for (const { field, name } of emails) {
      if (field && !validator.isEmail(field)) {
        toast.error(`${name} is not valid`);
        return;
      }
    }

    handleSave();
  };

  const handleSave = () => {
    const optionalFields = [
      "emergency_contact",
      "emergency_contact_relationship",
      "emergency_contact_name",
      "bank_name",
      "account_number",
      "ifsc",
      "increment_date",
      "skype_email",
      "ultivic_email",
      "salary",
      "security",
      "total_security",
      "installments",
      "address",
      "role",
      "documents",
    ];

    const missingFields = Object.entries(field_data)
      .filter(([key, value]) => {
        if (optionalFields.includes(key)) {
          return false;
        }
        return typeof value === "string" ? value.trim() === "" : value === null;
      })
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.log(missingFields);

      setMissingData((prevState) => ({
        ...prevState,
        username: missingFields.includes("username"),
        name: missingFields.includes("name"),
        email: missingFields.includes("email"),
        mobile: missingFields.includes("mobile"),
        gender: missingFields.includes("gender"),
        dob: missingFields.includes("dob"),
        doj: missingFields.includes("doj"),
        position: missingFields.includes("position"),
        department: missingFields.includes("department"),
        confirm_password: missingFields.includes("confirm_password"),
        password: missingFields.includes("password"),
        status: missingFields.includes("status"),
      }));
    } else {
      dispatch(create_new_user({ field_data }));
    }
  };

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
    if (field_data?.documents.includes(name)) {
      const updatedDocuments = field_data.documents.filter(
        (doc) => doc !== name
      );
      setSelectedDocuments(updatedDocuments);
      setField_date({
        ...field_data,
        documents: updatedDocuments,
      });
    } else {
      const updatedDocuments = [...field_data.documents, name];
      setSelectedDocuments(updatedDocuments);
      setField_date({
        ...field_data,
        documents: updatedDocuments,
      });
    }
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
                    value={field_data.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    styleTrue={missingData?.name}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Email"}
                    span={true}
                    placeholder={"Email of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    styleTrue={missingData?.email}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Mobile"}
                    span={true}
                    placeholder={"Mobile of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.mobile}
                    onChange={(e) =>
                      handleInputChange("mobile", e.target.value)
                    }
                    styleTrue={missingData?.mobile}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Emergency Contact Relationship "}
                    placeholder={"Relationship of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.emergency_contact_relationship}
                    onChange={(e) =>
                      handleInputChange(
                        "emergency_contact_relationship",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Emergency Contact Name"}
                    placeholder={"Emergency Contact Name"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.emergency_contact_name}
                    onChange={(e) =>
                      handleInputChange(
                        "emergency_contact_name",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Emergency Contact"}
                    placeholder={"Emergency mobile no of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.emergency_contact}
                    onChange={(e) =>
                      handleInputChange("emergency_contact", e.target.value)
                    }
                  />
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Bank Name"}
                    placeholder={"Bank Name"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.bank_name}
                    onChange={(e) =>
                      handleInputChange("bank_name", e.target.value)
                    }
                  />
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Account Number"}
                    placeholder={"Account Number"}
                    classname={"new_employee_form_group"}
                    type={"number"}
                    value={field_data.account_number}
                    onChange={(e) =>
                      handleInputChange("account_number", e.target.value)
                    }
                  />
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"IFCE"}
                    placeholder={"Bank IFCE Code"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.ifsc}
                    onChange={(e) => handleInputChange("ifsc", e.target.value)}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label htmlFor="">Increment Date</label>
                    <DatePicker
                      selected={
                        field_data.increment_date && field_data.increment_date
                      }
                      onSelect={(date) => {
                        if (
                          date instanceof Date &&
                          !isNaN(date) &&
                          date <= getMaxDate()
                        ) {
                          handleInputChange("increment_date", date);
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
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Gender </label>
                    <div
                      className="mt-2"
                      style={
                        missingData?.gender
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <CustomSelectComp
                        optionsData={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                        changeHandler={(e) =>
                          handleInputChange("gender", e.value)
                        }
                        value={field_data.gender}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group ">
                    <label htmlFor="">Date of Birth</label>
                    <div
                      style={
                        missingData?.dob
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <DatePicker
                        selected={field_data.dob}
                        onChange={(date) => handleInputChange("dob", date)}
                        placeholderText="DD/MM/YYYY"
                        onKeyDown={(e) => e.preventDefault()}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group ">
                    <label htmlFor="">Date of joining </label>
                    <div
                      style={
                        missingData?.doj
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <DatePicker
                        className={"form-control"}
                        selected={field_data.doj}
                        onChange={(date) => handleInputChange("doj", date)}
                        placeholderText="DD/MM/YYYY"
                        onKeyDown={(e) => e.preventDefault()}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Skype"}
                    placeholder={"Skype"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.skype_email}
                    onChange={(e) =>
                      handleInputChange("skype_email", e.target.value)
                    }
                  />
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Ultivic Email"}
                    placeholder={"Ultivic Email"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.ultivic_email}
                    onChange={(e) =>
                      handleInputChange("ultivic_email", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    isRequred={true}
                    symbol={"₹"}
                    labelname={"Salary"}
                    placeholder={"Salary"}
                    classname={"new_employee_form_group"}
                    type={"number"}
                    value={field_data.salary}
                    onChange={(e) =>
                      handleInputChange("salary", e.target.value)
                    }
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
                    value={field_data.security}
                    onChange={(e) =>
                      handleInputChange("security", e.target.value)
                    }
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
                    value={field_data.total_security}
                    onChange={(e) =>
                      handleInputChange("total_security", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Installment</label>
                    <div className="mt-2">
                      <CustomSelectComp
                        optionsData={installmentObj}
                        changeHandler={(e) =>
                          handleInputChange("installments", e.value)
                        }
                        value={field_data.installments}
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
                        missingData?.position
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <CustomSelectComp
                        optionsData={positionData}
                        changeHandler={(e) =>
                          handleInputChange("position", e.value)
                        }
                        value={field_data.position}
                      />
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
                        missingData?.department
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <CustomSelectComp
                        optionsData={ProfileData}
                        changeHandler={(e) =>
                          handleInputChange("department", e.value)
                        }
                        value={field_data.department}
                      />
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
                        missingData?.status
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <CustomSelectComp
                        optionsData={statusObj}
                        changeHandler={(e) =>
                          handleInputChange("status", e.value)
                        }
                        value={field_data.status}
                      />
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
                    value={field_data.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    styleTrue={missingData?.username}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Password"}
                    placeholder={"Password"}
                    classname={"new_employee_form_group"}
                    type={"password"}
                    value={field_data.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    styleTrue={missingData?.password}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Confirm Password"}
                    placeholder={"Confirm Password"}
                    classname={"new_employee_form_group"}
                    type={"password"}
                    value={field_data.confirm_password}
                    onChange={(e) =>
                      handleInputChange("confirm_password", e.target.value)
                    }
                    styleTrue={missingData?.confirm_password}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Role</label>
                    <div className="mt-2">
                      <CustomSelectComp
                        optionsData={role}
                        changeHandler={(e) =>
                          handleInputChange("role", e.value)
                        }
                        value={field_data.role}
                      />
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
                  value={field_data.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  style={
                    missingData?.username ? { border: "1px solid red" } : {}
                  }
                />
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
                  onClick={(e) => handleSaveUser(e)}
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
