import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import InputField from "../../Common/InputField";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import toast from "react-hot-toast";
import "./employee.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  update_user,
  clear_update_user_state,
} from "../../../utils/redux/userSlice/updateUserSlice";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import { ProfileData } from "../../Utils/customData/profileData";
import { get_all_roles } from "../../../utils/redux/rolesAndPermissionSlice/getAllRoles";
import validator from "validator";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";

const EditEmployeeInfo = () => {
  const { show } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const permissions = UsePermissions("Users");
  const obj = [{ name: "Employees", path: "/employee" }];
  const { user_details, documents } = location?.state
    ? location?.state
    : location;

  useEffect(() => {
    dispatch(get_all_roles());
  }, []);

  useEffect(() => {
    if (
      !user_details ||
      typeof user_details !== "object" ||
      Array.isArray(user_details)
    ) {
      navigate("/employee");
    }
  }, [user_details]);

  let [id, setId] = useState(user_details?.id);
  let [account_number, setAccountNumber] = useState(
    user_details?.account_number
  ); // String
  let [address, setAddress] = useState(user_details?.address);
  let [bank_name, setBankName] = useState(user_details?.bank_name);
  let [department, setDepartment] = useState(user_details?.department);
  let [dob, setDob] = useState(new Date(user_details?.dob));
  let [doj, setDoj] = useState(new Date(user_details?.doj));
  let [email, setEmail] = useState(user_details?.email);
  let [emergency_contact, setEmergencyContact] = useState(
    user_details?.emergency_contact
  );
  let [emergency_contact_name, setEmergencyContactName] = useState(
    user_details?.emergency_contact_name
  );
  let [emergency_contact_relationship, setEmergencyContactRelationship] =
    useState(user_details?.emergency_contact_relationship);
  let [gender, setGender] = useState(user_details?.gender);
  let [ifsc, setIfsc] = useState(user_details?.ifsc);
  let [increment_date, setIncrementDate] = useState(
    new Date(user_details?.increment_date)
  );
  let [installments, setInstallments] = useState(user_details?.installments);
  let [mobile, setMobile] = useState(user_details?.mobile);
  let [name, setName] = useState(user_details?.name);
  let [position, setPosition] = useState(user_details?.position);
  let [role, setRole] = useState(user_details?.role);
  let [salary, setSalary] = useState(user_details?.salary);
  let [security, setSecurity] = useState(user_details?.security);
  let [skype_email, setSkypeEmail] = useState(user_details?.skype_email);
  let [status, setStatus] = useState(user_details?.status);
  let [total_security, setTotalSecurity] = useState(
    user_details?.total_security
  );
  let [ultivic_email, setUltivicEmail] = useState(user_details?.ultivic_email);
  let [username, setUsername] = useState(user_details?.username);
  let [selected_documents, setSelected_documents] = useState([]);

  const update_user_details = useSelector((store) => store.UPDATE_USER);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );
  const roles = useSelector((store) => store.ALL_ROLES);

  useEffect(() => {
    if (update_user_details?.isSuccess) {
      toast.success("User updated Successfully");
      dispatch(clear_update_user_state());
      navigate("/employee");
    }

    if (update_user_details?.isError) {
      toast.error(update_user_details?.error?.message);
      dispatch(clear_update_user_state());
    }
  }, [update_user_details]);

  useEffect(() => {
    if (documents?.data?.data?.length > 0) {
      let newArr = [];
      documents.data.data.map((data) => {
        const documentName = data.document_name;
        if (!newArr.includes(documentName)) {
          newArr.push(documentName);
        }
      });
      console.log(newArr, "this is the new Arr");
      setSelected_documents(newArr);
    }
  }, [documents]);

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

  const handleUpdate = (e) => {
    e.preventDefault();

    const optionalFields = [
      "emergency_contact",
      "emergency_contact_relationship",
      "emergency_contact_name",
      "bank_name",
      "account_number",
      "ifsc",
      "increment_date",
      "gender",
      "dob",
      "doj",
      "skype_email",
      "ultivic_email",
      "salary",
      "security",
      "total_security",
      "installments",
      "address",
    ];

    const field_data = {
      name,
      username,
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
      address,
      documents: selected_documents,
    };

    const missingFields = Object.entries(field_data)
      .filter(([key, value]) => {
        if (optionalFields.includes(key)) {
          return false;
        }
        return typeof value === "string" ? value.trim() === "" : value === null;
      })
      .map(([key]) => key);

    // Validate email fields
    const invalidEmails = [];
    if (field_data.skype_email && !validator.isEmail(field_data.skype_email)) {
      invalidEmails.push("Skype Email");
    }
    if (
      field_data.ultivic_email &&
      !validator.isEmail(field_data.ultivic_email)
    ) {
      invalidEmails.push("Ultivic Email");
    }
    if (field_data.email && !validator.isEmail(field_data.email)) {
      invalidEmails.push("Email");
    }

    // Check if there are invalid emails
    if (invalidEmails.length > 0) {
      toast.error(`Invalid ${invalidEmails.join(", ")}`);
    } else if (missingFields.length > 0) {
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
      dispatch(
        update_user({
          ...field_data,
          id,
        })
      );
    }
  };

  if (
    !(
      user_all_permissions?.roles_data?.includes("Admin") ||
      user_all_permissions?.roles_data?.includes("HR")
    )
  ) {
    return <UnauthorizedPage />;
  }

  const documentsName = [
    { id: 1, name: "Aadhar Card" },
    { id: 2, name: "PAN Card" },
    { id: 3, name: "Qualification" },
    { id: 4, name: "Experience" },
    { id: 5, name: "Bank Statement" },
    { id: 6, name: "Training Certificate" },
  ];

  const handleCheckboxChange = (documentName) => {
    setSelected_documents((prevSelected) => {
      if (prevSelected.includes(documentName)) {
        return prevSelected.filter((item) => item !== documentName);
      } else {
        return [...prevSelected, documentName];
      }
    });
  };

  return permissions?.can_view ? (
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
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Name"}
                    span={true}
                    placeholder={"Name of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={mobile}
                    onChange={(e) => {
                      let input = e.target.value;
                      input = input.replace(/\D/g, "");
                      if (input.length > 10) {
                        input = input.slice(0, 10);
                      }
                      setMobile(input);
                    }}
                    styleTrue={missingData?.mobile}
                  />
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
                    onChange={(e) => setEmergencyContact(e.target.value)}
                  />
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
                      const value = Number(e.target.value);
                      if (value >= 0) {
                        setAccountNumber(value);
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
                      selected={increment_date}
                      onChange={(date) => setIncrementDate(date)}
                      placeholderText="DD/MM/YYYY"
                      onKeyDown={(e) => e.preventDefault()}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Gender </label>
                    <select
                      className="form-control"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      style={
                        missingData?.gender
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <option>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
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
                        selected={dob}
                        onChange={(date) => setDob(date)}
                        placeholderText="DD/MM/YYYY"
                        onKeyDown={(e) => e.preventDefault()}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        maxDate={new Date()}
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
                        classname={"form-control"}
                        selected={doj}
                        onChange={(date) => setDoj(date)}
                        placeholderText="DD/MM/YYYY"
                        onKeyDown={(e) => e.preventDefault()}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        maxDate={new Date()}
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
                    value={skype_email}
                    onChange={(e) => setSkypeEmail(e.target.value)}
                  />
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
                      const value = Number(e.target.value);
                      if (value >= 0) {
                        setSalary(value);
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
                      const value = Number(e.target.value);
                      if (value >= 0) {
                        setSecurity(value);
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
                      const value = Number(e.target.value);
                      if (value >= 0) {
                        setTotalSecurity(value);
                      }
                    }}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Installment</label>
                    <select
                      className="form-control"
                      value={installments}
                      onChange={(e) => setInstallments(e.target.value)}
                    >
                      <option>Select</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>
                      {" "}
                      Position <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      style={
                        missingData?.position
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <option value="">Select</option>{" "}
                      {positionData.map((data, i) => {
                        return (
                          <option key={i} value={data?.value}>
                            {data?.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>
                      {" "}
                      Technology/Department{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      style={
                        missingData?.department
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <option>Select</option>
                      {ProfileData?.map((data, i) => {
                        return (
                          <option value={data?.value}>{data?.label}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>
                      {" "}
                      Status <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      style={
                        missingData?.status
                          ? { border: "1px solid red", borderRadius: "10px" }
                          : {}
                      }
                    >
                      <option>Select</option>
                      {statusObj?.map((data, i) => {
                        return (
                          <option key={i} value={data?.value}>
                            {data?.label}
                          </option>
                        );
                      })}
                    </select>
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
                    styleTrue={missingData?.username}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Role</label>
                    <select
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option>Select Role</option>
                      {roles?.data?.data?.map((role, i) => {
                        if (
                          role?.role === "Admin" &&
                          user_all_permissions?.roles_data?.includes("HR")
                        ) {
                          return null;
                        }
                        return (
                          <option key={i} value={role?.role}>
                            {role?.role}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group new_employee_form_group">
                <label>
                  Address <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  className="form-control mt-3"
                  placeholder="Address"
                  rows={5}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={
                    missingData?.username ? { border: "1px solid red" } : {}
                  }
                />
              </div>
              <div className="table-responsive mt-4 transparent_bg">
                <table className="employee_detail_table mt-3">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Document Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentsName.map((document) => (
                      <tr key={document.id}>
                        <td>{document.id}</td>
                        <td>{document.name}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={
                              Array.isArray(selected_documents) &&
                              selected_documents.includes(document.name)
                            }
                            onChange={() => handleCheckboxChange(document.name)} // Prevent users from checking it manually
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className="text-center mt-3"
                onClick={(e) => handleUpdate(e)}
              >
                <button className="cmn_Button_style">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <UnauthorizedPage />
  );
};

export default EditEmployeeInfo;
