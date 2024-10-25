import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import InputField from "../Common/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  add_logical_que,
  clear_add_log_ques_state,
} from "../../utils/redux/testSeries/logicalQuestionSlice/addLogicalQue";
import toast from "react-hot-toast";
import { get_question_answer } from "../../utils/redux/testSeries/getQuestionsAnswer";

const LogicalQuesModal = ({ show, setShow, seriesId, language_id }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const log_que = useSelector((store) => store.LOGICAL_QUE);
  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
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
      add_logical_que({
        test_series_id: seriesId,
        language_id,
        question,
        answer,
      })
    );
  };

  useEffect(() => {
    if (log_que?.isSuccess) {
      toast.success("Subjective question added successfully");
      setShow(false);
      dispatch(clear_add_log_ques_state());
      dispatch(
        get_question_answer({ language_id: language_id, series_id: seriesId })
      );
    }
    if (log_que?.isError) {
      toast.error(log_que?.error?.message);
      dispatch(clear_add_log_ques_state());
    }
  }, [log_que]);

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
          <h3 className="heading">Create Logical Question </h3>
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
              style={errorMessage?.answer ? { border: "1px solid red" } : {}}
            />

            <span style={{ color: "red", fontSize: "13px" }}>
              {errorMessage?.answer}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="cmn_Button_style" onClick={() => handleSave()}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LogicalQuesModal;
