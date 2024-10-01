import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HrQuestionModal from "../../Modal/HrQuestionModal";
import { useEffect, useState } from "react";
import TechInterviewQuestionModal from "../../Modal/TechInterviewQuesModal";
import insight_icon from "../../assets/insight.svg";
import "./tabs.css";
import { useNavigate } from "react-router-dom";
import CustomSelectComp from "../CustomSelectComp";
import { get_all_leads } from "../../../utils/redux/interviewLeadsSlice/getAllLeads";
import { useDispatch, useSelector } from "react-redux";

function TabComp() {
  const dispatch = useDispatch();
  const [showHrQuestionModal, setShowHrQuestionModal] = useState(false);
  const [showTechInterviewQuesModal, setShowTechInterviewQuesModal] =
    useState(false);
  const [page, setPage] = useState(1);
  const all_leads = useSelector((Store) => Store.ALL_LEADS);
  console.log(all_leads, "this is the all leads");
  const resultData = [
    { value: "Selected", label: "Selected" },
    { value: "Rejected", label: "Rejected" },
    { value: "On Hold", label: "On Hold" },
  ];
  const navigate = useNavigate("/viewQuestionlist");
  const [activeTab, setActiveTab] = useState("Add Person"); // Manage active tab

  const handleNextTab = () => {
    if (activeTab === "Technical") {
      setActiveTab("Face to face");
    } else if (activeTab === "Face to face") {
      setActiveTab("Final Interaction");
    }
  };

  useEffect(() => {
    dispatch(get_all_leads({ page }));
  }, []);

  return (
    <div>
      <Tabs
        defaultActiveKey="Add Person"
        id="uncontrolled-tab-example"
        className=" interview_lead_tabs_outer"
        activeKey={activeTab}
        onSelect={(k) => {
          setActiveTab(k);
        }}
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
                {all_leads?.data?.data?.map((lead, i) => {
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
                                        Expected Salary{" "}
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
                            setShowHrQuestionModal(true);
                          }}
                        >
                          Start
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey=" HR" title="HR">
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
                  <td
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/viewQuestionlist");
                    }}
                  >
                    3.6 View Questions List
                  </td>
                  <td>
                    <div className="form-group new_employee_form_group">
                      {/* <select className='form-control'>
                <option>On Hold</option>
              </select> */}
                      <CustomSelectComp optionsData={resultData} />
                    </div>
                  </td>
                  <td>
                    <button
                      className="cmn_Button_style"
                      onClick={() => {
                        setShowTechInterviewQuesModal(true);
                      }}
                    >
                      Start
                    </button>
                  </td>
                </tr>
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
                  <td
                    className="cursor_pointer"
                    style={{ textDecoration: "underline" }}
                    onClick={() => {
                      navigate("/questionAnswerSheet");
                    }}
                  >
                    {" "}
                    View Questions List
                  </td>
                  <td>
                    <div className="form-group new_employee_form_group">
                      <CustomSelectComp optionsData={resultData} />
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
        />
      )}
      {showHrQuestionModal && (
        <HrQuestionModal
          show={showHrQuestionModal}
          setShow={setShowHrQuestionModal}
        />
      )}
    </div>
  );
}

export default TabComp;
