import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./leads.css";
import logo from "../../assets/grey_logo.svg";
import toast from "react-hot-toast";
const Leads = () => {
  const params = useParams();
  const { lead_id, token } = params;
  const [checked, setChecked] = useState(false);
  const handleStart = () => {
    if (!checked) {
      toast.error("Please confirm terms and conditions");
    }
  };
  return (
    <div className="leads_outer">
      <div className="zero_header">
        <div className="header_wrapper">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="container">
        <div className="leads_wrapper">
          <h1>Please Read Carefully</h1>
          <ol start="1">
            <li>
              When you will click on the start button(given below) you will see
              list of interview questions and your timer will start
              automatically
            </li>
            <li>
              Try to complete your test in the pre-definded estimate
              time.(minutes)
            </li>
            <li>When you will complete the test click on submit button.</li>
            <li>
              You will get list of objective, subjective as well as logical
              questions.
            </li>
            <li>
              Link is one time openable you can not access it again after
              submitted so please be careful during the test
            </li>
          </ol>
          <div className="d-flex align-items-center gap2">
            <input
              type="checkbox"
              name="example"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label htmlFor="">
              I confirm that I have read and accept the terms and conditions and
              privacy policy.
            </label>
          </div>
          <div className="lead_footer">
            <button onClick={() => handleStart()}>Start</button>
            <p>Best Wishes</p>
            <h4>
              <a href="https://ultivic.com/" target="blank">
                Ultivic pvt. ltd
              </a>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
