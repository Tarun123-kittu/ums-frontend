import React from "react";
import { useAppContext } from "../Utils/appContecxt";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UnauthorizedPage = () => {
  const { show } = useAppContext();
  const navigate = useNavigate();
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  if (!user_all_permissions?.roles_data?.includes("Admin")) {
    return (
      <section className="unauthorized_page_outer">
        <div
          className={`wrapper gray_bg admin_outer  ${
            show ? "cmn_margin" : "cmn_margin_outer"
          }`}
        >
          <div className="d-flex justify-content-center align-items-center unauthorized_page_content">
            <div className="text-center unauthorized_wrapper">
              <h2>Error 401</h2>
              <h3>
                You Are Not Authorized To<br></br> Access this Page.
              </h3>
              <button
                className="cmn_Button_style mt-4"
                onClick={() => {
                  user_all_permissions?.roles_data?.includes("Candidate")
                    ? navigate("/mark-attendence")
                    : navigate(-1);
                }}
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default UnauthorizedPage;
