import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CustomSelectComp from "../Common/CustomSelectComp";
import {
  submit_developer_review,
  clear_developer_review_state,
} from "../../utils/redux/interviewLeadsSlice/technicalRound/submitDeveloperReview";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { get_all_tech_round_leads } from "../../utils/redux/interviewLeadsSlice/technicalRound/getAllTechRoundLeads";
import { useNavigate } from "react-router-dom";

const DeveloperReviewModal = ({
  show,
  setShow,
  dialogClassname,
  interview_id,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const submit_result = useSelector((store) => store.DEVELOPER_REVIEW);
  const userName = [
    { value: "selected", label: "Selected" },
    { value: "rejected", label: "Rejected" },
  ];

  useEffect(() => {
    if (submit_result?.isSuccess) {
      toast.success("Result submitted successfully");
      dispatch(get_all_tech_round_leads());
      navigate("/interviewLead", { state: { tab: "Technical" } });
      dispatch(clear_developer_review_state());
    }
    if (submit_result?.isError) {
      toast.error(submit_result?.error?.message);
      dispatch(clear_developer_review_state());
    }
  }, [submit_result]);

  const handleClose = () => {
    setShow(false);
  };

  const changeHandler = (e) => {
    setStatus(e.value);
  };

  const handleSave = () => {
    if (!status) {
      toast.error("Please select the staus");
    } else if (!description) {
      toast.error("Please provide description");
    } else {
      dispatch(
        submit_developer_review({
          interview_id,
          technical_round_result: status,
          developer_review: description,
        })
      );
    }
  };

  return (
    <div className="common_delete_modal_outer">
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
        centered
        onHide={handleClose}
        className="custom_modal_container"
        dialogClassName={dialogClassname}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3 className="heading">Candidate Selection</h3>
          <p>
            You can update your review about the candidate's selection status.
          </p>
          <div className="form-group new_employee_form_group">
            <label>Select Status</label>
            <div className="mt-2">
              <CustomSelectComp
                placeholder="Select Status"
                optionsData={userName}
                changeHandler={changeHandler}
                value={status}
              />
            </div>
          </div>

          <div className="editQuesModal_outer">
            <div className="  new_employee_form_group">
              <textarea
                placeholder="Enter Your review"
                className="form-control"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center gap-3">
          <button
            className="cmn_darkgray_btn cmn_Button_style"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="cmn_Button_style" onClick={() => handleSave()}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeveloperReviewModal;
