import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./leads.css";
import logo from "../../assets/grey_logo.svg";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { verify_lead, clear_verify_lead_status } from "../../../utils/redux/interviewLeadsSlice/technicalRound/verifyLead";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import { start_test, clear_start_test_state } from "../../../utils/redux/interviewLeadsSlice/technicalRound/startTest";
import { useNavigate } from "react-router-dom";
const Leads = () => {
  const params = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lead_id, token } = params;
  const [checked, setChecked] = useState(false);
  const [alreadySubmitTest, setAlreadySUbmitTest] = useState(false)
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );
  const leadData = useSelector((store) => store.VERIFY_LEAD)
  const start_test_data = useSelector((store) => store.START_TEST)
  console.log()
  const handleStart = () => {
    if (!checked) {
      toast.error("Please confirm terms and conditions");
    }
    else {
      dispatch(start_test({ lead_id }))
    }
  };

  useEffect(() => {
    dispatch(verify_lead({ lead_id }))
  }, [lead_id, token])

  useEffect(() => {
    if (leadData?.isSuccess) {
      if (leadData?.data?.data?.is_open === 1) {
        setAlreadySUbmitTest(true)
      }
    }
    if (leadData?.isError) {
      toast.error(leadData?.error?.message)
      dispatch(clear_verify_lead_status())
    }

  }, [leadData])

  useEffect(() => {
    if (start_test_data?.isSuccess) {
      const newUrl = `/lead-test/${leadData?.data?.data?.is_open}/${leadData?.data?.data?.name}/${lead_id}/${token}`;
      const newWindow = window.open(newUrl, '_blank');

      if (newWindow) {
        newWindow.onload = () => {
          newWindow.postMessage({
            is_open: leadData?.data?.data?.is_open,
            name: leadData?.data?.data?.name,
          }, '*');
        };
      }
      window.close();
      dispatch(clear_start_test_state())
    }
  }, [start_test_data])

  if (alreadySubmitTest) {
    navigate("/test-thankyou", { state: { name: leadData?.data?.data?.name } });
  }


  if (
    (
      user_all_permissions?.roles_data?.includes("Admin") ||
      user_all_permissions?.roles_data?.includes("HR")
    )
  ) {
    return <UnauthorizedPage />;
  }


  return (
    <div className="leads_outer">
      <div className="zero_header">
        <div className="header_wrapper">
          <img src={logo} alt="logo" />
        </div>
        <div className="leads-user-name">
          <h4>Hi {leadData?.data?.data?.name}</h4>
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
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checked}
              onChange={() => setChecked(!checked)} />
            <label class="form-check-label ms-0" for="flexCheckDefault">
              I confirm that I have read and accept the terms and conditions and
              privacy policy.
            </label>
          </div>
          <div className="lead_footer">
            <button onClick={() => handleStart()}>Start</button>
            <p>Best Wishes</p>
            <h4>
              <a className="ultivic-text" href="https://ultivic.com/" target="blank">
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
