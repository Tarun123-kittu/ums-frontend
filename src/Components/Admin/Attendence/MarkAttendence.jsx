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

const localizer = momentLocalizer(moment);
// const myEventsList = [
//   {
//     id: 0,
//     title: "Morning Meeting",
//     start: new Date(2024, 9, 10, 9, 0),
//     end: new Date(2024, 9, 10, 10, 0),
//     color: "#FF5733", // Custom color for this event
//   },
//   {
//     id: 1,
//     title: "Client Presentation",
//     start: new Date(2024, 9, 10, 10, 30),
//     end: new Date(2024, 9, 10, 11, 30),
//     color: "#33C1FF", // Another custom color
//   },
//   {
//     id: 2,
//     title: "Lunch with Team",
//     start: new Date(2024, 10, 10, 12, 0),
//     end: new Date(2024, 10, 10, 13, 0),
//     color: "#8E44AD",
//   },
//   {
//     id: 3,
//     title: "Project Review",
//     start: new Date(2024, 10, 10, 14, 0),
//     end: new Date(2024, 10, 10, 15, 0),
//     color: "#28B463",
//   },
// ];
const MarkAttendence = () => {
  const dispatch = useDispatch();
  const { show } = useAppContext();
  const [day, setDay] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [login_mobile, setLogin_mobile] = useState(false);
  const [logout_mobile, setLogout_mobile] = useState(false);
  const [mark_attendance_time, setMark_attendance_time] = useState("");
  const [timeDifference, setTimeDifference] = useState("");
  const [myEventsList, setMyEventList] = useState([])
  const mark_attendance_state = useSelector((store) => store.MARK_ATTENDANCE);
  const attendance_time = useSelector((store) => store.TODAY_ATTENDANCE_TIME);
  const events_birthays_holidays = useSelector((store) => store.HOLIDAY_BIRTHDAY_EVENT)
  console.log(events_birthays_holidays, "this is the events birthdaya and events")
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
      setMyEventList(events_birthays_holidays?.data?.data)
    }
  }, [events_birthays_holidays])

  useEffect(() => {
    dispatch(get_today_attendance_time());
    dispatch(get_holiay_birthday_events())
  }, []);

  useEffect(() => {
    if (attendance_time?.isSuccess) {
      setMark_attendance_time(attendance_time?.data?.data[0]?.in_time);
    }
  }, [attendance_time]);

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

  const addItem = () => {
    if (inputValue.trim()) {
      setItemsString((prev) =>
        prev ? `${prev}\n${inputValue.trim()}` : inputValue.trim()
      );
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  const handleUnmarkAttendance = () => {
    dispatch(
      unmark_attendance({
        report: itemsString,
        logout_device: deviceType,
        logout_mobile,
      })
    );
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = event.color || '#3174ad'; // Default color if no color is provided
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  };
  return (
    <section>
      <div>
        <Notification view={true} />
        <div className="admin_dashboard_outer mt-0">
          {!mark_attendance_time && (
            <div className="attendence_submit cmn_card">
              <h4>Mark Attendence</h4>
              <div className="row align-items-end row-gap-2">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="Day">Day</label>
                    <input
                      type="text"
                      placeholder="tuesday"
                      className="form-control"
                      value={moment().format("dddd")}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="text"
                      placeholder="08-10-2024"
                      className="form-control"
                      value={moment(date).format("DD-MM-YYYY")}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                      type="text"
                      placeholder="01:09:26 PM"
                      className="form-control"
                      value={formatTime(date)}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-3 text-center">
                  <button
                    className="cmn_bg_btn"
                    onClick={() =>
                      dispatch(
                        mark_attendance({
                          login_device: deviceType,
                          login_mobile,
                        })
                      )
                    }
                  >
                    Mark Your Attendence
                  </button>
                </div>
              </div>
            </div>
          )}
          {mark_attendance_time && (
            <div className="attendence_submit cmn_card">
              <h4>Ready To Go?</h4>
              <div className="row align-items-end row-gap-2">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="Day">Day</label>
                    <input
                      type="text"
                      placeholder="tuesday"
                      className="form-control"
                      value={moment().format("dddd")}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="text"
                      placeholder="08-10-2024"
                      className="form-control"
                      value={moment(date).format("DD-MM-YYYY")}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="Intime">In Time</label>
                    <input
                      type="text"
                      placeholder="01:09:26 PM"
                      className="form-control"
                      value={mark_attendance_time}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="CurrentTime">Current Time</label>
                    <input
                      type="text"
                      placeholder="01:09:26 PM"
                      className="form-control"
                      value={timeDifference}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="addTask">Add Your task</label>
                    <input
                      type="text"
                      placeholder="Add you task"
                      className="form-control"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="searchtask">Add task</label>
                    <textarea
                      name=""
                      id=""
                      className="form-control"
                      value={itemsString}
                      rows={itemsString.split("\n").length + 1}
                      cols={30}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12 text-center mt-2">
                  <button
                    className="cmn_bg_btn"
                    onClick={() => handleUnmarkAttendance()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="mt-3 cmn_card">
            <Calendar
              localizer={localizer}
              events={myEventsList}
              startAccessor="start"
              endAccessor="end"
              views={{
                month: true,
                agenda: true, // Keeping Agenda but customizing
              }}
              defaultView="month" // Set agenda as default view
              style={{ height: 850 }}
              eventPropGetter={eventStyleGetter}
              messages={{
                agenda: 'List', // Renaming "Agenda" to "List"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarkAttendence;
