import React from "react";
import { useAppContext } from "../../Utils/appContecxt";
import Notification from "../Notification/Notification";
import MarkAttendence from "../Attendence/MarkAttendence";
import EmployeeTodoList from "./EmployeeToDoList";
import LeaveRecord from "./LeaveRecord";
import EmployeeOnLeave from "./EmployeeOnLeave";
import Birthday_icon from "../../assets/birthday_icon.svg";

const EmployeeDashboard = () => {
    const { show } = useAppContext();

    return (
        <div
        className={`${localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "} min-vh-100 bg-light ${show ? "cmn_margin" : "cmn_margin_outer"}`}
    >
        <Notification />
    
        <div className="p-4 py-3 bg-light min-vh-100 w-100">
            {/* Dashboard Header */}
            <h1 className="display-4 mb-4" style={{ fontSize: '38px', fontWeight: 600, lineHeight: '40px' }}>Dashboard</h1>
    
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
                    <div className="card mb-4">
                        <div className="card-body">
                            <EmployeeTodoList />
                        </div>
                    </div>
    
                    {/* Upcoming Events Section */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="h6 font-weight-bold">October, 2024</h4>
                            <h5 className="h6 font-weight-bold text-secondary">Upcoming Events</h5>
                            <ul className="list-unstyled mt-3">
                                <li className="border-bottom py-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <img src={Birthday_icon} alt="Event Icon" className="me-2" style={{ width: '24px', height: '24px' }} />
                                            <span className="font-weight-semibold text-dark">Event Name</span>
                                        </div>
                                        <span className="text-muted small">Anniversary</span>
                                    </div>
                                    <p className="text-muted small mt-1 mb-0">11/05/2024</p>
                                </li>
                                {/* Repeat for other events as needed */}
                            </ul>
                            <h4 className="h6 font-weight-bold mt-4">November, 2024</h4>
                            <ul className="list-unstyled mt-3">
                                <li className="border-bottom py-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <img src={Birthday_icon} alt="Event Icon" className="me-2" style={{ width: '24px', height: '24px' }} />
                                            <span className="font-weight-semibold text-dark">Event Name</span>
                                        </div>
                                        <span className="text-muted small">Anniversary</span>
                                    </div>
                                    <p className="text-muted small mt-1 mb-0">11/05/2024</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default EmployeeDashboard;
