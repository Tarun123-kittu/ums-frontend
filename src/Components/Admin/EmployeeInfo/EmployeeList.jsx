import React, { useState, useEffect } from "react";
import { FaSort, FaSortDown } from "react-icons/fa";
import Loader from "../../assets/Loader.gif"
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_all_users_user } from "../../../utils/redux/userSlice/getAllUserSlice";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {
  clear_create_delete_state,
  delete_user,
} from "../../../utils/redux/userSlice/deleteUserSlice";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import CommonDeleteModal from "../../Modal/CommonDeleteModal";
import PaginationComp from "../../Pagination/Pagination";
import CustomSelectComp from "../../Common/CustomSelectComp";
const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [page, setPage] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userId, setuserId] = useState("");

  const all_users_list = useSelector((stroe) => stroe?.GET_ALL_USERS);
  console.log(all_users_list, "this is the list of all users")
  const is_user_deleted = useSelector((store) => store.DELETE_USER);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  useEffect(() => {
    if (is_user_deleted?.isSuccess) {
      toast.success(is_user_deleted?.message?.message);
      dispatch(get_all_users_user());
      dispatch(clear_create_delete_state());
    }
    if (is_user_deleted?.isError) {
      toast.error(is_user_deleted?.error?.message);
      dispatch(clear_create_delete_state());
    }
  }, [is_user_deleted, dispatch]);

  useEffect(() => {
    if (all_users_list?.isError) {
      toast.error(all_users_list?.error?.message);
    }
  }, [all_users_list]);

  useEffect(() => {
    dispatch(get_all_users_user({ name: searchName, status: searchStatus, page }));
  }, [page]);

  const deleteHandler = () => {
    dispatch(delete_user({ id: userId }));
    setShowDeleteModal(false);
  };

  if (!user_all_permissions?.roles_data?.includes("Admin")) {
    return <UnauthorizedPage />;
  }
  return (
    <>
      <div className="employee_list_outer minheight">
        <div className="d-flex employee_container align-items-end mt-3">
          <div className="employee_wrapper">
            <div className="new_employee_form_group">
              <label className="">Status</label>
              <div className="mt-2">
                <CustomSelectComp
                  optionsData={[{ value: "active", label: "Active" }]}
                  changeHandler={(e) => setSearchStatus(e.value)}
                  value={searchStatus}
                  placeholder="Active"
                />
              </div>
            </div>
          </div>

          <div className="employee_wrapper">
            <div className="new_employee_form_group">
              <label className="">Employee</label>
              <div class="custom-select-wrapper">
                <select
                  class="custom-select form-control"
                  placeholder="Search Employee"
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                  }}
                >
                  <option>Search Employee</option>
                  {all_users_list?.data?.data?.map((user, i) => {
                    return (
                      <option key={i} value={user?.name}>
                        {user?.name}
                      </option>
                    );
                  })}
                </select>
                <FaSort className="dropdown-icon " />
              </div>
            </div>
          </div>

          <div className="employee_wrapper text-end serach_add_outer">
            <button
              className="cmn_Button_style"
              onClick={() =>
                dispatch(
                  get_all_users_user({ name: searchName, status: searchStatus, page })
                )
              }
            >
              Search
            </button>
            <button
              className="cmn_Button_style ms-3"
              onClick={() => navigate("/addemployee")}
            >
              Add
            </button>
          </div>
        </div>

        <div className="table-responsive mt-3 transparent_bg">
          <table className="employee_detail_table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>DOJ</th>
                <th>DOB</th>
                <th>Post</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {all_users_list?.isLoading ? <img className="loader_gif" src={Loader} alt="loader" /> : all_users_list?.data?.data?.map((user, index) => {
                return (
                  <tr key={user?.id}>
                    <td>{index + 1}</td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.mobile}</td>
                    <td>{moment(user?.doj).format("MMMM D, YYYY")}</td>
                    <td>{moment(user?.dob).format("MMMM D, YYYY")}</td>
                    <td>{user?.position}</td>
                    <td>{user?.status}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <div
                          className="cmn_action_outer dark_gray_bg"
                          style={{ cursor: "pointer" }}
                          title="view details"
                          onClick={() =>
                            navigate("/viewEmployeeInfo", {
                              state: { user_id: user?.id },
                            })
                          }
                        >
                          <FaEye />
                        </div>
                        <div
                          className="cmn_action_outer red_bg"
                          style={{ cursor: "pointer" }}
                          title="delete user"
                        >
                          <RiDeleteBin6Line
                            onClick={() => {
                              setShowDeleteModal(true);
                              setuserId(user?.id);
                              // dispatch(delete_user({ id: user?.id }))
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {showDeleteModal && (
          <CommonDeleteModal
            heading_text={"Are you sure you want to delete "}
            paragraph_text={""}
            show={showDeleteModal}
            setShow={setShowDeleteModal}
            deleteHandler={deleteHandler}
          />
        )}
      </div>
      <PaginationComp totalPage={all_users_list?.data?.total_pages} setPage={setPage} />
    </>
  );
};

export default EmployeeList;
