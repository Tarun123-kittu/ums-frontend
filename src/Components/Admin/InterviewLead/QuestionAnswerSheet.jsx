import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Utils/appContecxt";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import Sidebar from "../../Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_lead_answer } from "../../../utils/redux/interviewLeadsSlice/technicalRound/getLeadAnswers";
import { get_question_answer } from "../../../utils/redux/testSeries/getQuestionsAnswer";
import { RxCross2 } from "react-icons/rx";
import { RxCheck } from "react-icons/rx";
import { PiProhibit } from "react-icons/pi";

const QuestionAnswerSheet = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lead_id, language_id, series_id } = location.state
    ? location.state
    : location;
  const lead_answers = useSelector((store) => store.LEAD_ANSWER);
  const all_questions = useSelector((store) => store.ALL_QUE_ANS);
  const { show } = useAppContext();
  const obj = [
    { name: "Interview Leads", path: "/interviewLead" },
    { name: "Technical Round", path: "" },
  ];

  useEffect(() => {
    if (!lead_id) {
      navigate(-1);
    } else {
      dispatch(get_lead_answer({ leadId: lead_id }));
      dispatch(
        get_question_answer({ language_id: language_id, series_id: series_id })
      );
    }
  }, [lead_id]);

  return (
    <section className="Interviewlead_outer">
      <Sidebar />
      <div
        className={`wrapper gray_bg admin_outer  ${show ? "cmn_margin" : ""}`}
      >
        <Notification />
        <div className="cmn_padding_outer">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />

          <div className="row">
            <div className="col-lg-6 col-sm-12 col-md-12">
              <div className="question_container">
                <h3 className="answer_heading">Original Answers</h3>
                <div className="question_inner_content">
                  <h3>OBJECTIVE</h3>
                  {all_questions?.data?.data?.map((ques, i) => {
                    if (ques?.question_type === "objective") {
                      console.log(ques, "from map functo");
                      return (
                        <div>
                          <div className="answer_card">
                            <h4>{ques?.question}</h4>
                            {ques?.options?.map((opt, index) => {
                              return (
                                <ul className="question_list_wrapper">
                                  <li>{opt?.option}</li>
                                </ul>
                              );
                            })}
                            <h4 className="correct_ans_heading">
                              Correct Answer:
                              {ques?.options?.map((ans) => {
                                console.log(ans, "this is from the inside map");
                                if (
                                  Number(ques?.correct_answer) ===
                                  Number(ans.option_id)
                                ) {
                                  return <span>{ans.option}</span>;
                                }
                              })}
                            </h4>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="question_inner_content">
                  <h3>Subjective</h3>
                  {all_questions?.data?.data?.map((answer, i) => {
                    if (answer.question_type === "subjective") {
                      return (
                        <div key={i}>
                          <div className="answer_card">
                            <h4>{answer?.question}</h4>
                            <h4 className="correct_ans_heading">
                              Correct Answer: {answer.answer}
                            </h4>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="question_inner_content">
                  <h3>Logical</h3>
                  {all_questions?.data?.data?.map((answer, i) => {
                    if (answer.question_type === "logical") {
                      return (
                        <div key={i}>
                          <div className="answer_card">
                            <h4>{answer?.question}</h4>
                            <h4 className="correct_ans_heading">
                              Correct Answer: {answer.answer}
                            </h4>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 col-md-12">
              <div className="question_container">
                <h3 className="answer_heading">Candidate Answers</h3>
                <div className="question_inner_content">
                  <h3>OBJECTIVE</h3>
                  {lead_answers?.data?.map((answer, i) => {
                    if (answer.question_type === "objective") {
                      return (
                        <div key={i}>
                          <div className="answer_card">
                            <div className="answer_head">
                              <h4>{answer?.question}</h4>
                              {answer.answer ? (
                                <div className="d-flex gap-2 justify-content-end check_btn_wrapper">
                                  <button className="correct_btn">
                                    <RxCheck size={20} />
                                  </button>
                                  <button className="incorrect_btn">
                                    <RxCross2 size={20} />
                                  </button>
                                </div>
                              ) : (
                                <div className="d-flex gap-2 justify-content-end check_btn_wrapper">
                                  <button className="not-button">
                                    <PiProhibit size={20} />
                                  </button>
                                </div>
                              )}
                            </div>
                            {answer?.options?.map((opt, index) => {
                              return (
                                <ul className="question_list_wrapper">
                                  <li>{opt?.option}</li>
                                </ul>
                              );
                            })}
                            {answer.answer ? (
                              <h4 className="correct_ans_heading">
                                Correct Answer: {answer.answer}
                              </h4>
                            ) : (
                              <h4>Not Attempted</h4>
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="question_inner_content">
                  <h3>Subjective</h3>
                  {lead_answers?.data?.map((answer, i) => {
                    if (answer.question_type === "subjective") {
                      return (
                        <div key={i}>
                          <div className="answer_card">
                            <div className="answer_head">
                              <h4>{answer?.question}</h4>
                              {answer.answer ? (
                                <div className="d-flex gap-2 justify-content-end check_btn_wrapper">
                                  <button className="correct_btn">
                                    <RxCheck size={20} />
                                  </button>
                                  <button className="incorrect_btn">
                                    <RxCross2 size={20} />
                                  </button>
                                </div>
                              ) : (
                                <div className="d-flex gap-2 justify-content-end check_btn_wrapper">
                                  <button className="not-button">
                                    <PiProhibit size={20} />
                                  </button>
                                </div>
                              )}
                            </div>
                            {answer.answer ? (
                              <h4 className="correct_ans_heading">
                                Correct Answer: {answer.answer}
                              </h4>
                            ) : (
                              <h4>Not Attempted</h4>
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="question_inner_content">
                  <h3>Logical</h3>
                  {lead_answers?.data?.map((answer, i) => {
                    if (answer.question_type === "logical") {
                      return (
                        <div key={i}>
                          <div className="answer_card">
                            <div className="answer_head">
                              <h4>{answer?.question}</h4>
                              {answer.answer ? (
                                <div className="d-flex gap-2 justify-content-end check_btn_wrapper">
                                  <button className="correct_btn">
                                    <RxCheck size={20} />
                                  </button>
                                  <button className="incorrect_btn">
                                    <RxCross2 size={20} />
                                  </button>
                                </div>
                              ) : (
                                <div className="d-flex gap-2 justify-content-end check_btn_wrapper">
                                  <button className="not-button">
                                    <PiProhibit size={20} />
                                  </button>
                                </div>
                              )}
                            </div>
                            {answer.answer ? (
                              <h4 className="correct_ans_heading">
                                Correct Answer: {answer.answer}
                              </h4>
                            ) : (
                              <h4>Not Attempted</h4>
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionAnswerSheet;
