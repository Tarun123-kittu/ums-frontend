import React, { useEffect, useState } from "react";
import "./login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import validator from "validator";
import {
  forget_password,
  clear_forget_password_state,
} from "../../utils/redux/userSlice/forgetPassword";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [email_sent, setEmail_sent] = useState(false);
  const forgetPasswordState = useSelector((store) => store.FORGOT_PASSWORD);

  const handleClick = () => {
    navigate("/");
  };

  const handleResetPassword = () => {
    let missingData = {};
    if (email === "") {
      toast.error("Email is required");
      missingData.email = "Email is required";
      setErrorMessage(missingData);
      return;
    }
    if (email) {
      if (!validator.isEmail(email)) {
        toast.error("Email is not valid");
        missingData.email = "Email is not valid";
        setErrorMessage(missingData);
        return;
      }
    }
    dispatch(forget_password({ email }));
  };

  useEffect(() => {
    if (forgetPasswordState?.isSuccess) {
      setEmail_sent(true);
      toast.success(
        "We have sent you an recovery email please check your Email"
      );
      dispatch(clear_forget_password_state());
    }

    if (forgetPasswordState?.isError) {
      toast.error(forgetPasswordState?.error?.message);
      dispatch(clear_forget_password_state());
    }
  }, [forgetPasswordState]);

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
            {!email_sent ? (
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={
                      errorMessage?.email ? { border: "1px solid red" } : {}
                    }
                  />
                  {errorMessage?.email && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errorMessage.email}
                    </span>
                  )}
                  <div className="text-end login_back mt-1">
                    <span onClick={handleClick}>Back To Login?</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className=" login-button mt-4"
                  onClick={() => handleResetPassword()}
                >
                  {!forgetPasswordState?.isLoading ? (
                    "Reset Password"
                  ) : (
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center d-flex welcome_outer align-items-center">
                <h3>
                  We have sent you an recovery email please check your email.
                  <br />
                  Thanks!
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
