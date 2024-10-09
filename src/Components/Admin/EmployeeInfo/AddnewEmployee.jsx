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

const AddnewEmployee = () => {
  const dispatch = useDispatch();
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

  const handleSaveUser = (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(field_data).some((value) => {
      return typeof value === "string" ? value.trim() === "" : false;
    });

    if (hasEmptyFields) {
      alert("Fields can't be empty");
    } else {
      dispatch(create_new_user({ field_data }));
    }
  };

  const getMaxDate = () => {
    const today = new Date();
    const nextYear = new Date(today.setFullYear(today.getFullYear() + 1));
    return nextYear;
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
                    value={field_data.mobile}
                    onChange={(e) =>
                      handleInputChange("mobile", e.target.value)
                    }
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
                      maxDate={getMaxDate()}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Gender </label>
                    <div className="mt-2">
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
                    {/* <select
                      className="form-control"
                      value={field_data.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                    >
                      <option>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select> */}
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
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group ">
                    <label htmlFor="">Date of joining </label>
                    <DatePicker
                      className={"form-control"}
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
                        optionsData={[{ value: 1, label: 1 }]}
                        changeHandler={(e) =>
                          handleInputChange("installments", e.value)
                        }
                        value={field_data.installments}
                      />
                    </div>
                    {/* <select
                      className="form-control"
                      value={field_data.installments}
                      onChange={(e) =>
                        handleInputChange("installments", e.target.value)
                      }
                    >
                      <option>Select</option>
                      <option value={1}>1</option>
                    </select> */}
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>
                      Position <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="mt-2">
                      <CustomSelectComp
                        optionsData={[{ value: "intern", label: "Intern" }]}
                        changeHandler={(e) =>
                          handleInputChange("position", e.value)
                        }
                        value={field_data.position}
                      />
                    </div>
                    {/* <select
                      className="form-control"
                      value={field_data.position}
                      onChange={(e) =>
                        handleInputChange("position", e.target.value)
                      }
                    >
                      <option>Select</option>
                      <option value="intern">Intern</option>
                    </select> */}
                  </div>
                </div>

                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>
                      Technology/Department{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="mt-2">
                      <CustomSelectComp
                        optionsData={[{ value: "mern", label: "MERN" }]}
                        changeHandler={(e) =>
                          handleInputChange("department", e.value)
                        }
                        value={field_data.department}
                      />
                    </div>
                    {/* <select
                      className="form-control"
                      value={field_data.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                    >
                      <option>Select</option>
                      <option value={"mern"}>MERN</option>
                    </select> */}
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label>
                      {" "}
                      Status <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="mt-2">
                      <CustomSelectComp
                        optionsData={[{ value: "active", label: "ACTIVE" }]}
                        changeHandler={(e) =>
                          handleInputChange("status", e.value)
                        }
                        value={field_data.status}
                      />
                    </div>
                    {/* <select
                      className="form-control"
                      value={field_data.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                    >
                      <option>Select</option>
                      <option value="active">ACTIVE</option>
                    </select> */}
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
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <div className="form-group new_employee_form_group">
                    <label> Role</label>
                    <div className="mt-2">
                      <CustomSelectComp
                        optionsData={[{ value: "admin", label: "ADMIN" }]}
                        changeHandler={(e) =>
                          handleInputChange("role", e.value)
                        }
                        value={field_data.role}
                      />
                    </div>
                    {/* <select
                      className="form-control"
                      value={field_data.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                    >
                      <option>Select Role</option>
                      <option value={"admin"}>ADMIN</option>
                    </select> */}
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
                />
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
