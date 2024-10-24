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
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  create_new_role_and_assign_permissions,
  clear_new_role_permission_state,
} from "../../../utils/redux/rolesAndPermissionSlice/createNewRole";
import { useNavigate } from "react-router-dom";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";

const CreateRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = UsePermissions("Teams");
  const obj = [{ name: "Role & Permissions", path: "/rolePermission" }];
  const { show } = useAppContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [all_permission, setAll_permission] = useState(permissionsList);
  const [role, setRole] = useState("");
  const [name_assigned, setName_assigned] = useState([]);
  const [user_ids, setUser_ids] = useState([]);
  const [deleted_id, setDeleted_id] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const is_new_role_created = useSelector(
    (store) => store.CREATE_NEW_ROLE_AND_PERMISSIONS
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
    const missingData = {};
    if (!role) {
      toast.error("Role name can't be empty");
      missingData.role = "Role name can't be empty";
      setErrorMessage(missingData);
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
      toast.success(is_new_role_created?.message?.message);
      dispatch(clear_new_role_permission_state());
      navigate("/rolePermission");
    }
  }, [is_new_role_created]);

  return permissions?.can_view ? (
    <section className="role_permission_outer">
      <div
        className={`${
          localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "
        } gray_bg admin_outer ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="employee_wrapper cmn_padding_outer card-cmn">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />
          <div className="row">
            <div className="col-lg-8 col-sm-12 col-md-12">
              <div className="cmn_border edit_role_wrapper">
                <div className=" assign_role_wrapper">
                  <div className="form-group new_employee_form_group w-100">
                    <label>Role Name</label>
                    <div className="w-100">
                      <input
                        className="form-control"
                        value={role}
                        placeholder="Role Name"
                        onChange={(e) => setRole(e.target.value)}
                        style={
                          errorMessage?.role ? { border: "1px solid red" } : {}
                        }
                      />
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errorMessage?.role}
                      </span>
                    </div>
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
                      {all_permission?.map((per, i) => {
                        return (
                          <tr>
                            <td>{per?.permission}</td>
                            <td>
                              <input
                                type="checkbox"
                                checked={per?.can_update}
                                onChange={() =>
                                  handleChangePermissions(
                                    i,
                                    "can_update",
                                    per?.permission_id
                                  )
                                }
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="checkbox"
                                checked={per?.can_delete}
                                onChange={() =>
                                  handleChangePermissions(
                                    i,
                                    "can_delete",
                                    per?.permission_id
                                  )
                                }
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="checkbox"
                                checked={per?.can_view}
                                onChange={() =>
                                  handleChangePermissions(
                                    i,
                                    "can_view",
                                    per?.permission_id
                                  )
                                }
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="checkbox"
                                checked={per?.can_create}
                                onChange={() =>
                                  handleChangePermissions(
                                    i,
                                    "can_create",
                                    per?.permission_id
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
                  {permissions?.can_create && (
                    <button
                      className="cmn_Button_style"
                      onClick={() => handleCreateNewRole()}
                    >
                      Save
                      {is_new_role_created?.isLoading && (
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-md-12">
              <div className="cmn_border">
                <div className="d-flex  assign_role_header">
                  <h3 className="cmn_text_heading">Assigned Role List Names</h3>
                  <div>
                    {permissions?.can_create && (
                      <button
                        className="dark_red_bg add_role_btn"
                        onClick={() => {
                          setShowAssignModal(true);
                        }}
                      >
                        <IoMdAdd />
                      </button>
                    )}
                  </div>
                </div>
                <ul className="role_list">
                  {Array.isArray(name_assigned) && name_assigned.length > 0 ? (
                    name_assigned.map((name, i) => (
                      <li key={i}>
                        <div className="d-flex role_list_wrapper">
                          <h3 className="cmn_text_heading">{name?.name}</h3>
                          {permissions?.can_create &&
                            permissions?.can_update && (
                              <RiDeleteBin6Line
                                className="cursor_pointer"
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setDeleted_id(name?.id);
                                }}
                              />
                            )}
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
  ) : (
    <UnauthorizedPage />
  );
};

export default CreateRole;
