import React, { useEffect, useState } from "react";
import logo from "../../assets/grey_logo.svg";
import circlefilled from "../../assets/circle_filled.svg";
import circle_outline from "../../assets/circle_outline.svg";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  get_test_questions,
  clear_get_test_question_state,
} from "../../../utils/redux/interviewLeadsSlice/technicalRound/getTestQuestions";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import toast from "react-hot-toast";
import {
  submit_result,
  clear_submit_test_state,
} from "../../../utils/redux/interviewLeadsSlice/technicalRound/submitTest";

const Leadtest = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lead_id, token, is_open, name } = params;
  const [objective, setObjective] = useState(true);
  const [subjective, setSubjective] = useState(false);
  const [logical, setLogical] = useState(false);
  const [time, setTime] = useState(1000);
  const [attempted_questions, setAttempted_questions] = useState([]);
  const questions_data = useSelector((store) => store.TEST_QUESTIONS);
  const submit_question_result = useSelector((store) => store.SUBMIT_TEST);

  useEffect(() => {
    if (questions_data?.isSuccess) {
      setAttempted_questions(questions_data?.data?.data);
      setTime(convertToSeconds(questions_data?.data?.time_taken));
    }
  }, [questions_data]);

  const convertToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  useEffect(() => {
    dispatch(get_test_questions({ lead_id }));
  }, [lead_id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = (event) => {
    event.preventDefault();
  };

  const handlePaste = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (formatTime(time) === "00:00:03") {
      dispatch(submit_result({ lead_id, responses: attempted_questions }));
    }
  }, [time]);

  useEffect(() => {
    if (submit_question_result?.isSuccess) {
      navigate("/test-thankyou", { state: { name: name } });
      dispatch(clear_submit_test_state());
    }
  }, [submit_question_result]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem("lead_id", lead_id);
      localStorage.setItem(
        "attempted_questions",
        JSON.stringify(attempted_questions)
      );

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [lead_id, attempted_questions, dispatch]);

  useEffect(() => {
    const savedLeadId = localStorage.getItem("lead_id");
    const savedResponses = JSON.parse(
      localStorage.getItem("attempted_questions")
    );

    if (savedLeadId && savedResponses) {
      dispatch(
        submit_result({ lead_id: savedLeadId, responses: savedResponses })
      );

      localStorage.removeItem("lead_id");
      localStorage.removeItem("attempted_questions");
    }
  }, [dispatch]);

  const formatTime = (seconds) => {
    if (!seconds || seconds < 0) return "00:00:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  if (is_open === undefined) {
    return <UnauthorizedPage />;
  }

  const handleSaveAnswer = (question_id, selected_option_id) => {
    const updatedData = attempted_questions.map((data) => {
      if (data.question_id === question_id) {
        const updatedOptions = data.options.map((opt) => {
          return {
            ...opt,
            isSelected: opt.option === selected_option_id,
          };
        });
        return {
          ...data,
          options: updatedOptions,
          answer: selected_option_id || null,
        };
      }
      return data;
    });

    setAttempted_questions(updatedData);
  };

  const handleSubmit = () => {
    dispatch(submit_result({ lead_id, responses: attempted_questions }));
  };

  // document.addEventListener("contextmenu", function (e) {
  //   e.preventDefault();
  // });

  // document.addEventListener("keydown", function (e) {
  //   if (
  //     e.key === "F12" ||
  //     (e.ctrlKey &&
  //       e.shiftKey &&
  //       (e.key === "I" || e.key === "C" || e.key === "J")) ||
  //     (e.ctrlKey && e.key === "U")
  //   ) {
  //     e.preventDefault();
  //   }
  // });

  return (
    <section className="test_serie_wrapper gray_bg min-vh-100">
      <div className="zero_header">
        <div className="header_wrapper">
          <img src={logo} alt="logo" />
        </div>
        <div className="leads-user-name">
          <h4>Hi {name} </h4>
        </div>
      </div>
      <div className="view_question_wrapper cmn_padding_wrapper mt-3">
        <div className="container">
          <div className="leader_header">
            <h3>Good luck for your interview!</h3>{" "}
            <p>
              <span></span>
              {formatTime(time)}
            </p>
          </div>

          <ul className="question_type">
            <li
              className="cpointer"
              onClick={() => {
                setSubjective(false);
                setLogical(false);
                setObjective(true);
              }}
            >
              <img
                className="me-2"
                src={objective ? circlefilled : circle_outline}
                alt=""
              />
              <span>Objective Question</span>
            </li>
            <li className="divider_bar"></li>
            <li
              className="cpointer"
              onClick={() => {
                setSubjective(true);
                setLogical(false);
                setObjective(false);
              }}
            >
              <img
                className="me-2"
                src={subjective ? circlefilled : circle_outline}
                alt=""
              />
              <span>Subjective Question</span>
            </li>
            <li className="divider_bar"></li>
            <li
              className="cpointer"
              onClick={() => {
                setSubjective(false);
                setLogical(true);
                setObjective(false);
              }}
            >
              <img
                className="me-2"
                src={logical ? circlefilled : circle_outline}
                alt=""
              />
              <span>Logical Question</span>
            </li>
          </ul>
          {/* objective */}
          {objective && (
            <ul className="cmn_questions_list">
              {attempted_questions.map((ques, i) => {
                if (ques?.question_type === "objective") {
                  return (
                    <li className="question_card mb-3">
                      <h4 onCopy={handleCopy}>{ques?.question}</h4>
                      {ques?.options?.map((opt, index) => {
                        return (
                          <div class="form-check" key={index}>
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id={`flexCheckDefault${opt?.option_id}`}
                              onCopy={handleCopy}
                              onPaste={handlePaste}
                              checked={opt.isSelected || false}
                              onChange={(e) =>
                                handleSaveAnswer(ques?.question_id, opt?.option)
                              }
                            />
                            <label
                              class="form-check-label ms-0"
                              for={`flexCheckDefault${opt?.option_id}`}
                            >
                              {opt.option}
                            </label>
                          </div>
                        );
                      })}
                    </li>
                  );
                }
              })}
              <div className="d-flex justify-content-end mb-5">
                <button
                  className="cmn_btn dark_bg"
                  onClick={() => {
                    setSubjective(true);
                    setObjective(false);
                  }}
                >
                  Next
                </button>
              </div>
            </ul>
          )}
          {/* objective */}
          {/* subjective */}
          {subjective && (
            <ul className="cmn_questions_list">
              {attempted_questions?.map((ques, i) => {
                if (ques?.question_type === "subjective") {
                  return (
                    <li className="question_card mb-3">
                      <h4 onCopy={handleCopy}>{ques?.question}</h4>
                      <textarea
                        name=""
                        id=""
                        rows="5"
                        className="form-control"
                        onCopy={handleCopy}
                        onPaste={handlePaste}
                        value={ques.answer}
                        onChange={(e) =>
                          handleSaveAnswer(ques?.question_id, e.target.value)
                        }
                      ></textarea>
                    </li>
                  );
                }
              })}
              <div className="d-flex justify-content-end mb-5 gap-3">
                <button
                  className="cmn_btn dark_bg"
                  onClick={() => {
                    setSubjective(false);
                    setObjective(true);
                  }}
                >
                  Previous
                </button>
                <button
                  className="cmn_btn dark_bg"
                  onClick={() => {
                    setSubjective(false);
                    setLogical(true);
                  }}
                >
                  Next
                </button>
              </div>
            </ul>
          )}
          {/* subjective */}
          {/* Logical */}
          {logical && (
            <ul className="cmn_questions_list">
              {attempted_questions?.map((ques, i) => {
                if (ques?.question_type === "logical") {
                  return (
                    <li className="question_card mb-3">
                      <h4 onCopy={handleCopy}>{ques?.question}</h4>
                      <textarea
                        name=""
                        id=""
                        rows="5"
                        className="form-control"
                        value={ques.answer}
                        onChange={(e) =>
                          handleSaveAnswer(ques?.question_id, e.target.value)
                        }
                      ></textarea>
                    </li>
                  );
                }
              })}
              <div className="d-flex justify-content-end mb-5 gap-3">
                <button
                  className="cmn_btn dark_bg"
                  onClick={() => {
                    setSubjective(true);
                    setLogical(false);
                  }}
                >
                  Previous
                </button>
                <button
                  className="cmn_btn dark_bg"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </ul>
          )}
          {/* Logical */}
        </div>
      </div>
    </section>
  );
};

export default Leadtest;
