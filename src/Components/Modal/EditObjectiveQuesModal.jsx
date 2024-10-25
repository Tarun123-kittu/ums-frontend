import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import InputField from "../Common/InputField";
import CustomSelectComp from "../Common/CustomSelectComp";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  get_objective_question,
  clear_objective_questions_state,
} from "../../utils/redux/testSeries/objectiveQuestionsSlice/getObjectiveQuestion";
import {
  update_objective_questions,
  clear_update_obj_que_state,
} from "../../utils/redux/testSeries/objectiveQuestionsSlice/updateObjectiveQuestion";
import toast from "react-hot-toast";
import { get_question_answer } from "../../utils/redux/testSeries/getQuestionsAnswer";
import { UsePermissions } from "../Utils/customHooks/useAllPermissions";
import UnauthorizedPage from "../Unauthorized/UnauthorizedPage";

const EditObjectiveQuesModal = ({
  show,
  setShow,
  question_id,
  series_id,
  language_id,
}) => {
  const permissions = UsePermissions("Test");
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clear_objective_questions_state());
    };
  }, []);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const all__question = useSelector((store) => store.GET_OBJECTIVE_QUESTION);
  const [errorMessage, setErrorMessage] = useState();
  const updated_question = useSelector(
    (store) => store.UPDATE_OBJECTIVE_QUESTION
  );
  const handleClose = () => {
    setShow(false);
  };

  const optionObj = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  useEffect(() => {
    if (!question_id) {
      setShow(false);
    } else {
      dispatch(get_objective_question({ question_id: question_id }));
    }
  }, [question_id]);

  useEffect(() => {
    if (all__question?.isSuccess) {
      const questionData = all__question.data?.data;

      if (questionData) {
        setQuestion(questionData.question);
        const correctOptionIndex = questionData.options?.findIndex(
          (el) => el.option_id == questionData.correct_option
        );
        if (correctOptionIndex !== -1) {
          setAnswer(correctOptionIndex + 1);
        } else {
          console.warn("Correct option not found in options array");
        }
        setOptions(questionData.options);
      }
    }
  }, [all__question]);

  const handleAnswer = (e) => {
    setAnswer(e.value);
  };

  const handleSetOptions = (i, e) => {
    const newOptions = [...options];
    const updatedOption = { ...newOptions[i] };
    updatedOption.option = e.target.value;
    newOptions[i] = updatedOption;
    setOptions(newOptions);
  };

  const handleEdit = () => {
    let missingData = {};

    if (!question) {
      toast.error("Please enter the question.");
      missingData.question = "Question is required";
      setErrorMessage(missingData);
      return;
    }

    if (options?.length === 4) {
      if (!options[0]?.option) {
        missingData.option1 = "Option 1 is required";
      }
      if (!options[1]?.option) {
        missingData.option2 = "Option 2 is required";
      }
      if (!options[2]?.option) {
        missingData.option3 = "Option 3 is required";
      }
      if (!options[3]?.option) {
        missingData.option4 = "Option 4 is required";
      }
      setErrorMessage(missingData);
      return;
    }
    if (!answer) {
      toast.error("Please select the correct answer.");
      missingData.answer = "Answer is required";
      setErrorMessage(missingData);
      return;
    }

    if (answer < 1 || answer > 4) {
      toast.error("Please select a valid correct answer (1-4).");
      missingData.answer = "Please select a valid correct answer (1-4).";
      setErrorMessage(missingData);
      return;
    }

    dispatch(
      update_objective_questions({
        question_id,
        question,
        options,
        correct_option_number: answer,
      })
    );
  };

  useEffect(() => {
    if (updated_question?.isSuccess) {
      toast.success("Question updated successfully");
      dispatch(clear_update_obj_que_state());
      dispatch(
        get_question_answer({ language_id: language_id, series_id: series_id })
      );
      setShow(false);
    }
    if (updated_question?.isError) {
      toast.error("Something went wrong");
      dispatch(clear_update_obj_que_state());
      setShow(false);
    }
  }, [updated_question]);

  return permissions?.can_view ? (
    <div>
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
        className="custom_modal_container"
        dialogClassName="custom_modal_width"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3 className="heading">Edit Objective Question</h3>
          <h4 className="inter_fontfamily cmn_ques_heading">
            Objective Question
          </h4>
          <div className="form-group new_employee_form_group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={errorMessage?.question ? { border: "1px solid red" } : {}}
            />
            <span style={{ color: "red", fontSize: "13px" }}>
              {errorMessage?.question}
            </span>
          </div>
          <div className="form-group new_employee_form_group">
            <input
              type="text"
              className={
                all__question?.data?.data?.correct_option ==
                all__question?.data?.data?.options[0]?.option_id
                  ? " form-control correct_ans"
                  : "form-control "
              }
              placeholder="Enter Option 1"
              value={options[0]?.option}
              onChange={(e) => handleSetOptions(0, e)}
              style={errorMessage?.option1 ? { border: "1px solid red" } : {}}
            />
            {errorMessage?.option1 && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errorMessage.option1}
              </span>
            )}
          </div>
          <div className="form-group new_employee_form_group">
            <input
              type="text"
              className={
                all__question?.data?.data?.correct_option ==
                all__question?.data?.data?.options[1]?.option_id
                  ? " form-control correct_ans"
                  : "form-control "
              }
              placeholder="Enter Option 2"
              value={options[1]?.option}
              onChange={(e) => handleSetOptions(1, e)}
              style={errorMessage?.option2 ? { border: "1px solid red" } : {}}
            />
            {errorMessage?.option2 && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errorMessage.option2}
              </span>
            )}
          </div>
          <div className="form-group new_employee_form_group">
            <input
              type="text"
              className={
                all__question?.data?.data?.correct_option ==
                all__question?.data?.data?.options[2]?.option_id
                  ? " form-control correct_ans"
                  : "form-control "
              }
              placeholder="Enter Option 3"
              value={options[2]?.option}
              onChange={(e) => handleSetOptions(2, e)}
              style={errorMessage?.option3 ? { border: "1px solid red" } : {}}
            />
            {errorMessage?.option3 && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errorMessage.option3}
              </span>
            )}
          </div>
          <div className="form-group new_employee_form_group">
            <input
              type="text"
              className={
                all__question?.data?.data?.correct_option ==
                all__question?.data?.data?.options[3]?.option_id
                  ? " form-control correct_ans"
                  : "form-control "
              }
              placeholder="Enter Option 4"
              value={options[3]?.option}
              onChange={(e) => handleSetOptions(3, e)}
              style={errorMessage?.option4 ? { border: "1px solid red" } : {}}
            />
            {errorMessage?.option4 && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errorMessage.option4}
              </span>
            )}
          </div>
          <div className="mt-3">
            <label className="inter_fontfamily cmn_ques_heading">
              Choose Answer Option
            </label>
            <div className="mt-2">
              <CustomSelectComp
                changeHandler={(e) => handleAnswer(e)}
                optionsData={optionObj}
                value={answer}
                styleTrue={errorMessage?.answer}
              />
              <span style={{ color: "red", fontSize: "13px" }}>
                {errorMessage?.answer}
              </span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {permissions?.can_update && (
            <button className="cmn_Button_style" onClick={() => handleEdit()}>
              Edit
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    <UnauthorizedPage />
  );
};

export default EditObjectiveQuesModal;
