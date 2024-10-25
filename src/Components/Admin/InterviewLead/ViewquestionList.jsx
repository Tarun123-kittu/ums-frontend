import React, { useState, useEffect } from "react";

import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import Notification from "../Notification/Notification";

import "./interviewLead.css";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import { CiEdit } from "react-icons/ci";
import "./interviewLead.css";
import EditQuesModal from "../../Modal/EditQuesModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hr_assigned_questions_to_lead } from "../../../utils/redux/interviewLeadsSlice/hrRound/getAssignedQuestionsToLead";
import { UsePermissions } from "../../Utils/customHooks/useAllPermissions";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";

const ViewQuestionList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permissions = UsePermissions("Interviews");
  const { interview_id, lead_id, view } = location?.state
    ? location?.state
    : location;

  useEffect(() => {
    if (!interview_id && !lead_id) {
      navigate("/interviewLead");
    } else {
      dispatch(hr_assigned_questions_to_lead({ interview_id, lead_id }));
    }
  }, [interview_id, lead_id]);
  const [showEditModal, setShowEditModal] = useState(false);
  const assigned_questions = useSelector(
    (store) => store.HR_ASSIGNED_QUESTION_TO_LEAD
  );

  const { show } = useAppContext();

  const obj = [{ name: "Interview Leads", path: "/interviewLead" }];

  return permissions?.can_view ? (
    <section className="Interviewlead_outer">
      <div
        className={`${
          localStorage.getItem("roles")?.includes("Employee") ? "" : "wrapper "
        } gray_bg admin_outer  ${show ? "cmn_margin" : "cmn_margin_outer"}`}
      >
        <Notification />
        <div className="cmn_padding_outer">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />
          <div className="hr_interview_question_round_outer card-cmn">
            <div className="cmn_border mt-3 hr_interview_question_round_content">
              <div className="row">
                {assigned_questions?.data?.data?.map((ques, i) => {
                  return (
                    <div
                      key={ques.question_id || i}
                      className="col-lg-6 col-sm-12 col-md-12"
                    >
                      <div className="form-group new_employee_form_group mt-3">
                        <h3 className="hr_question_heading">
                          {i + 1}. {ques?.question}
                        </h3>
                        <div className="d-flex gap-2 view_question_list_outer">
                          <h4>{ques?.answer}</h4>
                          <div className="key-point-box">
                            {permissions?.can_update && (
                              <CiEdit
                                onClick={() =>
                                  setShowEditModal(ques.question_id)
                                } // Set the modal to open for the specific question
                              />
                            )}
                            <div className="key-point-tooltip">
                              <p>{ques?.key_point}</p>
                            </div>
                          </div>
                        </div>

                        {showEditModal === ques.question_id && (
                          <EditQuesModal
                            show={true}
                            setShow={setShowEditModal}
                            interview_id={interview_id}
                            lead_id={lead_id}
                            question_id={ques?.question_id}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {permissions?.can_update && (
                <div className="d-flex gap-2 mt-4 justify-content-end exit_save_btn_outer">
                  <button
                    className="cmn_Button_style cmn_darkgray_btn"
                    onClick={() =>
                      navigate("/interviewLead", { state: { tab: "HR" } })
                    }
                  >
                    Exit
                  </button>
                  <button className="cmn_Button_style">Save</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <UnauthorizedPage />
  );
};

export default ViewQuestionList;
