import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Utils/appContecxt";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import "./rolePermission.css";
import { useNavigate } from "react-router-dom";
import CommonDeleteModal from "../../Modal/CommonDeleteModal";
import UseAllUserRoles from "../../Utils/customHooks/useAllUserRoles";
import { useSelector, useDispatch } from "react-redux";
import {
  disable_role,
  clear_disable_role_state,
} from "../../../utils/redux/rolesAndPermissionSlice/deleteRole";
import toast from "react-hot-toast";
import { get_all_user_roles } from "../../../utils/redux/rolesAndPermissionSlice/getUserRolesSlice";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import PaginationComp from "../../Pagination/Pagination";
import Loader from "../../assets/Loader.gif";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";
import { Table } from "react-bootstrap";

const RoleAndPermission = () => {
  const permissions = UsePermissions("Teams");
  const dispatch = useDispatch();
  UseAllUserRoles();
  const obj = [{ name: "Role & Permissions", path: "/rolePermission" }];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { show } = useAppContext();
  const navigate = useNavigate();
  const [role_id, setRole_id] = useState("");
  const is_role_disabled = useSelector((store) => store.DISABLE_ROLE);
  const user_roles = useSelector((store) => store.GET_ALL_USER_ROLES);
  localStorage.removeItem("tab");
  const handleDelete = () => {
    dispatch(disable_role({ role_id: role_id }));
  };

  useEffect(() => {
    if (localStorage.getItem("roles")?.includes("Employee")) {
      navigate("/mark-attendence");
    }
  }, [navigate]);

  useEffect(() => {
    if (is_role_disabled?.isSuccess) {
      toast.success("Role deleted successfully");
      dispatch(clear_disable_role_state());
      dispatch(get_all_user_roles());
      setShowDeleteModal(false);
    }
    if (is_role_disabled?.isError) {
      toast.success("Something went wrong. Please try again later");
      dispatch(clear_disable_role_state());
      dispatch(get_all_user_roles());
      setShowDeleteModal(false);
    }
  }, [is_role_disabled, dispatch]);

  return permissions?.can_view ? (
    <section className="role_permission_outer">
      <div
        className={`${
          localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "
        } gray_bg admin_outer ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="employee_wrapper cmn_padding_outer minheight">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />
          <div className="text-end">
            {permissions?.can_create && (
              <button
                className="cmn_Button_style"
                onClick={() => {
                  navigate("/createRole");
                }}
              >
                Add
              </button>
            )}
          </div>

          <div className=" mt-3 card-cmn">
            <Table responsive className="leave_table mb-0 ">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Role Name</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {user_roles?.isLoading ? (
                  <img src={Loader} alt="loader" className="loader_gif" />
                ) : (
                  user_roles?.data?.data?.map((roles, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{roles?.role}</td>
                        <td>
                          {roles?.users?.map((name, index) => {
                            return (
                              <span key={index}>
                                {name?.username}
                                <br />
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            {permissions?.can_update && (
                              <div
                                className="cmn_action_outer yellow_bg cursor_pointer"
                                onClick={() => {
                                  navigate("/editRole", {
                                    state: {
                                      id: roles?.role_id,
                                      name: roles?.role,
                                    },
                                  });
                                }}
                              >
                                <FiEdit />
                              </div>
                            )}
                            {permissions?.can_delete && (
                              <div className="cmn_action_outer red_bg cursor_pointer">
                                <RiDeleteBin6Line
                                  onClick={() => {
                                    setRole_id(roles?.role_id);
                                    setShowDeleteModal(true);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <CommonDeleteModal
          dialogClassname={"custom_modal_width"}
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          heading_text={"Are you sure you want to delete?"}
          paragraph_text={""}
          handleDelete={handleDelete}
        />
      )}
    </section>
  ) : (
    <UnauthorizedPage />
  );
};

export default RoleAndPermission;
