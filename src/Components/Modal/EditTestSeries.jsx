import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import InputField from "../Common/InputField";
import CustomSelectComp from "../Common/CustomSelectComp";
import { useDispatch, useSelector } from "react-redux";
import {
  get_series,
  clear_get_series_state,
} from "../../utils/redux/testSeries/getSeries";
import toast from "react-hot-toast";
import {
  update_test_series,
  clear_update_test_series_state,
} from "../../utils/redux/testSeries/updatTestSeries";
import { get_all_series } from "../../utils/redux/testSeries/getAllTestSeries";
import { UsePermissions } from "../Utils/customHooks/useAllPermissions";
import UnauthorizedPage from "../Unauthorized/UnauthorizedPage";

const EditTestSeriesModal = ({ show, setShow, seriesId, languages }) => {
  const dispatch = useDispatch();
  const permissions = UsePermissions("Test");
  const [series_name, setSeries_name] = useState("");
  const [series_time, setSeries_time] = useState("");
  const [series_language, setSeries_language] = useState("");
  const [experience, setExperience] = useState("");
  const [series_description, setSeries_description] = useState("");
  const [all_languagages, setAll_languages] = useState([]);
  const series_data = useSelector((store) => store.GET_SERIES);
  const [errorMessage, setErrorMessage] = useState();
  const updated_state = useSelector((store) => store.UPDATE_TESTSERIES);

  useEffect(() => {
    return () => {
      dispatch(clear_get_series_state());
    };
  }, []);

  useEffect(() => {
    if (seriesId) {
      dispatch(get_series({ id: seriesId }));
    } else {
      toast.error("Please select series which you want to update");
      setShow(false);
    }
  }, [seriesId]);

  const experienceObj = [
    { value: "Fresher", label: "Fresher" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Professional", label: "Professional" },
  ];

  useEffect(() => {
    if (series_data?.isSuccess) {
      setSeries_name(series_data?.data?.data?.series_name);
      setSeries_time(series_data?.data?.data?.time_taken);
      setSeries_language(series_data?.data?.data?.language_id);
      setSeries_description(series_data?.data?.data?.description);
      setExperience(series_data?.data?.data?.experience_level);
    }
  }, [series_data]);

  useEffect(() => {
    if (languages?.length !== 0) {
      languages?.forEach((data) => {
        if (!all_languagages.some((item) => item.value === data?.id)) {
          all_languagages.push({ value: data?.id, label: data?.language });
        }
      });
    }
  }, [languages]);

  const handleClose = () => {
    setShow(false);
  };

  const changeHandler = (e) => {
    setSeries_language(e.value);
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
      update_test_series({
        seriesId: seriesId,
        language_id: series_language,
        series_name: series_name,
        time_taken: series_time,
        description: series_description,
        experience_level: experience,
      })
    );
  };

  useEffect(() => {
    if (updated_state?.isSuccess) {
      toast.success("Series updated successfully");
      dispatch(get_all_series({ id: "" }));
      dispatch(clear_get_series_state());
      dispatch(clear_update_test_series_state());
      setShow(false);
    }
    if (updated_state?.isErrpr) {
      toast.success(updated_state?.error?.message);
      dispatch(clear_update_test_series_state());
      setShow(false);
    }
  }, [updated_state]);

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

  const changeExperienceHandler = (e) => {
    setExperience(e.value);
  };

  return permissions?.can_view ? (
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
          <h3 className="heading">Edit Test Series </h3>
          <InputField
            labelname={"Series "}
            placeholder={"Enter Series Name"}
            type={"text"}
            classname={"new_employee_form_group"}
            value={series_name}
            onChange={(e) => setSeries_name(e.target.value)}
            styleTrue={errorMessage?.series_name}
          />
          <span style={{ color: "red", fontSize: "13px" }}>
            {errorMessage?.series_name}
          </span>
          <InputField
            labelname={"Time taken to complete this series test"}
            placeholder={"Enter Estimated Times"}
            type={"text"}
            classname={"new_employee_form_group"}
            value={series_time}
            onChange={handleTimeChange}
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
                value={series_language}
                optionsData={all_languagages}
                changeHandler={changeHandler}
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
              value={series_description}
              onChange={(e) => setSeries_description(e.target.value)}
              styleTrue={errorMessage?.series_description}
            />
            <span style={{ color: "red", fontSize: "13px" }}>
              {errorMessage?.series_description}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {permissions?.can_update && (
            <button
              className="cmn_Button_style"
              onClick={() => handleCreateTestSeries()}
            >
              Edit
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    <UnauthorizedPage />
  );
};

export default EditTestSeriesModal;
