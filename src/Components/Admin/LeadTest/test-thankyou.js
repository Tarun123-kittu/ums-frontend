import React from "react";
import logo from "../../assets/grey_logo.svg";
import { useLocation } from "react-router-dom";
const TestThankyou = () => {
  const location = useLocation();
  const { name } = location?.state ? location?.state : location;
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center thnakyou_wrapper bg-white">
      <div className="thankyou_content">
        <img src={logo} alt="" />
        <p className="mt-4">
          Hi {name}, Your test is complete. We'll review the results and get
          back to you soon. Thank you!
        </p>
      </div>
    </div>
  );
};

export default TestThankyou;
