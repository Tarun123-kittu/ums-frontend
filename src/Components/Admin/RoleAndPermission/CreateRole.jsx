import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import "./rolePermission.css";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import CommonDeleteModal from "../../Modal/CommonDeleteModal";
import AssignNameModal from "../../Modal/AssignNameModal";
import { permissionsList } from "../../Utils/customData/permissionsListData";
import CustomToast from "../../CustomToast/CustomToast";
import { useDispatch, useSelector } from "react-redux";
import {
  create_new_role_and_assign_permissions,
  clear_new_role_permission_state,
} from "../../../utils/redux/rolesAndPermissionSlice/createNewRole";
import { useNavigate } from "react-router-dom";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";

const CreateRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const obj = [
    { name: "Role & Permissions", path: "/rolePermission" },
    { name: "Create The New Role", path: "/createtRole" },
  ];
  const { show } = useAppContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [all_permission, setAll_permission] = useState(permissionsList);
  const [role, setRole] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [name_assigned, setName_assigned] = useState([]);
  const [user_ids, setUser_ids] = useState([]);
  const [type, setType] = useState("");
  const [deleted_id, setDeleted_id] = useState(null);
  const is_new_role_created = useSelector(
    (store) => store.CREATE_NEW_ROLE_AND_PERMISSIONS
  );
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );
  const all_userNames = useSelector((store) => store.ALL_USERNAMES?.data?.data);

  const handleChangePermissions = (index, valueKey, permission_id) => {
    const updatedPermissions = all_permission.map((state, idx) => {
      if (idx === index) {
        return {
          ...state,
          [valueKey]: !state[valueKey],
          permission_id: permission_id,
        };
      }
      return state;
    });

    setAll_permission(updatedPermissions);
  };

  const handleCreateNewRole = () => {
    if (!role) {
      setToastMessage("Role name can't be empty");
      setShowToast(true);
      setType("error");
    } else {
      dispatch(
        create_new_role_and_assign_permissions({
          permission_data: all_permission,
          role: role,
          user_id: user_ids,
        })
      );
    }
  };

  useEffect(() => {
    let newArr = [];
    if (all_userNames && user_ids) {
      user_ids.forEach((id) => {
        const find_user_names = all_userNames.find((name) => name.id == id);
        newArr?.push(find_user_names);
        setName_assigned(newArr);
      });
    }
  }, [user_ids, all_userNames]);

  const handleDelete = () => {
    const check = user_ids?.filter((el) => el != deleted_id);
    setUser_ids(check);

    const filteredUsers = name_assigned?.filter((el) => el?.id != deleted_id);
    setName_assigned(filteredUsers);

    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (is_new_role_created?.isSuccess) {
      setToastMessage(is_new_role_created?.message?.message);
      setShowToast(true);
      dispatch(clear_new_role_permission_state());
      navigate("/rolePermission");
    }
  }, [is_new_role_created]);

  if (!user_all_permissions?.roles_data?.includes("Admin")) {
    return <UnauthorizedPage />;
  }

  return (
    <section className="role_permission_outer">
      <Sidebar />
      {showToast && (
        <CustomToast
          setShow={setShowToast}
          message={toastMessage}
          type={type}
        />
      )}
      <div
        className={`wrapper gray_bg admin_outer ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="employee_wrapper cmn_padding_outer">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />
          <div className="row">
            <div className="col-lg-8 col-sm-12 col-md-12">
              <div className="cmn_border edit_role_wrapper">
                <div className="d-flex assign_role_wrapper">
                  <div className="form-group new_employee_form_group">
                    <label>Role Name</label>
                    <input
                      className="form-control"
                      value={role}
                      placeholder="Role Name"
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>
                {/* permissions */}
                <div className="table-responsive transparent_bg mt-4">
                  <table className="edit_role_table">
                    <thead>
                      <tr>
                        <th>Permissions</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                        <th>Create</th>
                      </tr>
                    </thead>
                    <tbody>
                      {all_permission?.map((permission, i) => {
                        return (
                          <tr>
                            <td>{permission?.permission}</td>
                            <td>
                              <input
                                type="checkbox"
                                checked={permission?.can_update}
                                onChange={() =>
                                  handleChangePermissions(
                                    i,
                                    "can_update",
                                    permission?.permission_id
                                  )
                                }
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="checkbox"
                                checked={permission?.can_delete}
                                onChange={() =>
                                  handleChangePermissions(
                                    i,
                                    "can_delete",
                                    permission?.permission_id
                                  )
                                }
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="checkbox"
                                checked={permission?.can_view}
                                onChange={() =>
                                  handleChangePermissions(
                                    i,
                                    "can_view",
                                    permission?.permission_id
                                  )
                                }
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="checkbox"
                                checked={permission?.can_create}
                                onChange={() =>
                                  handleChangePermissions(
                                    i,
                                    "can_create",
                                    permission?.permission_id
                                  )
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex gap-3 justify-content-end mt-4">
                  <button className="cmn_Button_style cmn_darkgray_btn">
                    Exit
                  </button>
                  <button
                    className="cmn_Button_style"
                    onClick={() => handleCreateNewRole()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-md-12">
              <div className="cmn_border">
                <div className="d-flex  assign_role_header">
                  <h3 className="cmn_text_heading">Assigned Role List Names</h3>
                  <div>
                    <button
                      className="dark_red_bg add_role_btn"
                      onClick={() => {
                        setShowAssignModal(true);
                      }}
                    >
                      <IoMdAdd />
                    </button>
                  </div>
                </div>
                <ul className="role_list">
                  {Array.isArray(name_assigned) && name_assigned.length > 0 ? (
                    name_assigned.map((name, i) => (
                      <li key={i}>
                        <div className="d-flex role_list_wrapper">
                        <h3 className="cmn_text_heading">{name?.name}</h3>
                        <RiDeleteBin6Line
                          className="cursor_pointer"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setDeleted_id(name?.id);
                          }}
                        />
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No names assigned</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {showAssignModal && (
          <AssignNameModal
            dialogClassname={"custom_modal_width"}
            show={showAssignModal}
            setShow={setShowAssignModal}
            setUser_ids={setUser_ids}
          />
        )}
        {showDeleteModal && (
          <CommonDeleteModal
            dialogClassname={"custom_modal_width"}
            show={showDeleteModal}
            setShow={setShowDeleteModal}
            heading_text={"Are you sure to delete"}
            paragraph_text={""}
            handleDelete={handleDelete}
          />
        )}
        {showDeleteRoleModal && (
          <CommonDeleteModal
            dialogClassname={"custom_modal_width"}
            className={""}
            show={showDeleteRoleModal}
            setShow={setShowDeleteRoleModal}
            heading_text={"Are you sure to delete Test Series role"}
            paragraph_text={
              "Confirm deletion of Test Series Once deleted, this action cannot be reversed."
            }
          />
        )}
      </div>
    </section>
  );
};

export default CreateRole;
