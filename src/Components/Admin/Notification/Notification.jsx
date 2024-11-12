import React from "react";
import profile_img from "../../assets/userpic.svg";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./notification.css";
import logo from "../../assets/logo1.png";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const Notification = ({ view }) => {
  const navigate = useNavigate();
  return (
    <section className="h-20 notification_outer">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center ms-auto">
          <IoMdNotificationsOutline className="me-3 -mt-4" size={24} />

          <Dropdown>
            <Dropdown.Toggle className="dropdown_color">
              <img
                src={profile_img}
                height={"50px"}
                width={"50px"}
                alt="notification"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/change-password")}>
                Change Password
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </section>
  );
};

export default Notification;
