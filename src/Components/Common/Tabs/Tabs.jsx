import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HrQuestionModal from "../../Modal/HrQuestionModal";
import { useEffect, useState } from "react";
import TechInterviewQuestionModal from "../../Modal/TechInterviewQuesModal";
import insight_icon from "../../assets/insight.svg";
import "./tabs.css";
import { useNavigate, useLocation } from "react-router-dom";
import CustomSelectComp from "../CustomSelectComp";
import { get_all_leads } from "../../../utils/redux/interviewLeadsSlice/getAllLeads";
import { get_hr_round_candidate } from "../../../utils/redux/interviewLeadsSlice/hrRound/getHrRoundCandidate";
import {
  hr_update_lead_status,
  clear_hr_lead_updated_status,
} from "../../../utils/redux/interviewLeadsSlice/hrRound/hrUpdateLeadStatus";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { get_all_tech_round_leads } from "../../../utils/redux/interviewLeadsSlice/technicalRound/getAllTechRoundLeads";
import {
  update_technical_round_status,
  clear_tech_round_status_state,
} from "../../../utils/redux/interviewLeadsSlice/technicalRound/updateTechnicalRoundStatus";

function TabComp({ setCurrentTab }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { tab } = location?.state ? location?.state : location;
  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const [showHrQuestionModal, setShowHrQuestionModal] = useState(false);
  const [showTechInterviewQuesModal, setShowTechInterviewQuesModal] =
    useState(false);
  const [leadId, setLeadId] = useState(null);
  const [page, setPage] = useState(1);
  const [language_id, setLanguage_id] = useState(null);
  const [series_id, setSeries_id] = useState(null);
  const [language, setLanguage] = useState("");
  const all_leads = useSelector((Store) => Store.ALL_LEADS);
  const all_hr_round_candidate = useSelector((store) => store.HR_ROUND_LEAD);
  const hr_round_candidate_status = useSelector(
    (store) => store.HR_UPDATE_LEAD_STATUS
  );
  const tech_round_leads = useSelector((store) => store.TECH_LEADS);

  const update_tech_status = useSelector((store) => store.UPDATE_TECH_STATUS);

  useEffect(() => {
    if (tech_round_leads?.isSuccess) {
      setLanguage_id(
        tech_round_leads?.data?.data?.series_language_data[0].language_id
      );
      setSeries_id(
        tech_round_leads?.data?.data?.series_language_data[0]
          .assigned_test_series
      );
    }
  }, [tech_round_leads]);
  const resultData = [
    { value: "selected", label: "Selected" },
    { value: "rejected", label: "Rejected" },
    { value: "on Hold", label: "On Hold" },
    { value: "pending", label: "Pending" },
  ];
  const technicalRoundStatus = [
    { value: "selected", label: "Selected" },
    { value: "rejected", label: "Rejected" },
    { value: "on hold", label: "On Hold" },
    { value: "pending", label: "Pending" },
    { value: "opened", label: "Opened" },
  ];
  const navigate = useNavigate("/viewQuestionlist");
  const [activeTab, setActiveTab] = useState("Add Person");

  const handleNextTab = () => {
    if (activeTab === "Technical") {
      setActiveTab("Face to face");
    } else if (activeTab === "Face to face") {
      setActiveTab("Final Interaction");
    }
  };

  useEffect(() => {
    dispatch(get_all_leads({ page }));
    dispatch(get_hr_round_candidate({ limit: 10 }));
    dispatch(get_all_tech_round_leads());
  }, []);

  useEffect(() => {
    if (hr_round_candidate_status?.isSuccess) {
      toast.success("Candidate status updated successfully");
      dispatch(get_hr_round_candidate({ limit: 10 }));
      dispatch(clear_hr_lead_updated_status());
    }
    if (hr_round_candidate_status?.isError) {
      toast.error(hr_round_candidate_status?.error?.message);
      dispatch(clear_hr_lead_updated_status());
    }
  }, [hr_round_candidate_status]);

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    setCurrentTab(selectedTab);
    navigate({
      ...location,
      state: { tab: selectedTab },
    });
  };

  const changeTechStatus = (e, interview_id) => {
    dispatch(update_technical_round_status({ interview_id, status: e.value }));
  };

  useEffect(() => {
    if (update_tech_status?.isSuccess) {
      toast.success("Lead status Updated successfully");
      dispatch(get_all_tech_round_leads());
      dispatch(clear_tech_round_status_state());
    }
    if (update_tech_status?.isError) {
      toast.success(update_tech_status?.error?.message);
      dispatch(clear_tech_round_status_state());
    }
  }, [update_tech_status]);

  return (
    <div>
      <Tabs
        defaultActiveKey="Add Person"
        id="uncontrolled-tab-example"
        className=" interview_lead_tabs_outer"
        activeKey={activeTab}
        onSelect={(k) => handleTabSelect(k)}
      >
        <Tab eventKey="Add Person" title="Add Person">
          <div className="table-responsive transparent_bg">
            <table className="employee_detail_table">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>User Name</th>
                  <th>Profile</th>
                  <th>Experience</th>
                  <th>Current salary</th>
                  <th>Expected salray</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(all_leads?.data?.data) ? (
                  all_leads?.data?.data.filter((lead) => lead?.in_round === 0)
                    .length > 0 ? (
                    all_leads?.data?.data.map((lead, i) => {
                      if (lead?.in_round === 0) {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              <div className="d-flex justify-content-between align-items-center">
                                {lead?.name}
                                <div className="icon_wrapper">
                                  <img
                                    src={insight_icon}
                                    height={"17px"}
                                    width={"17px"}
                                    className="cursor_pointer"
                                    alt=""
                                  />
                                  <div className="icon_content_outer_wrraper">
                                    <div className="icon_content_outer">
                                      <div className="triangle"></div>
                                      <div className="tooltip_content">
                                        <ul className="user_info_detail_list">
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              Name :
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.name}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              Phone Number :
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.phone_number}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              Email :
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.email}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              Gender :{" "}
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.gender}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              DOB :{" "}
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.dob}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              Expereience :{" "}
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.experience}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              Current Salary :{" "}
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.current_salary}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              Expected Salary
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.expected_salary}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              Profile{" "}
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.profile}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              Last Company :{" "}
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.last_company}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              State :{" "}
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.state}
                                            </h4>
                                          </li>
                                          <li className="d-flex gap-2">
                                            <h3 className="cmn_text_heading">
                                              House address :{" "}
                                            </h3>
                                            <h4 className="cmn_text_heading">
                                              {lead?.house_addresss}
                                            </h4>
                                          </li>
                                        </ul>
                                        <div className="text-end">
                                          <button
                                            className="cmn_Button_style"
                                            onClick={() => {
                                              navigate("/editPerson", {
                                                state: { leadData: lead },
                                              });
                                            }}
                                          >
                                            Edit
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{lead?.profile}</td>
                            <td>{lead?.experience}</td>
                            <td>{lead?.current_salary}Rs</td>
                            <td>{lead?.expected_salary}Rs</td>
                            <td>
                              <button
                                className="cmn_Button_style"
                                onClick={() => {
                                  setLeadId(lead?.id);
                                  setShowHrQuestionModal(true);
                                }}
                              >
                                Start
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No lead Found
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Invalid data format
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey="HR" title="HR">
          <div className="table-responsive transparent_bg">
            <table className="employee_detail_table">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th> User Name </th>
                  <th>Profile</th>
                  <th>Experience</th>
                  <th>Interview rating/question</th>
                  <th>Interview Result</th>
                  <th>Start Next Round</th>
                </tr>
              </thead>
              <tbody>
                {all_hr_round_candidate?.data?.data?.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No HR round leads available.
                    </td>
                  </tr>
                ) : (
                  all_hr_round_candidate?.data?.data?.map((candidate, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <div className="d-flex justify-content-between align-items-center">
                            {candidate?.name}
                          </div>
                        </td>
                        <td>{candidate?.profile}</td>
                        <td>{candidate?.experience}</td>
                        <td
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate("/viewQuestionlist", {
                              state: {
                                interview_id: candidate?.interview_id,
                                lead_id: candidate?.id,
                              },
                            });
                          }}
                        >
                          View Questions List
                        </td>
                        <td>
                          <div className="form-group new_employee_form_group">
                            <CustomSelectComp
                              optionsData={resultData}
                              value={candidate?.hr_round_result}
                              changeHandler={(e) =>
                                dispatch(
                                  hr_update_lead_status({
                                    interview_id: candidate?.interview_id,
                                    hr_round_result: e.value,
                                  })
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <button
                            className="cmn_Button_style"
                            onClick={() => {
                              setLeadId(candidate?.id);
                              setLanguage(candidate?.profile);
                              setShowTechInterviewQuesModal(true);
                            }}
                          >
                            Start
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey="Technical" title="Technical">
          <div className="table-responsive transparent_bg">
            <table className="employee_detail_table">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th> User Name </th>
                  <th>Profile</th>
                  <th>Experience</th>
                  <th>Question/Answers</th>
                  <th>Technical Result</th>
                  <th>Start Next Round</th>
                </tr>
              </thead>
              <tbody>
                {tech_round_leads?.data?.data?.data?.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No technical round leads available.
                    </td>
                  </tr>
                ) : (
                  tech_round_leads?.data?.data?.data?.map((tech_leads, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <div className="d-flex justify-content-between align-items-center">
                            {tech_leads?.name}
                          </div>
                        </td>
                        <td>{tech_leads?.profile}</td>
                        <td>{tech_leads?.experience}</td>
                        <td
                          className="cursor_pointer"
                          style={{ textDecoration: "underline" }}
                          onClick={() => {
                            navigate("/questionAnswerSheet", {
                              state: {
                                lead_id: tech_leads?.id,
                                language_id: language_id,
                                series_id: series_id,
                              },
                            });
                          }}
                        >
                          View Questions List
                        </td>
                        <td>
                          <div className="form-group new_employee_form_group">
                            <CustomSelectComp
                              optionsData={technicalRoundStatus}
                              value={tech_leads?.technical_round_result}
                              changeHandler={(e) =>
                                changeTechStatus(e, tech_leads?.interview_id)
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <button
                            className="cmn_Button_style"
                            onClick={handleNextTab}
                          >
                            Start
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey="Face to face" title="Face to face">
          <div className="table-responsive transparent_bg">
            <table className="employee_detail_table">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th> User Name </th>
                  <th>Profile</th>
                  <th>Experience</th>
                  <th>Salary</th>
                  <th>Technical Result</th>
                  <th>Final Round</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      John
                      <img src={insight_icon} height={"17px"} width={"17px"} />
                    </div>
                  </td>
                  <td>Java developer</td>
                  <td>2.5</td>
                  <td> 20000Rs</td>
                  <td>
                    <div className="form-group new_employee_form_group">
                      <CustomSelectComp />
                    </div>
                  </td>
                  <td>
                    <button
                      className="cmn_Button_style"
                      onClick={handleNextTab}
                    >
                      Start
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey="Final Interaction" title="Final Interaction">
          <div className="table-responsive transparent_bg">
            <table className="employee_detail_table">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th> User Name </th>
                  <th>Profile</th>
                  <th>Experience</th>
                  <th>Salary</th>
                  <th>Technical Result</th>
                  <th>Final Round</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      John
                      <img src={insight_icon} height={"17px"} width={"17px"} />
                    </div>
                  </td>
                  <td>Java developer</td>
                  <td>2.5</td>
                  <td> 20000Rs</td>
                  <td>
                    <div className="form-group new_employee_form_group">
                      <CustomSelectComp optionsData={resultData} />
                    </div>
                  </td>
                  <td>
                    <button className="cmn_Button_style cmn_darkgray_btn">
                      Start
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tab>
      </Tabs>
      {showTechInterviewQuesModal && (
        <TechInterviewQuestionModal
          show={showTechInterviewQuesModal}
          setShow={setShowTechInterviewQuesModal}
          language={language}
          leadId={leadId}
        />
      )}
      {showHrQuestionModal && (
        <HrQuestionModal
          show={showHrQuestionModal}
          setShow={setShowHrQuestionModal}
          leadId={leadId}
        />
      )}
    </div>
  );
}

export default TabComp;
