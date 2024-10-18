import React, { useState, useEffect } from "react";
import Notification from "../Notification/Notification";
import { useAppContext } from "../../Utils/appContecxt";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import "./testseries.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ObjectiveQuesModal from "../../Modal/ObjectiveQuesModal";
import SubjectiveQuesModal from "../../Modal/SubjectiveQuesModal";
import LogicalQuesModal from "../../Modal/LogicalQuesModal";
import CommonDeleteModal from "../../Modal/CommonDeleteModal";
import EditLogicalQuesModal from "../../Modal/EditLogicalQuesModal";
import EditObjectiveQuesModal from "../../Modal/EditObjectiveQuesModal";
import EditSubjectiveQuesModal from "../../Modal/EditSubjectiveQuesModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_question_answer } from "../../../utils/redux/testSeries/getQuestionsAnswer";
import {
  delete_logical,
  clear_delete_logical_question_state,
} from "../../../utils/redux/testSeries/logicalQuestionSlice/deleteLogicalQUestion";
import {
  delete_objective,
  clear_delete_objective_question_state,
} from "../../../utils/redux/testSeries/objectiveQuestionsSlice/deleteObjectiveQuestion";
import toast from "react-hot-toast";

const ViewTestseriesQuestions = () => {
  const { show } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, language_id } = location.state ? location.state : location;
  const all_questions = useSelector((store) => store.ALL_QUE_ANS);
  const delete_logical_state = useSelector((store) => store.DELETE_LOGICAL_QUE);
  const delete_objective_state = useSelector(
    (store) => store.DELETE_OBJECTIVE_QUE
  );

  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
  }, [id]);

  useEffect(() => {
    dispatch(get_question_answer({ language_id: language_id, series_id: id }));
  }, []);

  const [showObjectiveQuesModal, setShowObjectiveQuesModal] = useState(false);
  const [showSubjectiveQuesModal, setShowSubjectiveQuesModal] = useState(false);
  const [showLogicalQuesModal, setShowLogicalQuesModal] = useState(false);
  const [showDelSubjectiveQuesModal, setShowDelSubjectiveQuesModal] =
    useState(false);
  const [showDelLogicalQuesModal, setShowDelLogicalQuesModal] = useState(false);
  const [showDelObjectiveQuesModal, setShowDelObjectiveQuesModal] =
    useState(false);

  const [showEditObjectiveQuesModal, setShowEditObjectiveQuesModal] =
    useState(false);
  const [showEditSubjectiveQuesModal, setShowEditSubjectiveQuesModal] =
    useState(false);
  const [showEditLogicalQuesModal, setShowEditLogicalQuesModal] =
    useState(false);
  const [question_id, setQuestion_id] = useState(null);

  const obj = [
    { name: "Test Series", path: "/testSeries" },
    { name: "Create Test Series Question", path: "" },
  ];

  const handleDelete = () => {
    dispatch(delete_logical({ question_id }));
  };

  const handleDeleteObjective = () => {
    dispatch(delete_objective({ question_id }));
  };

  useEffect(() => {
    if (delete_logical_state?.isSuccess) {
      toast.success("Question Delted successfully!!");
      dispatch(clear_delete_logical_question_state());
      dispatch(
        get_question_answer({ language_id: language_id, series_id: id })
      );
      setShowDelLogicalQuesModal(false);
      setShowDelSubjectiveQuesModal(false);
    }

    if (delete_logical_state?.isError) {
      toast.error(delete_logical_state?.error?.message);
      dispatch(clear_delete_objective_question_state());
    }
  }, [delete_logical_state]);

  useEffect(() => {
    if (delete_objective_state?.isSuccess) {
      toast.success("Question Delted successfully!!");
      dispatch(clear_delete_objective_question_state());
      dispatch(
        get_question_answer({ language_id: language_id, series_id: id })
      );
      setShowDelObjectiveQuesModal(false);
    }

    if (delete_objective_state?.isError) {
      toast.error(delete_objective_state?.error?.message);
      dispatch(clear_delete_logical_question_state());
    }
  }, [delete_objective_state]);
  return (
    <section className="test_serie_wrapper">
      <div
        className={`wrapper gray_bg admin_outer ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="cmn_padding_outer">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />
          <div className="position-relative">
            <div className="cmn_border view_question_wrapper cmn_padding_wrapper">
              <Tabs
                defaultActiveKey="Objective"
                id="uncontrolled-tab-example"
                className="interview_lead_tabs_outer "
              >
                <Tab
                  eventKey="Objective"
                  title="Objective"
                  className=" cmn_padding_wrapper cmn_border"
                >
                  {Permissions?.can_create && (
                    <button
                      className="add_question_btn cmn_Button_style"
                      onClick={() => {
                        setShowObjectiveQuesModal(true);
                      }}
                    >
                      Add
                    </button>
                  )}
                  {all_questions?.data?.data?.map((question, questionIndex) => {
                    if (question?.question_type === "objective") {
                      return (
                        <div
                          key={questionIndex}
                          className="cmn_border view_question_tab_content"
                        >
                          <h2 className="heading">{question?.question}</h2>
                          {question?.options?.map((option, optionIndex) => (
                            <div
                              key={`${questionIndex}-${optionIndex}`} // Unique key for each option
                              className="form-group new_employee_form_group"
                            >
                              <input
                                type="text"
                                className={
                                  question?.correct_answer == option?.option_id
                                    ? " form-control correct_ans"
                                    : "form-control "
                                }
                                placeholder={`Option ${optionIndex + 1}`}
                                value={option?.option}
                                readOnly
                              />
                            </div>
                          ))}
                          <div className="d-flex justify-content-end gap-3 mt-4 obj_btn_outer">
                            {Permissions?.can_delete && (
                              <button
                                className="cmn_Button_style cmn_darkgray_btn cursor_pointer"
                                onClick={() => {
                                  setQuestion_id(question?.question_id);
                                  setShowDelObjectiveQuesModal(true);
                                }}
                              >
                                Delete
                              </button>
                            )}

                            {Permissions?.can_update && (
                              <button
                                className="cmn_Button_style cursor_pointer"
                                onClick={() => {
                                  setQuestion_id(question?.question_id);
                                  setShowEditObjectiveQuesModal(true);
                                }}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
                </Tab>
                <Tab
                  eventKey="Subjective"
                  title="Subjective"
                  className=" cmn_padding_wrapper cmn_border"
                >
                  {Permissions?.can_create && (
                    <button
                      className="add_question_btn cmn_Button_style"
                      onClick={() => {
                        setShowSubjectiveQuesModal(true);
                      }}
                    >
                      Add
                    </button>
                  )}
                  {all_questions?.data?.data?.map((ques, i) => {
                    if (ques?.question_type === "subjective") {
                      return (
                        <div className="cmn_border view_question_tab_content">
                          <h2 className="heading">{ques?.question}</h2>
                          <div className="form-group new_employee_form_group">
                            <textarea
                              type="text"
                              className={"form-control"}
                              placeholder={"lorem 1"}
                              value={ques?.answer}
                            />
                          </div>

                          <div className="d-flex justify-content-end gap-3 mt-4 obj_btn_outer">
                            {Permissions?.can_delete && (
                              <button
                                className="cmn_Button_style cmn_darkgray_btn cursor_pointer"
                                onClick={() => {
                                  setQuestion_id(ques?.question_id);
                                  setShowDelSubjectiveQuesModal(true);
                                }}
                              >
                                Delete
                              </button>
                            )}
                            {Permissions?.can_update && (
                              <button
                                className="cmn_Button_style cursor_pointer"
                                onClick={() => {
                                  setQuestion_id(ques?.question_id);
                                  setShowEditSubjectiveQuesModal(true);
                                }}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
                </Tab>
                <Tab
                  eventKey="Logical"
                  title="Logical"
                  className="cmn_padding_wrapper cmn_border"
                >
                  {Permissions?.can_create && (
                    <button
                      className="add_question_btn cmn_Button_style"
                      onClick={() => {
                        setShowLogicalQuesModal(true);
                      }}
                    >
                      Add
                    </button>
                  )}
                  {all_questions?.data?.data?.map((ques, i) => {
                    if (ques?.question_type === "logical") {
                      return (
                        <div className="cmn_border view_question_tab_content">
                          <h2 className="heading">{ques?.question}</h2>
                          <div className="form-group new_employee_form_group">
                            <textarea
                              type="text"
                              className={"form-control"}
                              placeholder={"lorem 1"}
                              value={ques?.answer}
                            />
                          </div>
                          <div className="d-flex justify-content-end gap-3 mt-4 obj_btn_outer">
                            {Permissions?.can_delete && (
                              <button
                                className="cmn_Button_style cmn_darkgray_btn cursor_pointer"
                                onClick={() => {
                                  setQuestion_id(ques?.question_id);
                                  setShowDelSubjectiveQuesModal(true);
                                }}
                              >
                                Delete
                              </button>
                            )}
                            {Permissions?.can_update && (
                              <button
                                className="cmn_Button_style cursor_pointer"
                                onClick={() => {
                                  setQuestion_id(ques?.question_id);
                                  setShowEditLogicalQuesModal(true);
                                }}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      {showObjectiveQuesModal && (
        <ObjectiveQuesModal
          show={showObjectiveQuesModal}
          setShow={setShowObjectiveQuesModal}
          seriesId={id}
          language_id={language_id}
        />
      )}
      {showSubjectiveQuesModal && (
        <SubjectiveQuesModal
          show={showSubjectiveQuesModal}
          setShow={setShowSubjectiveQuesModal}
          seriesId={id}
          language_id={language_id}
        />
      )}
      {showLogicalQuesModal && (
        <LogicalQuesModal
          show={showLogicalQuesModal}
          setShow={setShowLogicalQuesModal}
          seriesId={id}
          language_id={language_id}
        />
      )}

      {showDelSubjectiveQuesModal && (
        <CommonDeleteModal
          dialogClassname={"custom_modal_width"}
          heading_text={"Are you sure you want to delete?"}
          show={showDelSubjectiveQuesModal}
          setShow={setShowDelSubjectiveQuesModal}
          question_id={question_id}
          handleDelete={handleDelete}
        />
      )}
      {showDelLogicalQuesModal && (
        <CommonDeleteModal
          dialogClassname={"custom_modal_width"}
          heading_text={"Are you sure you want to delete?"}
          show={showDelLogicalQuesModal}
          setShow={setShowDelLogicalQuesModal}
          question_id={question_id}
          handleDelete={handleDelete}
        />
      )}
      {showDelObjectiveQuesModal && (
        <CommonDeleteModal
          dialogClassname={"custom_modal_width"}
          heading_text={"Are you sure you want to delete?"}
          show={showDelObjectiveQuesModal}
          setShow={setShowDelObjectiveQuesModal}
          question_id={question_id}
          handleDelete={handleDeleteObjective}
        />
      )}

      {showEditLogicalQuesModal && (
        <EditLogicalQuesModal
          show={showEditLogicalQuesModal}
          setShow={setShowEditLogicalQuesModal}
          question_id={question_id}
          series_id={id}
          language_id={language_id}
        />
      )}
      {showEditObjectiveQuesModal && (
        <EditObjectiveQuesModal
          show={showEditObjectiveQuesModal}
          setShow={setShowEditObjectiveQuesModal}
          question_id={question_id}
          series_id={id}
          language_id={language_id}
        />
      )}
      {showEditSubjectiveQuesModal && (
        <EditSubjectiveQuesModal
          show={showEditSubjectiveQuesModal}
          setShow={setShowEditSubjectiveQuesModal}
          question_id={question_id}
          series_id={id}
          language_id={language_id}
        />
      )}
    </section>
  );
};

export default ViewTestseriesQuestions;
