import React from "react";
import "./login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // replace with your desired route
  };
  return (
    <div className="login_container">
      <div className="row">
        <div className="col-lg-6 col-sm-12 col-md-6">
          <div className="login_bg_outer">
            <div className="d-flex align-items-center justify-content-center login_bg_container">
              <div>
                <img src={logo} className="ultiviclogo_img" alt="" />
                <p>
                  As a returning member, we’re thrilled to have you <br></br>
                  back. Let’s continue our journey together!”
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 col-md-6">
          <div className="login_inner_content">
            <div className="login_wrapper">
              <div className="text-center d-flex welcome_outer align-items-center">
                <h3>Forget Your Password </h3>
              </div>
              <div className="form-group mt-3">
                <label>User Name/your Email</label>
                <input
                  className="form-control mt-2"
                  type="email"
                  id="username"
                  name="username"
                  placeholder="User Name/your Email"
                />
                <div className="text-end login_back mt-1">
                  <span onClick={handleClick}>Back To Login?</span>
                </div>
              </div>

              <button type="submit" className=" login-button mt-4">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
