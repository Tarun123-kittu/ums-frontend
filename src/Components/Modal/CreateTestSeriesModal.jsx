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
  const is_series_created = useSelector((store) => store.CREATE_TEST_SERIES);
  const [id, setId] = useState("");

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
    const timeFormatRegex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (series_name && series_time && series_language && series_description) {
      if (!timeFormatRegex.test(series_time)) {
        toast.error("Please input time in HH:MM:SS fromat");
      } else {
        dispatch(
          create_test_series({
            language_id: series_language,
            series_name: series_name,
            time_taken: series_time,
            description: series_description,
          })
        );
      }
    } else {
      toast.error("All Fields are required to create test series");
    }
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
            type={"text"}
            classname={"new_employee_form_group"}
            onChange={(e) => setSeries_name(e?.target?.value)}
          />
          <InputField
            labelname={"Time taken to complete this series test"}
            placeholder={"HH:MM:SS"}
            type={"text"}
            classname={"new_employee_form_group"}
            onChange={(e) => setSeries_time(e?.target?.value)}
          />
          <div className="form-group new_employee_form_group">
            <label>Profile</label>
            <div className="mt-2">
              <CustomSelectComp
                optionsData={all_languagages}
                changeHandler={changeHandler}
              />
            </div>
          </div>
          <div className="form-group new_employee_form_group">
            <label>Description</label>
            <textarea
              className="form-control mt-2"
              placeholder="Enter The Small Description"
              rows={4}
              onChange={(e) => setSeries_description(e?.target?.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="cmn_Button_style"
            onClick={() => handleCreateTestSeries()}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTestSeriesModal;
