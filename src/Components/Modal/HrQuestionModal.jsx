import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import InputField from "../Common/InputField";
import { useSelector } from "react-redux";

const HrQuestionModal = ({ show, setShow, leadId }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [hr_user_permissions, setHr_user_permissions] = useState({});
  const all_permissions = useSelector((store) => store.USER_PERMISSIONS);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  const handleClose = () => {
    setShow(false);
  };
  const startHandler = () => {
    setShow(false);
    navigate("/hrInterViewQuestion", { state: { count: count, leadId } });
  };

  useEffect(() => {
    const can_hr_create = all_permissions?.data?.data?.find(
      (el) => el.role === "HR" && el.permission === "Interviews"
    );
    setHr_user_permissions(can_hr_create);
  }, [all_permissions]);

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
            placeholder={"Enter Question Number"}
            labelname={"Question"}
            type={"number"}
            classname={"new_employee_form_group"}
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="cmn_Button_style cmn_darkgray_btn"
            onClick={() => setShow(false)}
          >
            Cancel{" "}
          </button>
          {user_all_permissions?.roles_data?.includes("Admin") ||
            (hr_user_permissions?.can_create && (
              <button className="cmn_Button_style" onClick={startHandler}>
                Start
              </button>
            ))}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HrQuestionModal;
