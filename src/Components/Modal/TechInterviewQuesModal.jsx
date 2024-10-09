import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import InputField from "../Common/InputField";
import { FaSort } from "react-icons/fa";
import CustomSelectComp from "../Common/CustomSelectComp";
import { get_selected_language_series } from "../../utils/redux/interviewLeadsSlice/technicalRound/getAllSelectedTestSeries";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  send_test_link,
  clear_sent_test_link_state,
} from "../../utils/redux/interviewLeadsSlice/hrRound/sendTestLink";
import { get_hr_round_candidate } from "../../utils/redux/interviewLeadsSlice/hrRound/getHrRoundCandidate";

const TechInterviewQuestionModal = ({ show, setShow, language, leadId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [series, setSeries] = useState([]);
  const [selected_series, setSelected_series] = useState(null);
  const series_data = useSelector((store) => store.SELECTED_LANGUAGE_SERIES);
  const test_link_status = useSelector((store) => store.SENT_TEST_LINK);
  console.log(test_link_status, "this is the series data");

  const handleClose = () => {
    setShow(false);
  };
  const startHandler = () => {
    setShow(false);
    navigate("/hrInterViewQuestion");
  };

  useEffect(() => {
    dispatch(get_selected_language_series({ language }));
  }, [language]);

  useEffect(() => {
    if (series_data?.isSuccess) {
      series_data?.data?.data?.forEach((data) => {
        if (!series.some((item) => item.value === data?.id)) {
          series.push({ value: data?.id, label: data?.series_name });
        }
      });
    }
    if (series_data?.isError) {
      toast.error(series_data?.error.message);
    }
  }, [series_data]);

  const changeHandler = (e) => {
    setSelected_series(e.value);
  };

  const handleSendLink = async () => {
    if (leadId && selected_series) {
      dispatch(
        send_test_link({ lead_id: leadId, test_series: selected_series })
      );
    } else {
      toast.error("Something went wrong : lead id is missing");
    }
  };

  useEffect(() => {
    if (test_link_status?.isSuccess) {
      toast.success("Test link sent successfully");
      dispatch(get_hr_round_candidate({ limit: 10 }));
      dispatch(clear_sent_test_link_state());
      setShow(false);
    }
    if (test_link_status?.isError) {
      toast.error(test_link_status?.error?.message);
      dispatch(clear_sent_test_link_state());
    }
  }, [test_link_status]);

  return (
    <div>
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter Invite_candidate_modal"
        centered
        onHide={handleClose}
        className="custom_modal_container"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3 className="heading mt-3">
            Choose the technical round Interview questions for Test series.{" "}
          </h3>

          <InputField
            placeholder={"Designer"}
            labelname={"Profile"}
            type={"text"}
            classname={"new_employee_form_group"}
            value={language}
          />
          <div className="new_employee_form_group form-group">
            <label>Test Series</label>
            <div className="mt-3">
              <CustomSelectComp
                optionsData={series}
                changeHandler={changeHandler}
                value={selected_series}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="cmn_Button_style cmn_darkgray_btn">Cancel </button>
          <button className="cmn_Button_style" onClick={() => handleSendLink()}>
            Send Link
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TechInterviewQuestionModal;
