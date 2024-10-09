import React, { useEffect, useState } from "react";

import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import Notification from "../Notification/Notification";

import "./interviewLead.css";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_hr_round_questions, clear_hr_round_questions_state } from "../../../utils/redux/interviewLeadsSlice/hrRound/getHrRoundQuestions";
import toast from "react-hot-toast";
import { hr_round_response, clear_hr_round } from "../../../utils/redux/interviewLeadsSlice/hrRound/hrRoundResponse";

const HrInterViewQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { show } = useAppContext();
  const [questions, setQuestions] = useState([])
  const { count, leadId } = location?.state ? location?.state : location;
  const all_question = useSelector((store) => store.HR_ROUND_QUESTION)
  const update_question = useSelector((store) => store.HR_ROUND_RESULT)
  const obj = [
    { name: "Interview Leads", path: "/interviewLead" },
    { name: "Hr Round", path: "/hrRound" },
    { name: "Interview Question Round", path: "/hrInterViewQuestion" },
  ];

  useEffect(() => {
    if (!count) {
      navigate("/interviewLead")
    }
    else {
      dispatch(get_hr_round_questions({ count }))
    }
  }, [count]);

  useEffect(() => {
    let newArr = []
    if (all_question?.isSuccess) {
      newArr = all_question?.data?.data?.map((que) => ({
        questionid: que?.id,
        question: que?.question,
        answer: "",
      }));
    }
    setQuestions(newArr);
  }, [all_question]);

  const handleEdit = (i, e) => {
    if (e.target.value?.length > 1 || e.target.value > 5) toast.error("You can only input 1 to 5")
    const updatedQuestions = [...questions];

    updatedQuestions[i] = { ...updatedQuestions[i], answer: e.target.value };

    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    dispatch(hr_round_response({ responses: questions, lead_id: leadId }))
  }

  useEffect(() => {
    if (update_question?.isSuccess) {
      toast.success(update_question?.message?.message)
      dispatch(clear_hr_round())
      dispatch(clear_hr_round_questions_state())
      navigate("/interviewLead")
    }
    if (update_question?.isError) {
      toast.error(update_question?.error?.message)
      dispatch(clear_hr_round())
    }
  }, [update_question])


  return (
    <section className="Interviewlead_outer">
      <div
        className={`wrapper gray_bg admin_outer  ${show ? "cmn_margin" : ""}`}
      >
        <Notification />
        <div className="cmn_padding_outer">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />
          <div className="hr_interview_question_round_outer">
            <div className="cmn_border mt-3 hr_interview_question_round_content">
              <div className="row">
                {questions?.map((ques, i) => {
                  return (
                    <div key={i} className="col-lg-6 col-sm-12 col-md-12">
                      <div className="form-group new_employee_form_group mt-3">
                        <h3 className="hr_question_heading">
                          {i + 1} {ques?.question}
                        </h3>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter 1 to 5 Rating"
                          value={ques?.answer}
                          onChange={(e) => handleEdit(i, e)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="d-flex gap-2 mt-4 justify-content-end exit_save_btn_outer">
                <button className="cmn_Button_style cmn_darkgray_btn">
                  Exit
                </button>
                <button className="cmn_Button_style" onClick={() => handleSave()}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HrInterViewQuestion;
