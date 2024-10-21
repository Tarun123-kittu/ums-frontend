import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import InputField from "../Common/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  update_bank_leave,
  clear_bank_leave_state,
} from "../../utils/redux/leaveSlice/updateBankLeaves";
import toast from "react-hot-toast";
import { get_leave_bank_report } from "../../utils/redux/leaveSlice/getLeaveBankReport";

const EditLeaveBankModal = ({ show, setShow, paid_leave, employeeId }) => {
  const dispatch = useDispatch();
  const [leaves, setLeaves] = useState(paid_leave);
  const [taken_leaves, setTaken_leaves] = useState(0);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const session = `${currentYear}-${currentYear + 1}`;
  const update_leave = useSelector((store) => store.UPDATE_BANK_LEAVE);
  const handleClose = () => {
    setShow(false);
  };

  const handleUpdate = () => {
    if (taken_leaves === 0) {
      toast.error("Taken Leaves can't be zero");
      return;
    }
    dispatch(
      update_bank_leave({
        employeeId,
        taken_leaves,
        paid_leaves: leaves,
        session,
      })
    );
  };

  useEffect(() => {
    if (update_leave?.isSuccess) {
      dispatch(
        get_leave_bank_report({
          session,
          month: currentMonth,
          year: currentYear,
        })
      );
      dispatch(clear_bank_leave_state());
      setShow(false);
    }

    if (update_leave?.isError) {
      toast.error(update_leave?.error?.message);
      dispatch(clear_bank_leave_state());
    }
  }, [update_leave]);
  return (
    <div>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
        centered
        onHide={handleClose}
        className="custom_modal_container"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3 className="heading">Leave Bank </h3>
          <InputField
            labelname={"Taken Leaves"}
            type={"number"}
            classname={"new_employee_form_group"}
            value={taken_leaves}
            onChange={(e) => {
              const newValue = e.target.value;
              if (/^\d*$/.test(newValue) && newValue.length <= 10) {
                setTaken_leaves(newValue);
              }
            }}
          />
          <InputField
            labelname={"Paid Leaves"}
            type={"number"}
            classname={"new_employee_form_group"}
            value={leaves}
            onChange={(e) => {
              setLeaves(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="cmn_Button_style" onClick={() => handleUpdate()}>
            Edit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditLeaveBankModal;
