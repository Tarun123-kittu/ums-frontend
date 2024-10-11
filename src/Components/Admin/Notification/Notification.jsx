import React from "react";
import profile_img from "../../assets/userpic.svg";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./notification.css";
import logo from "../../assets/logo1.png";

const Notification = ({ view }) => {
  return (
    <section className="notification_outer">
      <div className="d-flex justify-content-between align-items-center">
        {view && (
          <div className="text-start sidebar_logo_outer">
            <img
              src={logo}
              height={"40px"}
              width={"158px"}
              className="logo_image"
            />
          </div>
        )}
        <div className="d-flex align-items-center ms-auto">
          <IoMdNotificationsOutline className="me-3" size={24} />
          <img src={profile_img} height={"50px"} width={"50px"} />
        </div>
      </div>
    </section>
  );
};

export default Notification;
