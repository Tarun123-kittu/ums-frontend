import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import InputField from "../Common/InputField";
import CustomSelectComp from "../Common/CustomSelectComp";
import { useDispatch, useSelector } from "react-redux";
import {
  create_obj_question,
  clear_add_obj_question_state,
} from "../../utils/redux/testSeries/objectiveQuestionsSlice/createObjQuestion";
import toast from "react-hot-toast";
import "./modal.css";
import { get_question_answer } from "../../utils/redux/testSeries/getQuestionsAnswer";

const ObjectiveQuesModal = ({ show, setShow, seriesId, language_id }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  console.log(options, "options options");
  const [answer, setAnswer] = useState("");
  const is_obj_created = useSelector((store) => store.CREATE_OBJ_QUESTION);

  const handleClose = () => {
    setShow(false);
  };

  const optionObj = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const handleSetOptions = (i, e) => {
    const newOptions = [...options];
    newOptions[i] = e.target.value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    if (!options || options?.length < 4) {
      toast.error("Please provide exactly 4 options.");
      return;
    }
    const hasEmptyOption = options.some((option) => !option.trim());
    if (hasEmptyOption) {
      toast.error("Please ensure no option is empty.");
      return;
    }
    if (!question) {
      toast.error("Please enter the question.");
      return;
    }

    if (!answer) {
      toast.error("Please select the correct answer.");
      return;
    }

    if (answer < 1 || answer > 4) {
      toast.error("Please select a valid correct answer (1-4).");
      return;
    }
    dispatch(
      create_obj_question({
        test_series_id: seriesId,
        language_id: language_id,
        question,
        options,
        correct_option_number: answer,
      })
    );
  };

  useEffect(() => {
    if (is_obj_created?.isSuccess) {
      toast.success("Ouestion created successfully");
      setShow(false);
      dispatch(clear_add_obj_question_state());
      dispatch(
        get_question_answer({ language_id: language_id, series_id: seriesId })
      );
    }
    if (is_obj_created?.isError) {
      toast.error(is_obj_created?.error?.message);
      dispatch(clear_add_obj_question_state());
    }
  }, [is_obj_created]);

  const handleAnswer = (e) => {
    setAnswer(e.value);
  };

  return (
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
          <h3 className="heading">Create Objective Question</h3>
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
            />
          </div>
          <div className="form-group new_employee_form_group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Option 1"
              value={options[0]}
              onChange={(e) => handleSetOptions(0, e)}
            />
          </div>
          <div className="form-group new_employee_form_group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Option 2"
              value={options[1]}
              onChange={(e) => handleSetOptions(1, e)}
            />
          </div>
          <div className="form-group new_employee_form_group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Option 3"
              value={options[2]}
              onChange={(e) => handleSetOptions(2, e)}
            />
          </div>
          <div className="form-group new_employee_form_group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Option 4"
              value={options[3]}
              onChange={(e) => handleSetOptions(3, e)}
            />
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
              />
            </div>
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

export default ObjectiveQuesModal;
