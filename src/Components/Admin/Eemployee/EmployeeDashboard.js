import React from "react";
import './employeeDashboard.css'
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
    
        <div className="p-4 bg-light min-vh-100 w-100">
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
                            <h4 className="upcoming-month-h4" >October, 2024</h4>
                            
                            <ul className="list-unstyled mt-2 mb-4">
                                <li className="border-bottom py-4">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <img src={Birthday_icon} alt="Event Icon" className="" style={{ width: '50px', height: '50px' }} />
                                           <div className=" flex flex-col">
                                           <span className=" employee-even-name" >Event Name</span>
                                           <p className="employee-event-date">11/05/2024</p>
                                        </div>
                                        </div>
                                        <span className="employee-event-type" >Anniversary</span>
                                    </div>
                                </li>
                                {/* Repeat for other events as needed */}
                            </ul>
                            <h4 className="upcoming-month-h4">November, 2024</h4>
                            <ul className="list-unstyled mt-2 mb-4">
                                <li className="border-bottom py-4">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <img src={Birthday_icon} alt="Event Icon" className="" style={{ width: '50px', height: '50px' }} />
                                           <div className=" flex flex-col">
                                           <span className=" employee-even-name" >Event Name</span>
                                           <p className="employee-event-date">11/05/2024</p>
                                        </div>
                                        </div>
                                        <span className="employee-event-type" >Anniversary</span>
                                    </div>
                                </li>
                                <li className="border-bottom py-4">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <img src={Birthday_icon} alt="Event Icon" className="" style={{ width: '50px', height: '50px' }} />
                                           <div className=" flex flex-col">
                                           <span className=" employee-even-name" >Event Name</span>
                                           <p className="employee-event-date">11/05/2024</p>
                                        </div>
                                        </div>
                                        <span className="employee-event-type" >Anniversary</span>
                                    </div>
                                </li>
                             
                            </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default EmployeeDashboard;
