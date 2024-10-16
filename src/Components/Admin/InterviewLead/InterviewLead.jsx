import React, { useState, useEffect } from "react";

import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import Notification from "../Notification/Notification";
import TabComp from "../../Common/Tabs/Tabs";
import "./interviewLead.css";
import { useNavigate } from "react-router-dom";
import CommonDeleteModal from "../../Modal/CommonDeleteModal";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import CustomSelectComp from "../../Common/CustomSelectComp";
import PaginationComp from "../../Pagination/Pagination";
import { useSelector } from "react-redux";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import { get_all_languages } from "../../../utils/redux/testSeries/getAllLanguages";
import { useDispatch } from "react-redux";
import { get_all_leads } from "../../../utils/redux/interviewLeadsSlice/getAllLeads";
import { get_hr_round_candidate } from "../../../utils/redux/interviewLeadsSlice/hrRound/getHrRoundCandidate";
import { get_all_tech_round_leads } from "../../../utils/redux/interviewLeadsSlice/technicalRound/getAllTechRoundLeads";
import { get_face_round_leads } from "../../../utils/redux/interviewLeadsSlice/getFaceRoundLeads";
import { get_final_round_leads } from "../../../utils/redux/interviewLeadsSlice/technicalRound/getFinalRoundLeads";
const InterviewLead = () => {
  const { show } = useAppContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [all_languagages, setAll_languages] = useState([]);
  const [selected_language, setSelected_language] = useState("");
  const [selected_experience, setSelected_experience] = useState("");
  const [selected_result, setSelected_result] = useState("");
  const [hr_user_permissions, setHr_user_permissions] = useState({});
  const [currentTab, setCurrentTab] = useState("Add Person");
  const [open_tab, setOpen_tab] = useState("Add Person");
  const [page, setPage] = useState(1);
  const all_permissions = useSelector((store) => store.USER_PERMISSIONS);
  const languages = useSelector((store) => store.ALL_LANGUAGES?.data?.data);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );
  useEffect(() => {
    if (localStorage.getItem("roles")?.includes("Employee")) {
      navigate("/mark-attendence");
    }
  }, [navigate]);

  useEffect(() => {
    const can_hr_create = all_permissions?.data?.data?.find(
      (el) => el.role === "HR" && el.permission === "Interviews"
    );
    setHr_user_permissions(can_hr_create);
  }, [all_permissions]);

  const obj = [{ name: "Interview Leads", path: "/interviewLead" }];

  const experienceObj = [
    { value: 1, label: "1 Year" },
    { value: 2, label: "2 Year" },
    { value: 3, label: "3 Year" },
    { value: 4, label: "4 Year" },
    { value: 5, label: "5 Year" },
  ];

  const resultObj = [
    { value: "selected", label: "Selected" },
    { value: "rejected", label: "Rejected" },
    { value: "on hold", label: "on Hold" },
    { value: "pending", label: "Pending" },
  ];

  useEffect(() => {
    dispatch(get_all_languages());
  }, []);

  useEffect(() => {
    if (languages?.length !== 0) {
      languages?.forEach((data) => {
        if (!all_languagages.some((item) => item.value === data?.id)) {
          all_languagages.push({ value: data?.id, label: data?.language });
        }
      });
    }
  }, [languages]);

  if (
    !(
      user_all_permissions?.roles_data?.includes("Admin") ||
      user_all_permissions?.roles_data?.includes("HR") ||
      user_all_permissions?.roles_data?.includes("Developer")
    )
  ) {
    return <UnauthorizedPage />;
  }

  const changeHandler = (e) => {
    setSelected_language(e.value);
  };

  const changeExperienceHandler = (e) => {
    setSelected_experience(e.value);
  };

  const changeResultHandler = (e) => {
    setSelected_result(e.value);
  };

  const searchHandler = () => {
    if (open_tab === "Add Person") {
      dispatch(
        get_all_leads({
          page,
          experience: selected_experience,
          profile: selected_language,
        })
      );
    }
    if (open_tab === "HR") {
      dispatch(
        get_hr_round_candidate({
          pageNumber: page,
          experience: selected_experience,
          profile: selected_language,
          result_status: selected_result,
        })
      );
    }
    if (open_tab === "Technical") {
      dispatch(
        get_all_tech_round_leads({
          page,
          limit: 10,
          experience: selected_experience,
          profile: selected_language,
          result_status: selected_result,
        })
      );
    }
    if (open_tab === "Face to face") {
      dispatch(
        get_face_round_leads({
          page,
          limit: 10,
          experience: selected_experience,
          profile: selected_language,
          result_status: selected_result,
        })
      );
    }
    if (open_tab === "Final Interaction") {
      dispatch(
        get_final_round_leads({
          page,
          limit: 10,
          experience: selected_experience,
          profile: selected_language,
          result_status: selected_result,
        })
      );
    }
  };

  const handleClearResult = () => {
    if (open_tab === "Add Person") {
      dispatch(
        get_all_leads({
          page,
          experience: "",
          profile: "",
        })
      );
    }
    if (open_tab === "HR") {
      dispatch(
        get_hr_round_candidate({
          pageNumber: page,
          experience: "",
          profile: "",
          result_status: "",
        })
      );
    }
    if (open_tab === "Technical") {
      dispatch(
        get_all_tech_round_leads({
          page,
          limit: 10,
          experience: "",
          profile: "",
          result_status: "",
        })
      );
    }
    if (open_tab === "Face to face") {
      dispatch(
        get_face_round_leads({
          page,
          limit: 10,
          experience: "",
          profile: "",
          result_status: "",
        })
      );
    }
    if (open_tab === "Final Interaction") {
      dispatch(
        get_final_round_leads({
          page,
          limit: 10,
          experience: "",
          profile: "",
          result_status: "",
        })
      );
    }
  };

  return (
    <section className="Interviewlead_outer">
      <div
        className={`wrapper gray_bg admin_outer  ${show ? "cmn_margin" : ""}`}
      >
        <Notification />
        <div className="cmn_padding_outer minheight">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />
          <div className="employee_list_outer ">
            <div className="d-flex employee_container align-items-end mt-3">
              <div className="form-group new_employee_form_group employee_wrapper">
                <label>Profile</label>
                <div className="mt-2">
                  <CustomSelectComp
                    placeholder={"Select Profile"}
                    optionsData={all_languagages}
                    changeHandler={changeHandler}
                    value={selected_language}
                  />
                </div>
              </div>

              <div className="form-group new_employee_form_group employee_wrapper">
                <label>Experience</label>
                <div className="mt-2">
                  <CustomSelectComp
                    optionsData={experienceObj}
                    changeHandler={changeExperienceHandler}
                    value={selected_experience}
                  />
                </div>
              </div>

              {open_tab !== "Add Person" && (
                <div className="form-group new_employee_form_group employee_wrapper">
                  <label>Result</label>
                  <div className="mt-2">
                    <CustomSelectComp
                      optionsData={resultObj}
                      changeHandler={changeResultHandler}
                      value={selected_result}
                    />
                  </div>
                </div>
              )}

              <div className="employee_wrapper text-end serach_add_outer d-flex gap-2">
                <button
                  className="cmn_Button_style cmn_darkgray_btn"
                  onClick={() => {
                    handleClearResult();
                  }}
                >
                  Clear
                </button>
                <button
                  className="cmn_Button_style"
                  onClick={() => searchHandler()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="inerterview_lead_tabs cmn_border mt-3">
              <TabComp
                setCurrentTab={setCurrentTab}
                setOpen_tab={setOpen_tab}
              />
              {
                <div>
                  {(user_all_permissions?.roles_data?.includes("Admin") ||
                    hr_user_permissions?.can_create) &&
                    currentTab === "Add Person" && (
                      <button
                        className="cmn_Button_style addnew_btn_outer"
                        onClick={() => {
                          navigate("/addNewPerson");
                        }}
                      >
                        Add New
                      </button>
                    )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <CommonDeleteModal
          dialogClassname={"custom_modal_width"}
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          heading_text={"Are you sure to delete the user list"}
          paragraph_text={
            "Please confirm your action. Deleting the user list is permanent and cannot be reversed."
          }
        />
      )}
    </section>
  );
};

export default InterviewLead;
