import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import InputField from "../Common/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  get_logical_question,
  clear_sub_log_questions_state,
} from "../../utils/redux/testSeries/logicalQuestionSlice/getLogicalQuestions";
import {
  update_logical_que,
  clear_update_logical_question_state,
} from "../../utils/redux/testSeries/logicalQuestionSlice/updateLogicalQuestion";
import { get_question_answer } from "../../utils/redux/testSeries/getQuestionsAnswer";
import toast from "react-hot-toast";

const EditLogicalQuesModal = ({
  show,
  setShow,
  question_id,
  series_id,
  language_id,
}) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const all__question = useSelector(
    (store) => store.GET_LOGICAL_SUBJECTIVE_QUESTION
  );
  const updated_question = useSelector(
    (store) => store.UPDATE_LOGICAL_QUESTION
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clear_sub_log_questions_state());
    };
  }, []);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (!question_id) {
      setShow(false);
    } else {
      dispatch(get_logical_question({ question_id: question_id }));
    }
  }, [question_id]);

  useEffect(() => {
    if (all__question?.isSuccess) {
      setQuestion(all__question?.data?.data?.question);
      setAnswer(all__question?.data?.data?.answer);
    }
  }, [all__question]);

  const handleEdit = () => {
    let missingData = {};
    if (!question) {
      toast.error("Question is required");
      missingData.question = "Question is required";
      setErrorMessage(missingData);
      return;
    }
    if (!answer) {
      toast.error("Answer is required");
      missingData.answer = "Answer is required";
      setErrorMessage(missingData);
      return;
    }
    dispatch(
      update_logical_que({
        question_id,
        answer_id: all__question?.data?.data?.answer_id,
        question,
        answer,
      })
    );
  };

  useEffect(() => {
    if (updated_question?.isSuccess) {
      toast.success("Question updated successfully");
      dispatch(clear_update_logical_question_state());
      dispatch(
        get_question_answer({ language_id: language_id, series_id: series_id })
      );
      setShow(false);
    }
    if (updated_question?.isError) {
      toast.error("Something went wrong");
      dispatch(clear_update_logical_question_state());
      setShow(false);
    }
  }, [updated_question]);

  return (
    <div>
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
        centered
        onHide={handleClose}
        className="custom_modal_container"
        dialogClassName="custom_modal_width"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3 className="heading">Edit Logical Question </h3>
          <InputField
            placeholder={"Enter Question"}
            labelname={"Logical Question"}
            type={"text"}
            classname={"new_employee_form_group"}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            styleTrue={errorMessage?.question}
          />

          <span style={{ color: "red", fontSize: "13px" }}>
            {errorMessage?.question}
          </span>
          <div className="form-group new_employee_form_group">
            <label>Logical Answer</label>
            <textarea
              className="form-control mt-2"
              placeholder="Enter Answer"
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={errorMessage?.answer ? { border: "1px solid red" } : {}}
            />

            <span style={{ color: "red", fontSize: "13px" }}>
              {errorMessage?.answer}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="cmn_Button_style"
            onClick={() => {
              handleEdit();
            }}
          >
            Edit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditLogicalQuesModal;
