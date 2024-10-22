import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./modal.css";
import CustomSelectComp from "../Common/CustomSelectComp";
import { useDispatch, useSelector } from "react-redux";
import {
  add_holiday_and_event,
  clear_holiday_and_events_state,
} from "../../utils/redux/holidayAndEventsSlice/addHolidayAndEvent";
import toast from "react-hot-toast";
import {
  get_selected_holiday_and_event_details,
  clear_get_selected_holiday_and_event_state,
} from "../../utils/redux/holidayAndEventsSlice/getSelectedHolidayAndEvent";
import checkPermissions from "../Utils/checkPermissions";
import {
  update_holiday_and_event,
  clear_updated_holiday_and_event_state,
} from "../../utils/redux/holidayAndEventsSlice/updateHolidayAndEvents";
import { get_all_holidays_and_events } from "../../utils/redux/holidayAndEventsSlice/getAllHolidaysAndEvents";

const AddEventModal = ({ show, setShow, eventId, edit }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [description, setDiscription] = useState("");
  const [permissions, setPermissions] = useState({
    can_view: false,
    can_create: false,
    can_delete: false,
    can_update: false,
  });
  const all_permissions = useSelector((store) => store.USER_PERMISSIONS);
  const is_holiday_created = useSelector(
    (store) => store.ADD_HOLIDAY_AND_EVENT
  );
  const selected_event_details = useSelector(
    (store) => store.SELECTED_EVENT_DETAILS
  );
  const is_holiday_updated = useSelector(
    (store) => store.UPDATE_SELECTED_EVENT
  );
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const permissionStatus = checkPermissions(
      "Events",
      user_all_permissions?.roles_data,
      user_all_permissions?.permission_data
    );
    setPermissions(permissionStatus);
  }, [user_all_permissions]);

  console.log(permissions, "this is the permissions");

  const options = [
    { value: "holiday", label: "Holiday" },
    { value: "event", label: "Event" },
  ];

  const handleAddHolidayAndEvents = () => {
    if (eventId && edit) {
      dispatch(
        update_holiday_and_event({
          occasion_name: description
            ? description
            : selected_event_details?.data?.data?.occasion_name,
          occasion_type: type
            ? type
            : selected_event_details?.data?.data?.occasion_type,
          date: date
            ? date
            : new Date(selected_event_details?.data?.data?.date)
                .toISOString()
                .split("T")[0],
          id: eventId,
        })
      );
    } else {
      if (date && type && description) {
        dispatch(
          add_holiday_and_event({
            occasion_name: description,
            occasion_type: type,
            date: date,
          })
        );
      } else {
        toast.error(`All fields are required to add new ${type} !!`);
      }
    }
  };

  useEffect(() => {
    if (is_holiday_created?.isSuccess) {
      toast.success(is_holiday_created?.message?.message);
      dispatch(clear_holiday_and_events_state());
      dispatch(get_all_holidays_and_events({ year: 2024 }));
      setShow(false);
    }
    if (is_holiday_created?.isError) {
      toast.error(is_holiday_created?.error?.message);
      dispatch(clear_holiday_and_events_state());
      setShow(false);
    }
  }, [is_holiday_created]);

  useEffect(() => {
    if (eventId && edit) {
      dispatch(get_selected_holiday_and_event_details({ id: eventId }));
    }
  }, [edit, eventId]);

  useEffect(() => {
    if (selected_event_details?.isSuccess) {
      setDate(
        new Date(selected_event_details.data.data.date)
          .toISOString()
          .split("T")[0]
      );
      setType(selected_event_details?.data?.data?.occasion_type);
      setDiscription(selected_event_details?.data?.data?.occasion_name);
    }
  }, [selected_event_details]);

  useEffect(() => {
    if (is_holiday_updated?.isSuccess) {
      toast.success("Holiday Updated Successfully");
      dispatch(clear_get_selected_holiday_and_event_state());
      dispatch(clear_updated_holiday_and_event_state());
      dispatch(clear_holiday_and_events_state());
      dispatch(get_all_holidays_and_events({ year: 2024 }));
      setShow(false);
    }
    if (is_holiday_updated?.isError) {
      toast.success(is_holiday_updated?.error?.message);
      dispatch(clear_get_selected_holiday_and_event_state());
      dispatch(clear_updated_holiday_and_event_state());
      dispatch(clear_holiday_and_events_state());
      setShow(false);
    }
  }, [is_holiday_updated]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 since months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="custom_modal_width"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="custom_modal_container"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3 className="heading">
            {edit ? "Edit Holiday & Events" : "Holiday & Events"}
          </h3>
          <div className="form-group new_employee_form_group ">
            <label className="modal_label">Date</label>
            <input
              className="candidate-register-input form-control mt-2"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              min={getCurrentDate()}
            />
          </div>
          <div className="form-group new_employee_form_group mt-2">
            <label className="modal_label">Type</label>
            <div className="mt-2">
              <CustomSelectComp
                optionsData={options}
                changeHandler={(e) => setType(e.value)}
                value={type}
              />
            </div>
          </div>
          <div className="form-group new_employee_form_group mt-2">
            <label className="modal_label">Description</label>
            <textarea
              rows={5}
              className="candidate-register-input form-control mt-2"
              value={description}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!edit && permissions?.can_create && (
            <button
              className="cmn_Button_style"
              onClick={() => handleAddHolidayAndEvents()}
            >
              {is_holiday_created?.isLoading && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {"Add Event"}
            </button>
          )}
          {edit && permissions?.can_update && (
            <button
              className="cmn_Button_style"
              onClick={() => handleAddHolidayAndEvents()}
            >
              {is_holiday_updated?.isLoading && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {"update"}
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddEventModal;
