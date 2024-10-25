import React, { useEffect, useState } from "react";
import "./login.css";
import logo from "../assets/logo.png";
import ultivicLogo from "../assets/ultivicLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import {
  login,
  clear_login_state,
} from "../../utils/redux/loginSlice/loginSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login_details = useSelector((store) => store.LOGIN);

  useEffect(() => {
    if (localStorage.getItem("roles")?.includes("Employee")) {
      navigate("/mark-attendence");
    }
    if (
      localStorage.getItem("ums_token") &&
      localStorage
        .getItem("roles")
        ?.split(",")
        .some((role) => ["Admin", "Developer", "HR"].includes(role))
    ) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password && !email) {
      toast.error("email and password are required", { autoClose: 2000 });
    } else {
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    if (login_details?.isSuccess) {
      toast.success("Logged in Successfully", { autoClose: 2000 });
      localStorage.setItem("ums_token", login_details?.data?.token);
      localStorage.setItem("roles", login_details?.data?.roles);
      localStorage.setItem("userId", login_details?.data?.id);
      localStorage.setItem("tokenIssueTime", Date.now());
      console.log(login_details?.data?.roles, "this is the roles");
      if (login_details?.data?.roles?.includes("Admin")) {
        navigate("/dashboard");
      } else {
        navigate("/mark-attendence");
      }
      dispatch(clear_login_state());
    }
    if (login_details?.isError) {
      toast.error(login_details?.error?.message, { autoClose: 2000 });
      dispatch(clear_login_state());
    }
  }, [login_details]);

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
                <h3>Welcome To </h3>
                <img src={ultivicLogo} className="ultivic_logo" alt="" />
              </div>
              <div className="form-group mt-3">
                <label>Your E-mail</label>
                <input
                  className="form-control mt-2"
                  type="email"
                  id="username"
                  name="username"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3 position-relative">
                <div className="d-flex justify-content-between ">
                  <label>Your Password</label>
                  <h6
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forget password?
                  </h6>
                </div>

                <input
                  className="form-control mt-2"
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="open_eye">
                  {showPassword ? (
                    <IoEyeOutline
                      onClick={() => {
                        setShowPassword(false);
                      }}
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => {
                        setShowPassword(true);
                      }}
                    />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className=" login-button mt-4"
                onClick={(e) => handleLogin(e)}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
