import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import InputField from "../../Common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  create_new_user,
  clear_create_user_state,
} from "../../../utils/redux/userSlice/createNewUserSlice";

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
      alert(is_user_created?.message?.message);
      navigate("/employee");
      dispatch(clear_create_user_state());
    }
    if (is_user_created?.isError) {
      alert(is_user_created?.error?.message);
      dispatch(clear_create_user_state());
    }
  }, [is_user_created]);

  const handleInputChange = (name, value) => {
    setField_date({
      ...field_data,
      [name]: value,
    });
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(field_data).some(
      (value) => value.trim() === ""
    );
    if (hasEmptyFields) {
      alert("Fields cant be empty");
    } else {
      dispatch(create_new_user({ field_data }));
    }
  };

  return (
    <section>
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
                  <InputField
                    labelname={"Increment Date"}
                    placeholder={"04-02-2022"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.increment_date}
                    onChange={(e) =>
                      handleInputChange("increment_date", e.target.value)
                    }
                  />
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
                  <InputField
                    labelname={"DOB"}
                    placeholder={"01-02-1998"}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 col-md-12">
                  <InputField
                    labelname={" DOJ"}
                    placeholder={"01-02-2023"}
                    span={true}
                    classname={"new_employee_form_group"}
                    type={"text"}
                    value={field_data.doj}
                    onChange={(e) => handleInputChange("doj", e.target.value)}
                  />
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
                      value={field_data.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
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
