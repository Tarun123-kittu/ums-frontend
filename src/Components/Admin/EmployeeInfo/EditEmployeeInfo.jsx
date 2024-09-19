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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./employee.css"
import "react-datepicker/dist/react-datepicker.css";
import {
  create_new_user,
  clear_create_user_state,
} from "../../../utils/redux/userSlice/createNewUserSlice";

const EditEmployeeInfo = () => {
  const { show } = useAppContext();
  const navigate = useNavigate();
  const obj = [
    { name: "Employees", path: "/employee" },
    { name: "Add New Employees", path: "/addemployee" },
  ];
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
    increment_date: "",
    gender: "",
    dob: "",
    doj: "",
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
  });




  const handleInputChange = (name, value) => {
    const dateFields = ["increment_date", "dob", "doj"];
    const newValue =
      dateFields.includes(name) && value
        ? moment(value).format("DD/MM/YYYY")
        : value;

    setField_date({
      ...field_data,
      [name]: newValue,
    });
  };

 



  return (
    <section className="add_new_emp_container">
      <Sidebar />
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
                    value={field_data.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
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
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Mobile"}
                    span={true}
                    placeholder={"Mobile of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Emergency Contact Relationship "}
                    placeholder={"Relationship of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={""}
                    onChange={(e) =>{}
                    }
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Emergency Contact Name"}
                    placeholder={"Emergency Contact Name"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Emergency Contact"}
                    placeholder={"Emergency mobile no of the employee"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Bank Name"}
                    placeholder={"Bank Name"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Account Number"}
                    placeholder={"Account Number"}
                    classname={"new_employee_form_group"}
                    type={"number"}
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"IFCE"}
                    placeholder={"Bank IFCE Code"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label htmlFor="">Increment Date</label>
                    <DatePicker
                      selected={
                        field_data.increment_date
                          ? new Date(field_data.increment_date)
                          : null
                      }
                      onChange={(date) =>
                        handleInputChange("increment_date", date)
                      }
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
                      value={field_data.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
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
                    <DatePicker
                      selected={field_data.dob}
                      onChange={(date) => handleInputChange("dob", date)}
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
                      selected={field_data.doj}
                      onChange={(date) => handleInputChange("doj", date)}
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
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Ultivic Email"}
                    placeholder={"Ultivic Email"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={""}
                    onChange={(e) =>{}}
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
                    value={""}
                    onChange={(e) =>{}}
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
                    value={""}
                    onChange={(e) =>{}}
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
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Installment</label>
                    <select
                      className="form-control"
                      value={field_data.installments}
                      onChange={(e) =>
                        handleInputChange("installments", e.target.value)
                      }
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
                      value={field_data.position}
                      onChange={(e) =>
                        handleInputChange("position", e.target.value)
                      }
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
                      value={""}
                      onChange={(e) =>{}}
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
                      value={field_data.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
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
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Password"}
                    placeholder={"Password"}
                    classname={"new_employee_form_group"}
                    type={"password"}
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={"Confirm Password"}
                    placeholder={"Confirm Password"}
                    classname={"new_employee_form_group"}
                    type={"password"}
                    value={""}
                    onChange={(e) =>{}}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Role</label>
                    <select
                      className="form-control"
                      value={field_data.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                    >
                      <option>Select Role</option>
                      <option value={"admin"}>ADMIN</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group new_employee_form_group">
                <label>Address <span style={{ color: "red" }}>*</span></label>
                <textarea
                  className="form-control mt-3"
                  placeholder="Address"
                  rows={5}
                  value={""}
                  onChange={(e) =>{}}
                />
              </div>
              {/* edit user code */}
              <div className="text-end mt-3">
                <button
                  className="cmn_Button_style add_document_btn" 
                
                >
                  Add Document
                </button>
              </div>
                <div className='table-responsive mt-4 transparent_bg'>
           
              <table className='employee_detail_table mt-3'>
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
                        <input type="checkbox"/>
                      </td>
                    
                  
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-3">
                <button
                  className="cmn_Button_style"
                  
                >
                  Add
                </button>
              </div>
              {/* edit user code end*/}
              
          
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default EditEmployeeInfo;
