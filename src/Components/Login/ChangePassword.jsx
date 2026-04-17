import React, { useState, useEffect } from "react";
import "./login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  change_password,
  clear_change_password_state,
} from "../../utils/redux/userSlice/changePassword";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [current_password, setCurrent_password] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const changePasswordState = useSelector((Store) => Store.CHANGE_PASSWORD);

  const handleChangePassword = () => {
    let missingData = {};
    if (!current_password) {
      toast.error("Current passwod is required");
      missingData.current_password = "Current password is required";
      setErrorMessage(missingData);
      return;
    }
    if (!password) {
      toast.error("Password is required");
      missingData.password = "Password is required";
      setErrorMessage(missingData);
      return;
    }
    if (!confirm_password) {
      toast.error("Confirm Password is required");
      missingData.confirm_password = "Confirm Password is required";
      setErrorMessage(missingData);
      return;
    }

    if (password !== confirm_password) {
      toast.error("Password doesn't matched");
      missingData.password = "Password not matched";
      missingData.confirm_password = "Confirm Password not matched";
      setErrorMessage(missingData);
      return;
    }

    dispatch(
      change_password({
        password: current_password,
        newPassword: password,
        confirm_password,
      })
    );
  };

  useEffect(() => {
    if (changePasswordState?.isSuccess) {
      toast.success("Password changed successfully");
      dispatch(clear_change_password_state());
      navigate(-1);
    }
    if (changePasswordState?.isError) {
      toast.error(changePasswordState?.error?.message);
      dispatch(clear_change_password_state());
    }
  }, [changePasswordState]);

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
                <h3>Create new Password </h3>
              </div>

              <div className="form-group mt-3">
                <label>Current Password</label>
                <input
                  className="form-control mt-2"
                  type="password"
                  id="pasword"
                  name="pasword"
                  placeholder="***********"
                  value={current_password}
                  onChange={(e) => setCurrent_password(e.target.value)}
                  style={
                    errorMessage?.current_password
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {errorMessage?.current_password}
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  className="form-control mt-2"
                  type="password"
                  id="pasword"
                  name="pasword"
                  placeholder="***********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={
                    errorMessage?.password ? { border: "1px solid red" } : {}
                  }
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {errorMessage?.password}
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                  className="form-control mt-2"
                  type="password"
                  id="pasword"
                  name="pasword"
                  placeholder="***********"
                  value={confirm_password}
                  onChange={(e) => setConfirm_password(e.target.value)}
                  style={
                    errorMessage?.confirm_password
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {errorMessage?.confirm_password}
                </span>
              </div>

              <button
                type="submit"
                className=" login-button mt-4"
                onClick={() => handleChangePassword()}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
