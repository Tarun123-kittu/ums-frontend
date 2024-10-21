import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Utils/appContecxt";
import "./adminDashboard.css";

import { useSelector, useDispatch } from "react-redux";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";
import { Row, Col } from "react-bootstrap";
import TotalEmployee from "../../assets/t-employee.png";
import Birthday_icon from "../../assets/birthday_icon.svg";
import Table from "react-bootstrap/Table";
import UseAllUsernames from "../../Utils/customHooks/useAllUserNames";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { total_present_employees } from "../../../utils/redux/attendanceSlice/presentEmployees";
import { get_current_and_next_month_events } from "../../../utils/redux/holidayAndEventsSlice/getCurrentAndNextMonthEvents";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";
import { get_employee_leave_count } from "../../../utils/redux/dashboardSlice/getEmployeesOnLeave";
import { get_dashboard_interview_overview } from "../../../utils/redux/dashboardSlice/getDashboardInterviewOverview";
import { get_dashboard_attendence_graph } from "../../../utils/redux/dashboardSlice/getDashboardAttendenceGraph";
import { get_leaves_on_dashboard } from "../../../utils/redux/dashboardSlice/getDashboardLeave";

const AdminDashboard = () => {
  UseAllUsernames();
  const permissions = UsePermissions("Dashboard");
  const dispatch = useDispatch();
  const { show } = useAppContext();
  const navigate = useNavigate();
  const [interview_count, setInterview_count] = useState(null);
  const [attendence_graph_data, setAttendence_graph_data] = useState();
  const all_userNames = useSelector((store) => store.ALL_USERNAMES);
  const present_employee = useSelector((store) => store.PRESENT_EMPLOYEES);
  const current_and_next_month_events = useSelector(
    (store) => store.CURRENT_AND_NEXT_MONTH_EVENTS
  );
  const employee_on_leave = useSelector((store) => store.EMPLOYEE_LEAVE_COUNT);
  const interviews_overview = useSelector(
    (store) => store.DASHBOARD_INTERVIEWOVERVIEW
  );
  const attendence_graph = useSelector(
    (store) => store.DASHBOARD_ATTENDENCE_GRAPH
  );
  const dashboard_leaves = useSelector(
    (store) => store.GET_LEAVES_ON_DASHBOARD
  );

  useEffect(() => {
    dispatch(total_present_employees());
    dispatch(get_current_and_next_month_events());
    getInterviews();
    dispatch(get_employee_leave_count());
    dispatch(get_dashboard_interview_overview());
    dispatch(get_dashboard_attendence_graph());
    dispatch(get_leaves_on_dashboard());
  }, []);

  const getInterviews = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("ums_token")
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.REACT_APP_BACKEN_URL}/get_all_interviews`,
      requestOptions
    );

    const result = await response.json();
    setInterview_count(result?.data?.interviewCount);
  };

  useEffect(() => {
    let newArr = [];
    if (attendence_graph?.isSuccess) {
      attendence_graph?.data?.message?.map((time) => {
        newArr.push([time?.user_name, parseFloat(time?.total_time)]);
      });
    }
    setAttendence_graph_data(newArr);
  }, [attendence_graph]);

  const options = {
    chart: {
      type: "pie",
      height: 245,
      width: 600,
    },
    series: [
      {
        name: "Share",
        colorByPoint: true,
        data: [
          {
            name: "Face to Face Round",
            y: parseInt(interviews_overview?.data?.data?.faceToFaceRound || 0),
          },
          {
            name: "Final Round",
            y: parseInt(interviews_overview?.data?.data?.finalRound || 0),
          },
          {
            name: "HR Round",
            y: parseInt(interviews_overview?.data?.data?.hrRound || 0),
          },
          {
            name: "Technical Round",
            y: parseInt(interviews_overview?.data?.data?.technicalRound || 0),
          },
          {
            name: "On Hold",
            y: parseInt(interviews_overview?.data?.data?.onHold || 0),
          },
          {
            name: "Pending",
            y: parseInt(interviews_overview?.data?.data?.pending || 0),
          },
          {
            name: "Rejected",
            y: parseInt(interviews_overview?.data?.data?.rejected || 0),
          },
          {
            name: "Selected",
            y: parseInt(interviews_overview?.data?.data?.selected || 0),
          },
          {
            name: "Total Leads",
            y: parseInt(interviews_overview?.data?.data?.totalLeads || 0),
          },
        ],
      },
    ],
  };

  const chartOptions = {
    chart: {
      type: "column",
      height: 280,
    },
    title: {
      text: "Employee Attendance",
    },
    xAxis: {
      type: "category",
      labels: {
        autoRotation: [-45, -90],
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Login Hours",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Total login time: <b>{point.y:.1f} hours</b>",
    },
    series: [
      {
        name: "Population",
        colorByPoint: true,
        colors: [
          "#9b20d9",
          "#9215ac",
          "#861ec9",
          "#7a17e6",
          "#7010f9",
          "#691af3",
          "#6225ed",
          "#5b30e7",
          "#533be1",
          "#4c46db",
          "#4551d5",
          "#3e5ccf",
          "#3667c9",
          "#2f72c3",
          "#277dbd",
          "#1f88b7",
          "#1693b1",
          "#0a9eaa",
          "#03c69b",
          "#00f194",
        ],
        data: attendence_graph_data,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#FFFFFF",
          inside: true,
          verticalAlign: "top",
          format: "{point.y:.1f}", // One decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  };

  return permissions?.can_view ? (
    <section>
      <Notification />
      <div
        className={`${
          localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "
        }min-vh-100 lightgray_bg ${show ? "cmn_margin" : "cmn_margin_outer"}`}
      >
        <div className="dashboard_outer pt-3">
          <Row className="m-0 mb-3">
            <Col lg={7}>
              <div className="card-cmn">
                <h4>Today Updates</h4>
                <ul className="data_card m-0">
                  <li>
                    <img src={TotalEmployee} alt="employee" />
                    <h4>{all_userNames?.data?.data?.length}</h4>
                    <p>Total Employee</p>
                    <span onClick={() => navigate("/employee")}>
                      View Details
                    </span>
                  </li>
                  <li>
                    <img src={TotalEmployee} alt="employee" />
                    <h4>
                      {
                        present_employee?.total_employee
                          ?.total_present_employees?.presentEmployees
                      }
                    </h4>
                    <p>Present</p>
                    <span onClick={() => navigate("/todayAttendence")}>
                      View Details
                    </span>
                  </li>
                  <li>
                    <img src={TotalEmployee} alt="employee" />
                    <h4>
                      {employee_on_leave?.data?.data?.totalAcceptedLeaves}
                    </h4>
                    <p>Total Leave</p>
                    <span onClick={() => navigate("/leaveRequest")}>
                      View Details
                    </span>
                  </li>
                  <li>
                    <img src={TotalEmployee} alt="employee" />
                    <h4>{interview_count || 0}</h4>
                    <p>Total Interviews</p>
                    <span onClick={() => navigate("/interviewLead")}>
                      View Details
                    </span>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={5}>
              <div className="card-cmn">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
            </Col>
          </Row>
          <Row className="m-0">
            <Col lg={8}>
              <div className="card-cmn mb-3">
                <h4>Leaves Applied</h4>
                <Table responsive className="leave_table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Date of Application</th>
                      <th>Application type</th>
                      <th>Duration</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard_leaves?.data?.data?.map((leave, i) => {
                      return (
                        <tr>
                          <td>
                            <h5 className="mb-0">{leave?.name}</h5>
                            <span>{leave?.position}</span>
                          </td>
                          <td>
                            {new Date(leave?.date_of_application).toISOString()}
                          </td>
                          <td>{leave?.type}</td>
                          <td>{leave?.duration}</td>
                          <td>
                            <button className="table_cmn pending">
                              {leave?.status}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <div className="card-cmn">
                <h4>Employee Attendance</h4>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              </div>
            </Col>
            <Col lg={4}>
              <div className="card-cmn">
                <h4>Employee Attendance</h4>
                <ul className="event_list">
                  {current_and_next_month_events?.data?.data?.currentMonth
                    ?.slice(0, 6)
                    .map((record, i) => {
                      const user = record?.title?.split("'s");

                      return (
                        <li key={i}>
                          <img src={Birthday_icon} alt="employee" />
                          <div>
                            <h4>{user[0]}</h4>{" "}
                            <span>{formatDate(record?.start)}</span>{" "}
                          </div>
                          <p>{user[1]}</p>
                        </li>
                      );
                    })}
                </ul>
                <h5 className="next-event">November 2024</h5>
                <ul className="event_list">
                  {current_and_next_month_events?.data?.data?.nextMonth
                    ?.slice(0, 3)
                    ?.map((record, i) => {
                      const user = record?.title?.split("'s");
                      return (
                        <li key={i}>
                          <img src={Birthday_icon} alt="employee" />
                          <div>
                            <h4>{user[0]}</h4>
                            <span>{formatDate(record?.start)}</span>
                          </div>
                          <p>{user[1]}</p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  ) : (
    <UnauthorizedPage />
  );
};

export default AdminDashboard;
