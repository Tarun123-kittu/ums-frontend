import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Notification from "../Notification/Notification";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import { useAppContext } from "../../Utils/appContecxt";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_user_details,
  clear_user_detail_slice,
} from "../../../utils/redux/userSlice/userDetailsSlice";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";

const ViewEmployeeInfo = () => {
  const location = useLocation();
  const { show } = useAppContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_id } = location.state ? location?.state : location;
  const [user_details, setUser_details] = useState([]);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  useEffect(() => {
    if (localStorage.getItem('roles')?.includes('Employee')) {
      navigate("/mark-attendence");
    }
  }, [navigate]);

  useEffect(() => {
    return () => {
      dispatch(clear_user_detail_slice());
    };
  }, []);

  useEffect(() => {
    if (!user_id) {
      navigate("/employee");
    }
  }, [user_id]);

  useEffect(() => {
    dispatch(get_user_details({ id: user_id }));
  }, [user_id]);

  const user_detail = useSelector((store) => store.GET_USER_DETAILS?.data);

  useEffect(() => {
    if (user_detail?.type === "success") {
      setUser_details(user_detail?.data[0]);
    }
  }, [user_detail]);

  const obj = [
    { name: "Employee", path: "/employee" },
    { name: "Information About Dinesh Kumar", path: "/viewEmployeeInfo" },
  ];

  if (!(user_all_permissions?.roles_data?.includes("Admin") || user_all_permissions?.roles_data?.includes("HR"))) {
    return <UnauthorizedPage />;
  }

  return (
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
          <div className="employee_editInfo_wrapper">
            <ul className="user_info_list_outer">
              <li className="d-flex  info_content">
                <h3 className="heading_style">Name</h3>
                <h3 className="heading_style">{user_details?.name}</h3>
                <h3 className="heading_style">Email</h3>
                <h3 className="heading_style">{user_details?.email}</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Mobile</h3>
                <h3 className="heading_style">{user_details?.mobile}</h3>
                <h3 className="heading_style">User Name</h3>
                <h3 className="heading_style">{user_details?.username}</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">DOB</h3>
                <h3 className="heading_style">{user_details?.dob}</h3>
                <h3 className="heading_style">DOJ</h3>
                <h3 className="heading_style">{user_details?.doj}</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Skepe</h3>
                <h3 className="heading_style">{user_details?.skype_email}</h3>
                <h3 className="heading_style">Ultivic email</h3>
                <h3 className="heading_style">{user_details?.ultivic_email}</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Position</h3>
                <h3 className="heading_style">{user_details?.position}</h3>
                <h3 className="heading_style">Technology/Department</h3>
                <h3 className="heading_style">{user_details?.department}</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Staus</h3>
                <h3 className="heading_style">{user_details?.status}</h3>
                <h3 className="heading_style">Salary</h3>
                <h3 className="heading_style">{user_details?.salary}</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">
                  Emergency Contact Relationship
                </h3>
                <h3 className="heading_style">
                  {user_details?.emergency_contact_relationship}
                </h3>
                <h3 className="heading_style">Emergency Contact Name</h3>
                <h3 className="heading_style">
                  {user_details?.emergency_contact_name}
                </h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Emergency Contact</h3>
                <h3 className="heading_style">
                  {user_details?.emergency_contact}
                </h3>
                <h3 className="heading_style">Bank Name</h3>
                <h3 className="heading_style">{user_details?.bank_name}</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Account Number</h3>
                <h3 className="heading_style">
                  {user_details?.account_number}
                </h3>
                <h3 className="heading_style">Bank IFC Code</h3>
                <h3 className="heading_style">{user_details?.ifsc}</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Increment Date</h3>
                <h3 className="heading_style">
                  {user_details?.increment_date}
                </h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Address</h3>
                <h3 className="heading_style">{user_details?.address}</h3>
              </li>
            </ul>
            <div className="table-responsive mt-4 transparent_bg">
              <h3 className="heading_style">Documents</h3>
              <table className="employee_detail_table mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Document Name</th>
                    <th>Verified At</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John</td>
                    <td>sd</td>
                    <td>12:00</td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-end">
              <button
                className="cmn_Button_style"
                onClick={() => {
                  navigate("/editEmployee", { state: { user_details } });
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewEmployeeInfo;
