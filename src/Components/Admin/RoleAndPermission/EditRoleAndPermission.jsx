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
import { useNavigate, useLocation } from "react-router-dom";
import UseRolePermissions from "../../Utils/customHooks/useRolePermissions";
import { useSelector, useDispatch } from "react-redux";
import {
  update_role_permission,
  clear_update_role_permissions_slice,
} from "../../../utils/redux/rolesAndPermissionSlice/updateRolePermission";
import toast from "react-hot-toast";
import {
  disable_role,
  clear_disable_role_state,
} from "../../../utils/redux/rolesAndPermissionSlice/deleteRole";
import { get_all_user_roles } from "../../../utils/redux/rolesAndPermissionSlice/getUserRolesSlice";
import { get_users_assigned_to_role } from "../../../utils/redux/rolesAndPermissionSlice/getUserAssignedToRole";
import {
  delete_user_assigned_to_role,
  clear_delete_user_assigned_to_role,
} from "../../../utils/redux/rolesAndPermissionSlice/deleteUserAssignedToRole";
import { get_role_permissions } from "../../../utils/redux/rolesAndPermissionSlice/getRolePermissions";

const EditRoleAndPermission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, name } = location?.state ? location?.state : location;
  const [permissions_state, setPermissions_state] = useState([]);
  const role_permissions_data = useSelector(
    (store) => store.GET_ROLE_PERMISSIONS
  );
  const is_permissions_updated = useSelector(
    (store) => store.UPDATE_ROLE_PERMISSION
  );
  const is_role_disabled = useSelector((store) => store.DISABLE_ROLE);
  const user_assigned = useSelector((store) => store.USERS_ASSIGNED_TO_ROLE);
  const deleted_users_state = useSelector(
    (store) => store.DELETE_USER_ASSIGNED_TO_ROLE
  );
  UseRolePermissions({ id });

  useEffect(() => {
    if (role_permissions_data?.isSuccess) {
      setPermissions_state(role_permissions_data?.data?.data);
    }
  }, [role_permissions_data]);

  useEffect(() => {
    if (!id) navigate("/rolePermission");
  }, [id]);

  useEffect(() => {
    dispatch(get_users_assigned_to_role({ role_id: id }));
  }, [id, dispatch]);

  const obj = [
    { name: "Role & Permissions", path: "/rolePermission" },
    { name: "Edit the Ux/Ui Designer Role", path: "/editRole" },
  ];
  const { show } = useAppContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [deleted_id, setDeleted_id] = useState(null);

  const handleChangePermissions = (index, valueKey) => {
    const updatedPermissions = permissions_state.map((state, idx) => {
      if (idx === index) {
        return {
          ...state,
          [valueKey]: !state[valueKey],
        };
      }
      return state;
    });

    setPermissions_state(updatedPermissions);
  };

  const handleUpdatePermissions = () => {
    dispatch(update_role_permission({ permission_data: permissions_state }));
  };

  useEffect(() => {
    if (is_permissions_updated?.isSuccess) {
      dispatch(get_role_permissions({ id }));
      toast.success("Permission updated Successfully");
      dispatch(clear_update_role_permissions_slice());
      navigate("/rolePermission");
    }
  }, [is_permissions_updated]);

  const handleDelete = () => {
    dispatch(disable_role({ role_id: id }));
  };

  useEffect(() => {
    if (is_role_disabled?.isSuccess) {
      toast.success("Role deleted successfully");
      dispatch(clear_disable_role_state());
      navigate("/rolePermission");
      disable_role(get_all_user_roles());
    }
  }, [is_role_disabled]);

  const handleDeleteUser = () => {
    dispatch(delete_user_assigned_to_role({ user_id: deleted_id, roleId: id }));
  };

  useEffect(() => {
    if (deleted_users_state?.isSuccess) {
      toast.success("Deleted Successfully");
      dispatch(get_users_assigned_to_role({ role_id: id }));
      dispatch(clear_delete_user_assigned_to_role());
      setShowDeleteModal(false);
    }
  }, [deleted_users_state]);

  return (
    <section className="role_permission_outer">
      <Sidebar />
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
                    <input className="form-control" value={name} disabled />
                  </div>
                  <div className="edit_role_delete_outer">
                    <button
                      className="cmn_Button_style cmn_darkgray_btn"
                      onClick={() => {
                        setShowDeleteRoleModal(true);
                      }}
                    >
                      Delete
                    </button>
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
                      {permissions_state?.map((permissions, i) => {
                        return (
                          <tr key={i}>
                            <td>{permissions?.permission}</td>
                            <td>
                              <input
                                type="checkbox"
                                checked={permissions?.can_update}
                                onChange={() =>
                                  handleChangePermissions(i, "can_update")
                                }
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="checkbox"
                                checked={permissions?.can_delete}
                                onChange={() =>
                                  handleChangePermissions(i, "can_delete")
                                }
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="checkbox"
                                checked={permissions?.can_view}
                                onChange={() =>
                                  handleChangePermissions(i, "can_view")
                                }
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="checkbox"
                                checked={permissions?.can_create}
                                onChange={() =>
                                  handleChangePermissions(i, "can_create")
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
                  <button
                    className="cmn_Button_style cmn_darkgray_btn"
                    onClick={() => navigate(-1)}
                  >
                    Exit
                  </button>
                  <button
                    className="cmn_Button_style"
                    onClick={() => handleUpdatePermissions()}
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
                  {user_assigned?.data?.data?.map((name, i) => {
                    return (
                      <li key={i}>
                        <div className="d-flex role_list_wrapper">
                          <h3 className="cmn_text_heading">{name?.name}</h3>
                          <RiDeleteBin6Line
                            className="cursor_pointer"
                            onClick={() => {
                              setDeleted_id(name?.id);
                              setShowDeleteModal(true);
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
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
            userAssignedToOldRole={true}
            role_id={id}
          />
        )}
        {showDeleteModal && (
          <CommonDeleteModal
            dialogClassname={"custom_modal_width"}
            show={showDeleteModal}
            setShow={setShowDeleteModal}
            heading_text={"Are you sure to delete"}
            paragraph_text={""}
            handleDelete={handleDeleteUser}
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
            handleDelete={handleDelete}
          />
        )}
      </div>
    </section>
  );
};

export default EditRoleAndPermission;
