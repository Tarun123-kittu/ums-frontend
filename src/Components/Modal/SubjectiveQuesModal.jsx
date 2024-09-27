import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../Common/InputField";
import toast from "react-hot-toast";
import {
  add_subjective_que,
  clear_add_sub_ques_state,
} from "../../utils/redux/testSeries/subjectiveQue/addSubjectiveQue";
import { get_question_answer } from "../../utils/redux/testSeries/getQuestionsAnswer";

const SubjectiveQuesModal = ({ show, setShow, seriesId, language_id }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const sub_que = useSelector((store) => store.SUBJECTIVE_QUE);

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    if (!question && !answer) {
      toast.error("All fields are required");
    } else {
      dispatch(
        add_subjective_que({
          test_series_id: seriesId,
          language_id,
          question,
          answer,
        })
      );
    }
  };

  useEffect(() => {
    if (sub_que?.isSuccess) {
      toast.success("Subjective question added successfully");
      setShow(false);
      dispatch(clear_add_sub_ques_state());
      dispatch(
        get_question_answer({ language_id: language_id, series_id: seriesId })
      );
    }
    if (sub_que?.isError) {
      toast.error(sub_que?.error?.message);
      dispatch(clear_add_sub_ques_state());
    }
  }, [sub_que]);

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
          <h3 className="heading">Create Subjective Question </h3>
          <InputField
            placeholder={"Enter Question"}
            labelname={"Subjective Question"}
            type={"text"}
            classname={"new_employee_form_group"}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="form-group new_employee_form_group">
            <label>Subjective Answer</label>
            <textarea
              className="form-control mt-2"
              placeholder="Enter Answer"
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
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

export default SubjectiveQuesModal;
