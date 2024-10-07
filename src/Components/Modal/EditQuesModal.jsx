import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./modal.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  update_key_point,
  clear_update_key_point_state,
} from "../../utils/redux/interviewLeadsSlice/hrRound/updateKeyPoints";
import { hr_assigned_questions_to_lead } from "../../utils/redux/interviewLeadsSlice/hrRound/getAssignedQuestionsToLead";
const EditQuesModal = ({
  show,
  setShow,
  lead_id,
  question_id,
  interview_id,
}) => {
  const dispatch = useDispatch();
  const [key_point, setKey_point] = useState("");
  const is_key_updated = useSelector((store) => store.UPDATE_KEY_POINT);
  const handleClose = () => {
    setShow(false);
  };
  const handleSave = () => {
    if (!key_point) {
      toast.error("Please enter the key point");
    } else {
      dispatch(
        update_key_point({ question_id, lead_id, interview_id, key_point })
      );
    }
  };

  useEffect(() => {
    if (is_key_updated?.isSuccess) {
      toast.success("Key point addes successfully");
      dispatch(hr_assigned_questions_to_lead({ interview_id, lead_id }));
      dispatch(clear_update_key_point_state());
      setShow(false);
    }
    if (is_key_updated?.isError) {
      toast.error(is_key_updated?.error?.message);
      dispatch(clear_update_key_point_state());
    }
  }, [is_key_updated]);
  return (
    <div className="edit_ques_container">
      <Modal
        show={show}
        backdropClassName="custom-modal-backdrop"
        aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
        centered
        onHide={handleClose}
        className="custom_modal_container edit_ques_wrapper"
      >
        <Modal.Body>
          <div className="editQuesModal_outer">
            {/* <div className='triangle'></div> */}
            <div className="  new_employee_form_group">
              <textarea
                placeholder="Enter Key Point"
                className="form-control"
                rows={6}
                value={key_point}
                onChange={(e) => setKey_point(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-end gap-3">
          <button
            className="cmn_Button_style cmn_darkgray_btn"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="cmn_Button_style" onClick={() => handleSave()}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditQuesModal;
