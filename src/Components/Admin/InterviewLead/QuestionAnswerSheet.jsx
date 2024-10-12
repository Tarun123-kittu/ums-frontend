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
import {
  check_lead_answers,
  clear_check_answers_state,
} from "../../../utils/redux/interviewLeadsSlice/technicalRound/CheckLeadAnswers";
import toast from "react-hot-toast";
import DeveloperReviewModal from "../../Modal/developerReviewModal";

const QuestionAnswerSheet = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lead_id, language_id, series_id, view } = location.state
    ? location.state
    : location;
  const lead_answers = useSelector((store) => store.LEAD_ANSWER);
  const all_questions = useSelector((store) => store.ALL_QUE_ANS);
  const check_answer = useSelector((store) => store.CHECK_LEAD_ANSWER);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [allAnswersFilled, setAllAnswersFilled] = useState(false);
  const [interview_id, setInterview_id] = useState(null);
  const { show } = useAppContext();
  const obj = [
    { name: "Interview Leads", path: "/interviewLead" },
    { name: "Technical Round", path: "" },
  ];

  useEffect(() => {
    if (localStorage.getItem('roles')?.includes('Employee')) {
      navigate("/mark-attendence");
    }
  }, [navigate]);

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

  useEffect(() => {
    if (check_answer?.isSuccess) {
      dispatch(get_lead_answer({ leadId: lead_id }));
      dispatch(clear_check_answers_state());
    }
    if (check_answer?.isError) {
      toast.error("Error while submit response please try again");
      dispatch(clear_check_answers_state());
    }
  }, [check_answer]);

  useEffect(() => {
    if (lead_answers?.data) {
      const allFilled = lead_answers.data.every((ans) => {
        return Object.values(ans).every((key) => key !== "");
      });
      if (allFilled) {
        setAllAnswersFilled(true);
      } else {
        setAllAnswersFilled(false);
      }
    }
  }, [lead_answers, interview_id]);

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
                          <div className="answer_card border-card">
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
                          <div className="answer_card border-card">
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
                            {view && (
                              <div className="answer_head">
                                <h4>{answer?.question}</h4>
                              </div>
                            )}
                            {!view && (
                              <div className="answer_head">
                                <h4>{answer?.question}</h4>
                                {answer.answer ? (
                                  <div className="d-flex gap-2 justify-content-end check_btn_wrapper">
                                    <button
                                      className="correct_btn"
                                      onClick={() => {
                                        dispatch(
                                          check_lead_answers({
                                            question_id: answer?.question_id,
                                            interview_id: answer?.interview_id,
                                            lead_id: lead_id,
                                            answer_status: "correct",
                                          })
                                        );
                                        setInterview_id(answer?.interview_id);
                                      }}
                                    >
                                      <RxCheck size={20} />
                                    </button>
                                    <button
                                      className="incorrect_btn"
                                      onClick={() => {
                                        dispatch(
                                          check_lead_answers({
                                            question_id: answer?.question_id,
                                            interview_id: answer?.interview_id,
                                            lead_id: lead_id,
                                            answer_status: "incorrect",
                                          })
                                        );
                                        setInterview_id(answer?.interview_id);
                                      }}
                                    >
                                      <RxCross2 size={20} />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="d-flex gap-2 justify-content-end check_btn_wrapper">
                                    <button
                                      className="not-button"
                                      onClick={() => {
                                        dispatch(
                                          check_lead_answers({
                                            question_id: answer?.question_id,
                                            interview_id: answer?.interview_id,
                                            lead_id: lead_id,
                                            answer_status: "not_attempted",
                                          })
                                        );
                                        setInterview_id(answer?.interview_id);
                                      }}
                                    >
                                      <PiProhibit size={20} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                            {answer?.options?.map((opt, index) => {
                              return (
                                <ul className="question_list_wrapper">
                                  <li>{opt?.option}</li>
                                </ul>
                              );
                            })}

                            {answer.answer_status && <h4 className="correct_ans_heading d-flex justify-content-between">
                              Correct Answer: {answer.answer}
                              <span
                                className={
                                  answer.answer_status === "correct"
                                    ? "checked"
                                    : answer.answer_status === "incorrect"
                                      ? "wrong_checked"
                                      : "not_attempted"
                                }
                              >
                                Checked: {answer.answer_status}
                              </span>
                            </h4>}

                            <h4>Not Attempted</h4>

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
                          <div className="answer_card border-card">
                            {view && (
                              <div className="answer_head">
                                <h4>{answer?.question}</h4>
                              </div>
                            )}
                            {!view && (
                              <div className="answer_head">
                                <h4>
                                  {answer?.question} ({answer.answer_status})
                                </h4>
                                {answer.answer ? (
                                  <div className="d-flex gap-2 justify-content-end check_btn_wrapper">
                                    <button
                                      className="correct_btn"
                                      onClick={() => {
                                        dispatch(
                                          check_lead_answers({
                                            question_id: answer?.question_id,
                                            interview_id: answer?.interview_id,
                                            lead_id: lead_id,
                                            answer_status: "correct",
                                          })
                                        );
                                        setInterview_id(answer?.interview_id);
                                      }}
                                    >
                                      <RxCheck size={20} />
                                    </button>
                                    <button
                                      className="incorrect_btn"
                                      onClick={() => {
                                        dispatch(
                                          check_lead_answers({
                                            question_id: answer?.question_id,
                                            interview_id: answer?.interview_id,
                                            lead_id: lead_id,
                                            answer_status: "incorrect",
                                          })
                                        );
                                        setInterview_id(answer?.interview_id);
                                      }}
                                    >
                                      <RxCross2 size={20} />
                                    </button>
                                  </div>
                                ) : (
                                  <div
                                    className="d-flex gap-2 justify-content-end check_btn_wrapper"
                                    onClick={() => {
                                      dispatch(
                                        check_lead_answers({
                                          question_id: answer?.question_id,
                                          interview_id: answer?.interview_id,
                                          lead_id: lead_id,
                                          answer_status: "not_attempted",
                                        })
                                      );
                                      setInterview_id(answer?.interview_id);
                                    }}
                                  >
                                    <button className="not-button">
                                      <PiProhibit size={20} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                            {answer.answer_status && <h4 className="correct_ans_heading d-flex justify-content-between">
                              Correct Answer: {answer.answer}
                              <span
                                className={
                                  answer.answer_status === "correct"
                                    ? "checked"
                                    : answer.answer_status === "incorrect"
                                      ? "wrong_checked"
                                      : "not_attempted"
                                }
                              >
                                Checked: {answer.answer_status}
                              </span>
                            </h4>}
                            <h4>Not Attempted</h4>
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
                          <div className="answer_card border-card">
                            {view && (
                              <div className="answer_head">
                                <h4>{answer?.question}</h4>
                              </div>
                            )}
                            {!view && (
                              <div className="answer_head">
                                <h4>{answer?.question}</h4>
                                {answer.answer ? (
                                  <div className="d-flex gap-2 justify-content-end check_btn_wrapper">
                                    <button
                                      className="correct_btn"
                                      onClick={() => {
                                        dispatch(
                                          check_lead_answers({
                                            question_id: answer?.question_id,
                                            interview_id: answer?.interview_id,
                                            lead_id: lead_id,
                                            answer_status: "correct",
                                          })
                                        );
                                        setInterview_id(answer?.interview_id);
                                      }}
                                    >
                                      <RxCheck size={20} />
                                    </button>
                                    <button
                                      className="incorrect_btn"
                                      onClick={() => {
                                        dispatch(
                                          check_lead_answers({
                                            question_id: answer?.question_id,
                                            interview_id: answer?.interview_id,
                                            lead_id: lead_id,
                                            answer_status: "incorrect",
                                          })
                                        );
                                        setInterview_id(answer?.interview_id);
                                      }}
                                    >
                                      <RxCross2 size={20} />
                                    </button>
                                  </div>
                                ) : (
                                  <div
                                    className="d-flex gap-2 justify-content-end check_btn_wrapper"
                                    onClick={() => {
                                      dispatch(
                                        check_lead_answers({
                                          question_id: answer?.question_id,
                                          interview_id: answer?.interview_id,
                                          lead_id: lead_id,
                                          answer_status: "not_attempted",
                                        })
                                      );
                                      setInterview_id(answer?.interview_id);
                                    }}
                                  >
                                    <button className="not-button">
                                      <PiProhibit size={20} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                            {answer.answer_status && <h4 className="correct_ans_heading d-flex justify-content-between">
                              Correct Answer: {answer.answer}
                              <span
                                className={
                                  answer.answer_status === "correct"
                                    ? "checked"
                                    : answer.answer_status === "incorrect"
                                      ? "wrong_checked"
                                      : "not_attempted"
                                }
                              >
                                Checked: {answer.answer_status}
                              </span>
                            </h4>}
                            <h4>Not Attempted</h4>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              {!view && (
                <div>
                  <button
                    onClick={() => {
                      allAnswersFilled
                        ? setShowDeveloperModal(true)
                        : toast.error("Please give feedback to all questions");
                    }}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDeveloperModal && (
        <DeveloperReviewModal
          show={DeveloperReviewModal}
          setShow={setShowDeveloperModal}
          interview_id={interview_id}
        />
      )}
    </section>
  );
};

export default QuestionAnswerSheet;
