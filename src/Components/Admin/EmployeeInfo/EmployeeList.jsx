import React, { useState, useEffect } from "react";
import { FaSort, FaSortDown } from "react-icons/fa";

import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_all_users_user } from "../../../utils/redux/userSlice/getAllUserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {
  clear_create_delete_state,
  delete_user,
} from "../../../utils/redux/userSlice/deleteUserSlice";
const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const all_users_list = useSelector((stroe) => stroe?.GET_ALL_USERS);
  const is_user_deleted = useSelector((store) => store.DELETE_USER);

  useEffect(() => {
    if (is_user_deleted?.isSuccess) {
      toast.success(is_user_deleted?.message?.message, {
        autoClose: 2000,
      });
      dispatch(get_all_users_user());
      dispatch(clear_create_delete_state());
    }
    if (is_user_deleted?.isError) {
      toast.error(is_user_deleted?.error?.message, {
        autoClose: 2000,
      });
      dispatch(clear_create_delete_state());
    }
  }, [is_user_deleted, dispatch]);

  useEffect(() => {
    if (all_users_list?.isError) {
      toast.error(all_users_list?.error?.message, {
        autoClose: 2000,
      });
    }
  }, [all_users_list]);

  useEffect(() => {
    dispatch(get_all_users_user());
  }, []);
  return (
    <div className="employee_list_outer">
      <div className="d-flex employee_container align-items-end mt-3">
        <div className="employee_wrapper">
          <div className="new_employee_form_group">
            <label className="">Status</label>
            <div class="custom-select-wrapper">
              <select class="custom-select form-control" placeholder="Active">
                <option>Active</option>
              </select>
              <FaSort className="dropdown-icon " />
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
              >
                <option>Search Employee</option>
              </select>
              <FaSort className="dropdown-icon " />
            </div>
          </div>
        </div>

        <div className="employee_wrapper text-end serach_add_outer">
          <button className="cmn_Button_style">Search</button>
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
            {all_users_list?.data?.data?.map((user, index) => {
              return (
                <tr key={user?._id}>
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
                      <div className="cmn_action_outer dark_gray_bg">
                        <FaEye />
                      </div>
                      <div className="cmn_action_outer red_bg">
                        <RiDeleteBin6Line
                          onClick={() =>
                            dispatch(delete_user({ id: user?.id }))
                          }
                        />
                      </div>
                      <div className="cmn_action_outer redbrown_bg">
                        <FaClock />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeList;
