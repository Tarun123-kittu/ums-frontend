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

const EditEmployeeInfo = () => {
  const { show } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const obj = [
    { name: "Employees", path: "/employee" },
    { name: "Information aAout Dinesh Kumar", path: "/viewEmployeeInfo" },
    { name: "Edit Dinesh Kumar Information", path: "/editEmployee" },
  ];
  const { user_details } = location?.state ? location?.state : location;
  console.log(user_details, "user_details user_details");

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

  const update_user_details = useSelector((store) => store.UPDATE_USER);

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

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      update_user({
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
        id,
      })
    );
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
                    onChange={(e) => setMobile(e.target.value)}
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
                    onChange={(e) => setAccountNumber(e.target.value)}
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
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group ">
                    <label htmlFor="">Date of joining </label>
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
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Skepe"}
                    placeholder={"Skepe"}
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
                    onChange={(e) => setSalary(e.target.value)}
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
                    onChange={(e) => setSecurity(e.target.value)}
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
                    onChange={(e) => setTotalSecurity(e.target.value)}
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
                    >
                      <option>Select</option>
                      <option value="intern">Intern</option>
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
                    >
                      <option>Select</option>
                      <option value={"mern"}>MERN</option>
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
                    >
                      <option>Select</option>
                      <option value="active">ACTIVE</option>
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
                      <option value={"admin"}>ADMIN</option>
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
                />
              </div>
              {/* edit user code */}
              <div className="text-end mt-3">
                <button className="cmn_Button_style add_document_btn">
                  Add Document
                </button>
              </div>
              <div className="table-responsive mt-4 transparent_bg">
                <table className="employee_detail_table mt-3">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Document Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Aadhar Card</td>
                      <td>N/A</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="text-center mt-3"
                onClick={(e) => handleUpdate(e)}
              >
                <button className="cmn_Button_style">Update</button>
              </div>
              {/* edit user code end*/}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditEmployeeInfo;
