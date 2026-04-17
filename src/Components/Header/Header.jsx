import React from "react";
import { CiMail } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import userpic from "../assets/userpic.svg";
import "./header.css";
const Header = () => {
  return (
    <section className="header_wrapper">
      <div className="header_container">
        <div className="message_outer">
          <CiMail className="cmn_icon_size" />
          <h3 className="count_heading">2</h3>
        </div>
        <IoMdNotificationsOutline className="cmn_icon_size" />
        <img src={userpic} alt="user profile" height={"50px"} width={"50px"} />
      </div>
    </section>
  );
};

export default Header;
