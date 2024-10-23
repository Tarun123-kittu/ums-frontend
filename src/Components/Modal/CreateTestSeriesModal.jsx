import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import InputField from "../Common/InputField";
import CustomSelectComp from "../Common/CustomSelectComp";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  create_test_series,
  clear_create_test_series_state,
} from "../../utils/redux/testSeries/createTestSeries";
import { get_all_series } from "../../utils/redux/testSeries/getAllTestSeries";

const CreateTestSeriesModal = ({ show, setShow, languages }) => {
  const dispatch = useDispatch();
  const [all_languagages, setAll_languages] = useState([]);
  const [series_name, setSeries_name] = useState("");
  const [series_time, setSeries_time] = useState("");
  const [series_language, setSeries_language] = useState("");
  const [series_description, setSeries_description] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [experience, setExperience] = useState("");
  const is_series_created = useSelector((store) => store.CREATE_TEST_SERIES);
  const [id, setId] = useState("");

  useEffect(() => {
    if (languages?.length !== 0) {
      languages?.forEach((data) => {
        if (!all_languagages.some((item) => item.value === data?.id)) {
          all_languagages.push({
            value: data?.id,
            label: data?.language,
          });
        }
      });
    }
  }, [languages]);

  const experienceObj = [
    { value: "Fresher", label: "Fresher" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Professional", label: "Professional" },
  ];
  const handleClose = () => {
    setShow(false);
  };

  const changeHandler = (e) => {
    setSeries_language(e.value);
  };
  const changeExperienceHandler = (e) => {
    setExperience(e.value);
  };

  const handleCreateTestSeries = () => {
    const missingData = {};
    const timeFormatRegex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!series_name) {
      missingData.series_name = "Series name is required";
      toast.error("Series name is required");
      setErrorMessage(missingData);
      return;
    }
    if (!series_time) {
      missingData.series_time = "Series time is required";
      toast.error("Series time is required");
      setErrorMessage(missingData);
    }
    if (!series_language) {
      missingData.series_language = "Series language is required";
      toast.error("Series language is required");
      setErrorMessage(missingData);
    }

    if (!series_description) {
      missingData.series_description = "Series description is required";
      toast.error("Series description is required");
      setErrorMessage(missingData);
    }

    if (!experience) {
      missingData.experience = "Series experience is required";
      toast.error("Series Experience is required");
      setErrorMessage(missingData);
    }

    if (Object.keys(missingData).length > 0) {
      setErrorMessage(missingData);
      return;
    }
    if (!timeFormatRegex.test(series_time)) {
      toast.error("Please input time in HH:MM:SS format");
      return;
    }
    dispatch(
      create_test_series({
        language_id: series_language,
        series_name: series_name,
        time_taken: series_time,
        description: series_description,
        experience_level: experience,
      })
    );
  };

  const handleTimeChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d:]/g, "");
    let rawValue = value.replace(/:/g, "");

    if (rawValue.length > 6) {
      rawValue = rawValue.substring(0, 6);
    }
    if (rawValue.length > 2) {
      rawValue = rawValue.slice(0, 2) + ":" + rawValue.slice(2);
    }
    if (rawValue.length > 5) {
      rawValue = rawValue.slice(0, 5) + ":" + rawValue.slice(5);
    }

    setSeries_time(rawValue);
  };

  useEffect(() => {
    if (is_series_created?.isSuccess) {
      dispatch(get_all_series({ id }));
      toast.success("Test series created successfully");
      dispatch(clear_create_test_series_state());
      setShow(false);
    }
    if (is_series_created?.isError) {
      toast.error("Something went wrong please try again later");
      dispatch(clear_create_test_series_state());
      setShow(false);
    }
  }, [is_series_created]);
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
          <h3 className="heading">Create Test Series </h3>
          <InputField
            labelname={"Series "}
            placeholder={"Enter Series Name"}
            type={"number"}
            classname={"new_employee_form_group"}
            onChange={(e) => setSeries_name(e?.target?.value)}
            styleTrue={errorMessage?.series_name}
          />
          <span style={{ color: "red", fontSize: "13px" }}>
            {errorMessage?.series_name}
          </span>
          <InputField
            labelname={"Time taken to complete this series test"}
            placeholder={"HH:MM:SS"}
            type={"text"}
            classname={"new_employee_form_group"}
            onChange={handleTimeChange}
            value={series_time}
            styleTrue={errorMessage?.series_time}
          />
          <span style={{ color: "red", fontSize: "13px" }}>
            {errorMessage?.series_time}
          </span>
          <div className="form-group new_employee_form_group">
            <label>Experience</label>
            <div className="mt-2">
              <CustomSelectComp
                optionsData={experienceObj}
                changeHandler={changeExperienceHandler}
                value={experience}
                styleTrue={errorMessage?.experience}
              />
              <span style={{ color: "red", fontSize: "13px" }}>
                {errorMessage?.experience}
              </span>
            </div>
          </div>
          <div className="form-group new_employee_form_group">
            <label>Profile</label>
            <div className="mt-2">
              <CustomSelectComp
                optionsData={all_languagages}
                changeHandler={changeHandler}
                value={series_language}
                styleTrue={errorMessage?.series_language}
              />
              <span style={{ color: "red", fontSize: "13px" }}>
                {errorMessage?.series_language}
              </span>
            </div>
          </div>
          <div className="form-group new_employee_form_group">
            <label>Description</label>
            <textarea
              className="form-control mt-2"
              placeholder="Enter The Small Description"
              rows={4}
              onChange={(e) => setSeries_description(e?.target?.value)}
              style={
                errorMessage?.series_description
                  ? { border: "1px solid red" }
                  : {}
              }
            />
            <span style={{ color: "red", fontSize: "13px" }}>
              {errorMessage?.series_description}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="cmn_Button_style"
            onClick={() => handleCreateTestSeries()}
          >
            Save
            {is_series_created?.isLoading && (
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTestSeriesModal;
