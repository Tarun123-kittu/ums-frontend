import React, { useEffect,useState } from "react";
import './employeeDashboard.css'
import { useAppContext } from "../../Utils/appContecxt";
import Notification from "../Notification/Notification";
import MarkAttendence from "../Attendence/MarkAttendence";
import EmployeeTodoList from "./EmployeeToDoList";
import LeaveRecord from "./LeaveRecord";
import EmployeeOnLeave from "./EmployeeOnLeave";
import Birthday_icon from "../../assets/birthday_icon.svg";
import event_icon from "../../assets/event_icon.svg";
import no_event from "../../assets/no_event.svg";
import anniversary_icon from "../../assets/anniversry_icon.svg";
import { get_current_and_next_month_events } from "../../../utils/redux/holidayAndEventsSlice/getCurrentAndNextMonthEvents";
import { useSelector, useDispatch } from "react-redux";
import Alert from "./Alert"
import { io } from 'socket.io-client';

const EmployeeDashboard = () => {
    const { show } = useAppContext();
    const dispatch = useDispatch()
    const [socket, setSocket] = useState(null);
    const [lateData,setLateData] = useState()
    console.log(lateData,"this is the socket")
    const current_and_next_month_events = useSelector(
        (store) => store.CURRENT_AND_NEXT_MONTH_EVENTS
    );

    useEffect(() => {
        dispatch(get_current_and_next_month_events())
    }, [])

    useEffect(() => {
        const socketConnection = io(process.env.REACT_APP_SOCKET_SERVER_URL);
        setSocket(socketConnection);
        socketConnection.on('late_threshold_exceeded', (data) => {
            setLateData(data)
        });
    
        return () => {
          socketConnection.disconnect();
        };
      }, []);

    const today = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentMonthName = monthNames[today.getMonth()];
    const currentYear = today.getFullYear();

    let nextMonthIndex = today.getMonth() + 1;
    let nextYear = today.getFullYear();

    if (nextMonthIndex >= 12) {
        nextMonthIndex = 0;
        nextYear++;
    }

    const nextMonthName = monthNames[nextMonthIndex];

    return (
        <div
            className={`${localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "} min-vh-100 bg-light ${show ? "cmn_margin" : "cmn_margin_outer"}`}
        >
            <Notification />

            <div className="p-4 bg-light min-vh-100 w-100">
            {lateData?.message && <Alert message={lateData?.message}/>}
                {/* Dashboard Header */}
                <h1 className="maine-heading" >Dashboard</h1>

                <div className="row">
                    {/* Left Section: Attendance & Leave Record */}
                    <div className="col-lg-8 mb-4">
                        {/* Attendance Section */}
                        <MarkAttendence />

                        {/* Leave Record Section */}
                        <LeaveRecord />

                        {/* Leave Roster Table */}
                        <EmployeeOnLeave />
                    </div>

                    {/* Right Section: To-Do List & Upcoming Events */}
                    <div className="col-lg-4">
                        {/* To-Do List Section */}
                        <div className="dashboard-sections">

                            <EmployeeTodoList />

                        </div>

                        {/* Upcoming Events Section */}
                        <div className="dashboard-sections mt-4">
                            <h3 className="heading-h3">Upcoming Events </h3>
                            <h4 className="upcoming-month-h4" >{currentMonthName}, {currentYear}</h4>

                            {current_and_next_month_events?.data?.data?.currentMonth?.length === 0 ? <div className="p-3 text-center"> <img src={no_event} className="m-auto" alt="no event" /></div> : current_and_next_month_events?.data?.data?.currentMonth?.map((leave, i) => {
                                const user = leave?.title?.split("'s") || [];
                                const eventType = user[1]?.trim() || "Unknown";
                                return (
                                    <ul key={i} className="list-unstyled mt-2 mb-4">
                                        <li className="border-bottom py-4">
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex align-items-center gap-3">
                                                    {eventType === "Anniversary" && (
                                                        <img src={Birthday_icon} alt="Anniversary Icon" style={{ width: '50px', height: '50px' }} />
                                                    )}
                                                    {eventType === "Birthday" && (
                                                        <img src={anniversary_icon} alt="Birthday Icon" style={{ width: '50px', height: '50px' }} />
                                                    )}
                                                    {eventType === "Holiday" && (
                                                        <img src={event_icon} alt="Holiday Icon" style={{ width: '50px', height: '50px' }} />
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span className="employee-even-name">{leave?.title}</span>
                                                        <p className="employee-event-date">{leave?.date}</p>
                                                    </div>
                                                </div>
                                                <span className="employee-event-type">{eventType}</span>
                                            </div>
                                        </li>
                                    </ul>
                                )
                            })}
                            <h4 className="upcoming-month-h4">{nextMonthName}, {currentYear !== nextYear ? nextYear : currentYear}</h4>
                            {current_and_next_month_events?.data?.data?.nextMonth?.length === 0 ? <div className="p-3 text-center"> <img src={no_event} className="m-auto" src={no_event} alt="no event" /> </div> : current_and_next_month_events?.data?.data?.nextMonth?.map((leave, i) => {
                                const user = leave?.title?.split("'s") || [];
                                const eventType = user[1]?.trim() || "Unknown";
                                return (
                                    <ul key={i} className="list-unstyled mt-2 mb-4">
                                        <li className="border-bottom py-4">
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex align-items-center gap-3">
                                                    {eventType === "Anniversary" && (
                                                        <img src={Birthday_icon} alt="Anniversary Icon" style={{ width: '50px', height: '50px' }} />
                                                    )}
                                                    {eventType === "Birthday" && (
                                                        <img src={anniversary_icon} alt="Birthday Icon" style={{ width: '50px', height: '50px' }} />
                                                    )}
                                                    {eventType === "Holiday" && (
                                                        <img src={event_icon} alt="Holiday Icon" style={{ width: '50px', height: '50px' }} />
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span className="employee-even-name">{leave?.title}</span>
                                                        <p className="employee-event-date">{leave?.date}</p>
                                                    </div>
                                                </div>
                                                <span className="employee-event-type">{eventType}</span>
                                            </div>
                                        </li>
                                    </ul>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default EmployeeDashboard;
