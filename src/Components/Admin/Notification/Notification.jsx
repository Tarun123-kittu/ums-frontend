import React,{useState} from "react";
import profile_img from "../../assets/userpic.svg";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./notification.css";
import logo from "../../assets/logo1.png";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const Notification = ({ view }) => {
  const navigate = useNavigate();
  const [show,setShow] = useState(false)
  return (
    <section className="h-20 notification_outer">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center ms-auto">
          <div className="notification_wrapper position-relative">
            <IoMdNotificationsOutline className=" " size={24} onClick={() => setShow(!show)}/>
            <span className="notify_dot"></span>
        {show &&   <div className="notification_list">
            <h3 className="mt-2">NOTIFICATIONS</h3>
           <ul>
              
              <li>
                 <div className="notification_user">
                  <p className="m-0">S</p>
                 </div>
                 <div className="notify_info">
                    <h4>Late Coming</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    <span>Today</span>
                 </div>
              </li>
              <li>
                 <div className="notification_user">
                  <p className="m-0">S</p>
                 </div>
                 <div className="notify_info">
                    <h4>Late Coming</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    <span>Today</span>
                 </div>
              </li>
            </ul>
           </div>}
          </div>

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
