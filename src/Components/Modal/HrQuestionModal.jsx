import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputField from "../Common/InputField";
import { UsePermissions } from "../Utils/customHooks/useAllPermissions";

const HrQuestionModal = ({ show, setShow, leadId }) => {
  const navigate = useNavigate();
  const permissions = UsePermissions("Interviews");
  const [count, setCount] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const startHandler = () => {
    setShow(false);
    navigate("/hrInterViewQuestion", { state: { count: count, leadId } });
  };

  const handleSaveCount = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCount(null);
      return;
    }
    const numericValue = Number(value);
    if (numericValue < 1 || numericValue > 5) {
      setCount(null);
    } else {
      setCount(numericValue);
    }
  };

  return (
    <div>
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
        centered
        onHide={handleClose}
        className="custom_modal_container"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3 className="heading">HR round interview questions </h3>
          <InputField
            isRequred={true}
            placeholder={"Enter Question Number"}
            labelname={"How many questions do you want to ask?"}
            classname={"new_employee_form_group"}
            type={"number"}
            value={count}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) {
                setCount(value);
              }
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="cmn_Button_style cmn_darkgray_btn"
            onClick={() => setShow(false)}
          >
            Cancel{" "}
          </button>
          {permissions?.can_create && (
            <button className="cmn_Button_style" onClick={startHandler}>
              Start
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HrQuestionModal;
