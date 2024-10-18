import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Notification from "../Notification/Notification";
import { useAppContext } from "../../Utils/appContecxt";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./holiday.css";
import AddEventModal from "../../Modal/AddEventModal";
import { useDispatch, useSelector } from "react-redux";
import { get_all_holidays_and_events } from "../../../utils/redux/holidayAndEventsSlice/getAllHolidaysAndEvents";
import toast from "react-hot-toast";
import { clear_get_selected_holiday_and_event_state } from "../../../utils/redux/holidayAndEventsSlice/getSelectedHolidayAndEvent";
import CommonDeleteModal from "../../Modal/CommonDeleteModal";
import {
  clear_delete_event_state,
  delete_event,
} from "../../../utils/redux/holidayAndEventsSlice/deleteEvent";
import CustomSelectComp from "../../Common/CustomSelectComp";
import PaginationComp from "../../Pagination/Pagination";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import { useNavigate } from "react-router-dom";
import Loader from "../../assets/Loader.gif";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";
const HolidayEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = UsePermissions("Events");
  const { show } = useAppContext();
  const [showEventModal, setShowEventModal] = useState(false);
  const [selected_year, setSelected_year] = useState(new Date().getFullYear());
  const [year, setYear] = useState([]);
  const [page, setPage] = useState(1);
  const [yearObj, setYearObj] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hr_user_permissions, setHr_user_permissions] = useState({});
  const [event_id, setEvent_id] = useState(null);
  const all_permissions = useSelector((store) => store.USER_PERMISSIONS);
  const holiday_and_events = useSelector(
    (store) => store.ALL_HOLIDAY_AND_EVENT
  );
  const is_deleted = useSelector((store) => store.DELETE_EVENT);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  useEffect(() => {
    const can_hr_create = all_permissions?.data?.data?.find(
      (el) => el.role === "HR" && el.permission === "Events"
    );
    setHr_user_permissions(can_hr_create);
  }, [all_permissions]);

  useEffect(() => {
    if (localStorage.getItem("roles")?.includes("Employee")) {
      navigate("/mark-attendence");
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(get_all_holidays_and_events({ year: selected_year, page }));
    years();
    dispatch(clear_get_selected_holiday_and_event_state());
  }, [page]);

  const years = (startYear = 2020) => {
    setYear([]);
    let currentYear = new Date().getFullYear();
    let result = [];

    while (startYear <= currentYear) {
      result.push(startYear++);
    }
    setYear(result);
  };

  useEffect(() => {
    if (year?.length !== 0) {
      year?.forEach((data) => {
        if (!yearObj.some((item) => item.value === data)) {
          yearObj.push({ value: data, label: data });
        }
      });
    }
  }, [year]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleSetYear = (e) => {
    setSelected_year(e.value);
    setIsSearched(true);
  };

  const handleShowEditModal = (eventId) => {
    setOpenEditModal(true);
    setEvent_id(eventId);
  };

  const deleteHandler = () => {
    dispatch(delete_event({ id: event_id }));
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (is_deleted?.isSuccess) {
      toast.success("Event deleted successfully !!");
      dispatch(clear_delete_event_state());
      dispatch(get_all_holidays_and_events({ year: selected_year }));
      setShowDeleteModal(false);
    }
  }, [is_deleted]);

  if (
    !(
      user_all_permissions?.roles_data?.includes("Admin") ||
      user_all_permissions?.roles_data?.includes("HR")
    )
  ) {
    return <UnauthorizedPage />;
  }

  return (
    <section className="holiday_event_wrapper">
      <div
        className={`wrapper gray_bg admin_outer ${show ? "cmn_margin" : ""}`}
      >
        <Notification />
        <div className="cmn_padding_outer minheight">
          <div className="d-flex employee_container align-items-end mt-3">
            <div className="employee_wrapper">
              <div className="form-group new_employee_form_group">
                <label>Holiday</label>
                <div className="mt-2">
                  <CustomSelectComp
                    value={selected_year}
                    changeHandler={(e) => handleSetYear(e)}
                    optionsData={yearObj}
                  />
                </div>
              </div>
            </div>

            <div className="employee_wrapper  serach_reset_outer">
              <button
                className="cmn_Button_style cmn_darkgray_btn"
                onClick={() =>
                  dispatch(
                    get_all_holidays_and_events({
                      year: new Date().getFullYear(),
                    })
                  )
                }
              >
                Reset
              </button>
              <button
                className="cmn_Button_style"
                onClick={() =>
                  isSearched
                    ? dispatch(
                        get_all_holidays_and_events({ year: selected_year })
                      )
                    : toast.error("Please select year !!")
                }
              >
                Search
              </button>
              {permissions?.can_create && (
                <button
                  className="cmn_Button_style"
                  onClick={() => {
                    setShowEventModal(true);
                  }}
                >
                  Add Event
                </button>
              )}
            </div>
          </div>
          <div className="table-responsive mt-3 transparent_bg">
            <table className="employee_detail_table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {holiday_and_events?.isLoading ? (
                  <img className="loader_gif" src={Loader} alt="loader" />
                ) : (
                  holiday_and_events?.data?.eventsOrHolidays?.map(
                    (event, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{formatDate(event?.date)}</td>
                          <td>{event?.occasion_name}</td>

                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              {permissions?.can_update && (
                                <div className="cmn_action_outer yellow_bg">
                                  <FaRegEdit
                                    onClick={() =>
                                      handleShowEditModal(event?.id)
                                    }
                                  />
                                </div>
                              )}
                              {permissions?.can_delete && (
                                <div className="cmn_action_outer red_bg">
                                  <RiDeleteBin6Line
                                    onClick={() => {
                                      setShowDeleteModal(true);
                                      setEvent_id(event?.id);
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <PaginationComp
          totalPage={holiday_and_events?.data?.totalPages}
          setPage={setPage}
        />

        {showEventModal && (
          <AddEventModal show={showEventModal} setShow={setShowEventModal} />
        )}
        {openEditModal ? (
          <AddEventModal
            show={openEditModal}
            setShow={setOpenEditModal}
            eventId={event_id}
            edit={true}
          />
        ) : null}

        {showDeleteModal && (
          <CommonDeleteModal
            heading_text={"Are you sure you want to delete "}
            paragraph_text={""}
            show={showDeleteModal}
            setShow={setShowDeleteModal}
            handleDelete={deleteHandler}
          />
        )}
      </div>
    </section>
  );
};

export default HolidayEvent;
