import React, { useState, useEffect } from "react";
import "./login.css";
import logo from "../assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { reset_password, clear_reset_password_state } from "../../utils/redux/userSlice/userResetPassword";


const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams()
    const { token } = params;
    const [errorMessage, setErrorMessage] = useState();
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const reset_password_state = useSelector((Store) => Store.RESET_PASSWORD)


    const handleChangePassword = () => {
        let missingData = {};
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

        dispatch(reset_password({ token, password, confirm_password }))

    };

    useEffect(() => {
        if (reset_password_state?.isSuccess) {
            toast.success("PAssword changed successfully !!")
            dispatch(clear_reset_password_state())
            navigate("/")
        }

        if (reset_password_state?.isError) {
            toast.error(reset_password_state.error.message)
            dispatch(clear_reset_password_state())
        }
    }, [reset_password_state])


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
                                <h3>Reset Your Password </h3>
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
                                {!reset_password_state?.isLoading ? "Reset Your Password" :
                                    <span
                                        class="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ResetPassword;
