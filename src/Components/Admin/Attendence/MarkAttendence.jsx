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
  const [is_attendence_marked,setIs_attendence_marked] = useState(false)
  console.log(is_attendence_marked,"this is the attendence status")
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
        setIs_attendence_marked(true)
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

  function getDate(date) {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

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

  function getGreeting() {
    const currentHour = new Date().getHours();
  
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }


  function getCurrentDay() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = new Date().getDay();
    return daysOfWeek[currentDay];
  }
  return (
    <section className="dashboard-sections">


      <h3 className="h3 fw-semibold text-danger">{getGreeting()}, Hankish Lohia</h3>
      <p className="fw-bold text-muted" style={{ fontSize: '20px', fontWeight: 600, lineHeight: '22px', marginTop: '14px', marginBottom: '7px' }}>
        Mark Your Attendance
      </p>
      <p className="text-muted" style={{ fontSize: '16px', fontWeight: 500, lineHeight: '22px', color: '#687281', margin:"0" }}>
        Ready to start the day with Ultivic
      </p>

      <div className="row g-4 mt-3">
        <div className="col-6 m-0">
          <label className="text-muted small" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '16px', marginBottom: '14px' }}>
            Day
          </label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control pr-4 p-3"
              value={getCurrentDay()}
              disabled
            />
          </div>
        </div>

        <div className="col-6 m-0">
          <label className="text-muted small" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '16px', marginBottom: '14px' }}>
            Date
          </label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control pr-5 p-3"
              placeholder="Enter date"
              value={getDate(date)}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="row g-4 mt-3">
        <div className="col-6 m-0 pt-2">
          <label className="text-muted small" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '16px', marginBottom: '14px' }}>
            Time
          </label>
          <input
            type="text"
            className="form-control p-3"
            value={(mark_attendance_time && !is_attendence_marked) ? mark_attendance_time : formatTime(date)}
            disabled
          />
        </div>
        {(mark_attendance_time && !is_attendence_marked) && (
          <div className="col-6 m-0 pt-2">
            <label className="text-muted small" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '16px', marginBottom: '14px' }}>
              Current Time
            </label>
            <input
              type="text"
              className="form-control p-3"
              value={timeDifference}
              disabled
            />
          </div>
        )}
      </div>
      
      {(mark_attendance_time && !is_attendence_marked) && (
        <div className="mt-3 pt-2">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Your Task</label>
          <textarea
            value={inputValue}
            rows={inputValue.split("\n").length + 1}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="Enter Your Task"
          ></textarea>
        </div>
      )}

      <div className="d-flex justify-content-center pt-4">
        {(mark_attendance_time && !is_attendence_marked) ? (
          <button onClick={handleUnmarkAttendance} className="btn btn-danger w-25 py-2 rounded-pill hover:bg-secondary">
            Submit
          </button>
        ) : (
          <button
            onClick={() =>
              !is_attendence_marked
                ? dispatch(mark_attendance({ login_device: deviceType, login_mobile }))
                : toast.success("Your Attendance For Today Has been Submitted Successfully")
            }
            className="btn btn-danger w-25 py-2 rounded-pill hover:bg-secondary"
          >
            Mark Your Attendance
          </button>
        )}
      </div>

    </section>
  );
};

export default MarkAttendence;