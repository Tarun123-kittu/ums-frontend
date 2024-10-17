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
import checkPermissions from "../../Utils/checkPermissions";

const AdminDashboard = () => {
  UseAllUsernames();
  const dispatch = useDispatch();
  const { show } = useAppContext();
  const navigate = useNavigate();
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );
  console.log(user_all_permissions, "this is the user all permission");
  const all_userNames = useSelector((store) => store.ALL_USERNAMES);
  const present_employee = useSelector((store) => store.PRESENT_EMPLOYEES);
  const current_and_next_month_events = useSelector(
    (store) => store.CURRENT_AND_NEXT_MONTH_EVENTS
  );
  const [permissions, setPermissions] = useState({
    can_view: false,
    can_create: false,
    can_delete: false,
    can_update: false,
  });

  useEffect(() => {
    const permissionStatus = checkPermissions(
      "Dashboard",
      user_all_permissions?.roles_data,
      user_all_permissions?.permission_data
    );
    setPermissions(permissionStatus);
  }, [user_all_permissions]);

  console.log(permissions, "this is the permissions");

  useEffect(() => {
    if (localStorage.getItem("roles")?.includes("Employee")) {
      navigate("/mark-attendence");
    }
  }, [navigate]);
  useEffect(() => {
    dispatch(total_present_employees());
    dispatch(get_current_and_next_month_events());
  }, []);

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
          { name: "Samsung", y: 27.79, selected: true, sliced: true },
          { name: "Apple", y: 27.34 },
          { name: "Xiaomi", y: 10.87 },
          { name: "Huawei", y: 8.48 },
          { name: "Oppo", y: 5.38 },
          { name: "Vivo", y: 4.17 },
          { name: "Realme", y: 2.57 },
          { name: "Unknown", y: 2.45 },
          { name: "Motorola", y: 2.22 },
          { name: "LG", y: 1.53 },
          { name: "Other", y: 7.2 },
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
        text: "Population (millions)",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Population in 2021: <b>{point.y:.1f} million</b>",
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
        data: [
          ["Tokyo", 37.33],
          ["Delhi", 31.18],
          ["Shanghai", 27.79],
          ["Sao Paulo", 22.23],
          ["Mexico City", 21.91],
          ["Dhaka", 21.74],
          ["Cairo", 21.32],
          ["Beijing", 20.89],
          ["Mumbai", 20.67],
          ["Osaka", 19.11],
          ["Karachi", 16.45],
          ["Chongqing", 16.38],
          ["Istanbul", 15.41],
          ["Buenos Aires", 15.25],
          ["Kolkata", 14.974],
          ["Kinshasa", 14.97],
          ["Lagos", 14.86],
          ["Manila", 14.16],
          ["Tianjin", 13.79],
          ["Guangzhou", 13.64],
        ],
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

  return (
    <section>
      <Notification />
      <div
        className={`min-vh-100 lightgray_bg ${
          show ? "cmn_margin" : "cmn_margin_outer"
        }`}
      >
        {/* <div className="admin_dashboard_container"></div>
        <div className="admin_dashboard_outer">
          <div className="info_header d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Information About Dinesh Kumar</h3>
            <div className="d-flex justify-content-end gap-2">
              <div className="cmn_edit_outer darkGray_bg">
                <PiArrowBendDownLeftBold />
              </div>
              <div className="cmn_edit_outer yellow_bg">
                <FiEdit />
              </div>
              <div className="red_bg cmn_edit_outer">
                <RiDeleteBin6Line />
              </div>
            </div>
          </div>

          <div className="user_info_wrapper">
            <ul className="user_info_list_outer">
              <li className="d-flex  info_content">
                <h3 className="heading_style">Name</h3>
                <h3 className="heading_style">John</h3>
                <h3 className="heading_style">Email</h3>
                <h3 className="heading_style">john@gmail.com</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Mobile</h3>
                <h3 className="heading_style">45454534</h3>
                <h3 className="heading_style">User Name</h3>
                <h3 className="heading_style">john</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">DOB</h3>
                <h3 className="heading_style">12-2-1998</h3>
                <h3 className="heading_style">DOJ</h3>
                <h3 className="heading_style">07-2-2024</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Skype</h3>
                <h3 className="heading_style">DineshKumar@ultivic.com</h3>
                <h3 className="heading_style">Ultivic email</h3>
                <h3 className="heading_style">john@ultivic.com</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Position</h3>
                <h3 className="heading_style">Intern</h3>
                <h3 className="heading_style">Technology/Department</h3>
                <h3 className="heading_style">Backend</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Staus</h3>
                <h3 className="heading_style">On Probition</h3>
                <h3 className="heading_style">Salary</h3>
                <h3 className="heading_style">1</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">
                  Emergency Contact Relationship
                </h3>
                <h3 className="heading_style">Father</h3>
                <h3 className="heading_style">Emergency Contact Name</h3>
                <h3 className="heading_style">Harry</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Emergency Contact</h3>
                <h3 className="heading_style">465576767</h3>
                <h3 className="heading_style">Bank Name</h3>
                <h3 className="heading_style">465576767</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Account Number</h3>
                <h3 className="heading_style">2343423243434</h3>
                <h3 className="heading_style">Bank IFC Code</h3>
                <h3 className="heading_style">2343423243434</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Increment Date</h3>
                <h3 className="heading_style">2025-08-07 00:00:00</h3>
                <h3 className="heading_style">Increment Date</h3>
                <h3 className="heading_style">2025-08-07 00:00:00</h3>
              </li>
              <li className="d-flex  info_content">
                <h3 className="heading_style">Address</h3>
                <h3 className="heading_style">Mohali tdi city sector 118</h3>
              </li>
            </ul>
            <div className="table-responsive mt-4">
              <h3 className="heading_style">Documents</h3>
              <table className="employee_detail_table mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Document Name</th>
                    <th>Verified At</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John</td>
                    <td>sd</td>
                    <td>12:00</td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
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
                    <h4>40</h4>
                    <p>Total Employee</p>
                    <span>View Details</span>
                  </li>
                  <li>
                    <img src={TotalEmployee} alt="employee" />
                    <h4>40</h4>
                    <p>Total Employee</p>
                    <span>View Details</span>
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
                    <tr>
                      <td>
                        <h5 className="mb-0">Gurjeet kumar</h5>
                        <span> Android Developer</span>
                      </td>
                      <td>10/10/2024</td>
                      <td>Casual Leaves</td>
                      <td>Employee Name</td>
                      <td>
                        <button className="table_cmn pending">pending</button>
                      </td>
                    </tr>
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
  );
};

export default AdminDashboard;
