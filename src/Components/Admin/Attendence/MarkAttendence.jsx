import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  mark_attendance,
  clear_mark_attendance_state,
} from "../../../utils/redux/attendanceSlice/markAttendances";
import { get_today_attendance_time } from "../../../utils/redux/attendanceSlice/getUserTodayAttendaceTime";
import toast from "react-hot-toast";
import getTimeDifference from "../../Utils/getTimeDiffrence/getTimeDiffrenceAttendance";
import {
  unmark_attendance,
  clear_unmark_attendance_slice,
} from "../../../utils/redux/attendanceSlice/unmarkAttendance";
import Notification from "../Notification/Notification";
import { get_holiay_birthday_events } from "../../../utils/redux/holidayAndEventsSlice/getAlBirthdayHolidayEvents";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);
const MarkAttendence = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show } = useAppContext();
  const [day, setDay] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [login_mobile, setLogin_mobile] = useState(false);
  const [logout_mobile, setLogout_mobile] = useState(false);
  const [mark_attendance_time, setMark_attendance_time] = useState("");
  const [timeDifference, setTimeDifference] = useState("");
  const [myEventsList, setMyEventList] = useState([]);
  const mark_attendance_state = useSelector((store) => store.MARK_ATTENDANCE);
  const attendance_time = useSelector((store) => store.TODAY_ATTENDANCE_TIME);
  const events_birthays_holidays = useSelector(
    (store) => store.HOLIDAY_BIRTHDAY_EVENT
  );
  const umnark_attendence_state = useSelector(
    (state) => state.UNMARK_ATTENDANCE
  );
  const [itemsString, setItemsString] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
      setDeviceType("Mobile");
      setLogin_mobile(true);
      setLogout_mobile(true);
    } else {
      setDeviceType("PC");
      setLogin_mobile(false);
      setLogout_mobile(false);
    }
  }, []);

  useEffect(() => {
    if (events_birthays_holidays?.isSuccess) {
      setMyEventList(events_birthays_holidays?.data?.data);
    }
  }, [events_birthays_holidays]);

  useEffect(() => {
    dispatch(get_today_attendance_time());
    dispatch(get_holiay_birthday_events());
    localStorage.removeItem("tab");
  }, []);

  useEffect(() => {
    if (attendance_time?.isSuccess) {
      setMark_attendance_time(attendance_time?.data?.data[0]?.in_time);
      if (attendance_time?.data?.data[0]?.out_time) {
        navigate("/employee-attendence-report");
      }
    }
  }, [attendance_time]);

  if (!localStorage.getItem("ums_token")) {
    navigate("/");
  }

  useEffect(() => {
    if (umnark_attendence_state?.isSuccess) {
      toast.success("Logged out successfully");
      navigate("/employee-attendence-report", { state: { valid: true } });
      dispatch(clear_unmark_attendance_slice());
    }
    if (umnark_attendence_state?.isError) {
      toast.error(umnark_attendence_state?.error?.message);
      dispatch(clear_unmark_attendance_slice());
    }
  }, [umnark_attendence_state]);

  useEffect(() => {
    if (mark_attendance_state?.isSuccess) {
      toast.success("Attendance marked successfully !!");
      dispatch(get_today_attendance_time());
      dispatch(clear_mark_attendance_state());
    }
  }, [mark_attendance_state]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = getTimeDifference(mark_attendance_time);
      setTimeDifference(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [mark_attendance_time]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInputValue((prevValue) => prevValue + "\n");
    }
  };

  const handleUnmarkAttendance = () => {
    dispatch(
      unmark_attendance({
        report: inputValue,
        logout_device: deviceType,
        logout_mobile,
      })
    );
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = event.color || "#3174ad"; // Default color if no color is provided
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };
  return (
    <section>
      <div class="container py-2" >
        <div class="mt-0">
          <div class="bg-white p-4 rounded mb-4" style={{ border: '1px solid #0000000F' }}>
            <h3 class="h5 font-weight-semibold text-danger">Good Morning, Hankish Lohia</h3>
            <p class="font-weight-bold text-muted" style={{ fontSize: '22px', fontWeight: 600, lineHeight: '22px', marginTop: '14px' }}>Mark Your Attendance</p>
            <p class="text-muted" style={{ fontSize: '17px', fontWeight: 500, lineHeight: '22px', color: '#687281' }}>Ready to start day with Ultivic</p>

            <div class="d-flex space-x-4 mt-3">
              <div class="col-6 mb-3">
                <label class="text-muted small" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '16px', marginBottom: '14px' }}>Day</label>
                <div class="position-relative">
                  <input
                    type="text"
                    class="form-control pr-4 p-3"
                    placeholder="Enter day"
                  />
                </div>
              </div>

              <div class="col-6 mb-3">
                <label class="text-muted small" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '16px', marginBottom: '14px' }}>Date</label>
                <div class="position-relative">
                  <input
                    type="text"
                    class="form-control pr-5 p-3"
                    placeholder="Enter date"
                  />
                  <svg
                    class="w-5 h-5 text-muted position-absolute end-0 top-50 translate-middle-y"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    style={{marginRight: '35px'}}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.25802 1.51115C7.25802 0.926817 6.71644 0.453125 6.04835 0.453125C5.38027 0.453125 4.83868 0.926817 4.83868 1.51115H3.62901C1.62476 1.51115 0 2.93222 0 4.68521V18.4395C0 20.1925 1.62476 21.6135 3.62901 21.6135H18.1451C20.1493 21.6135 21.7741 20.1925 21.7741 18.4395V4.68521C21.7741 2.93222 20.1493 1.51115 18.1451 1.51115H16.9354C16.9354 0.926817 16.3938 0.453125 15.7257 0.453125C15.0576 0.453125 14.516 0.926817 14.516 1.51115H7.25802ZM19.3547 5.74323V4.68521C19.3547 4.10088 18.8131 3.62719 18.1451 3.62719H16.9354C16.9354 4.21152 16.3938 4.68521 15.7257 4.68521C15.0576 4.68521 14.516 4.21152 14.516 3.62719H7.25802C7.25802 4.21152 6.71644 4.68521 6.04835 4.68521C5.38027 4.68521 4.83868 4.21152 4.83868 3.62719H3.62901C2.96093 3.62719 2.41934 4.10088 2.41934 4.68521V5.74323H19.3547ZM2.41934 7.85927V18.4395C2.41934 19.0238 2.96093 19.4975 3.62901 19.4975H18.1451C18.8131 19.4975 19.3547 19.0238 19.3547 18.4395V7.85927H2.41934Z"
                      fill="#667085"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="d-flex space-x-4 mt-3">
              <div class="col-6 mb-3">
                <label class="text-muted small" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '16px', marginBottom: '14px' }}>Time</label>
                <input
                  type="text"
                  class="form-control p-3"
                />
              </div>
              <div class="col-6 mb-3">
                <label class="text-muted small" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '16px', marginBottom: '14px' }}>Current Time</label>
                <input
                  type="text"
                  class="form-control p-3"
                />
              </div>
            </div>

            <div class="d-flex justify-content-center mt-4">
              <button class="btn btn-danger w-25 py-2 rounded-pill hover:bg-secondary">
                Mark Your Attendance
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default MarkAttendence;