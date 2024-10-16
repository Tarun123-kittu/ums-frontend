import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Notification from "../Notification/Notification";
import { useAppContext } from "../../Utils/appContecxt";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import CustomSelectComp from "../../Common/CustomSelectComp";
import "./testseries.css";
import { RiDeleteBinLine } from "react-icons/ri";
import CreateTestSeriesModal from "../../Modal/CreateTestSeriesModal";
import { useNavigate } from "react-router-dom";
import CommonDeleteModal from "../../Modal/CommonDeleteModal";
import EditTestSeriesModal from "../../Modal/EditTestSeries";
import { get_all_languages } from "../../../utils/redux/testSeries/getAllLanguages";
import { useDispatch, useSelector } from "react-redux";
import { get_all_series } from "../../../utils/redux/testSeries/getAllTestSeries";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import {
  delete_series,
  clear_delete_series_state,
} from "../../../utils/redux/testSeries/deleteSeries";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";
import Loader from "../../assets/Loader.gif"

const Testseries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { show } = useAppContext();
  const [showCreateTestSeriesModal, setShowCreateTestSeriesModal] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditSeriesModal, setShowEditSeriesModal] = useState(false);
  const [id, setId] = useState("");
  const [all_languagages, setAll_languages] = useState([]);
  const [search_enable, setSearch_enable] = useState(false);
  const [seriesId, setSeriesId] = useState(null);
  const languages = useSelector((store) => store.ALL_LANGUAGES?.data?.data);
  const all_series = useSelector((store) => store.ALL_SERIES);
  const deleted_state = useSelector((store) => store.DELETE_SERIES);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );

  useEffect(() => {
    if (localStorage.getItem('roles')?.includes('Employee')) {
      navigate("/mark-attendence");
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(get_all_languages());
    dispatch(get_all_series({ id }));
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

  useEffect(() => {
    if (all_series?.isSuccess) {
      setSearch_enable(false);
    }
    if (all_series?.isError) {
      setSearch_enable(false);
      toast.error(all_series?.error?.message);
    }
  }, [all_series]);

  useEffect(() => {
    if (deleted_state?.isSuccess) {
      toast.success("Series deleted successfully");
      setShowDeleteModal(false);
      dispatch(get_all_series({ id }));
      dispatch(clear_delete_series_state());
    }
    if (deleted_state?.isError) {
      toast.error(deleted_state?.error?.message);
      setShowDeleteModal(false);
      dispatch(clear_delete_series_state());
    }
  }, [deleted_state]);

  const formatTimeToReadable = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const intHours = parseInt(hours);
    const intMinutes = parseInt(minutes);

    if (intHours > 0) {
      return `${intHours} Hour${intHours > 1 ? "s" : ""}`;
    } else if (intMinutes > 0) {
      return `${intMinutes} Minute${intMinutes > 1 ? "s" : ""}`;
    } else {
      return "0 Minutes";
    }
  };

  const obj = [{ name: "Test Series", path: "" }];

  const changeHandler = (e) => {
    setId(e.value);
    setSearch_enable(true);
  };

  const handleSearch = () => {
    if (!search_enable) {
      toast.error("Please select profile");
    } else {
      dispatch(get_all_series({ id }));
    }
  };

  const handleDelete = () => {
    dispatch(delete_series({ id: seriesId }));
  };

  if (!(user_all_permissions?.roles_data?.includes("Admin") || user_all_permissions?.roles_data?.includes("HR") || user_all_permissions?.roles_data?.includes("Developer"))) {
    return <UnauthorizedPage />;
  }


  return (
    <section className="test_serie_wrapper">
      <div
        className={`wrapper gray_bg admin_outer ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="cmn_padding_outer">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
          />

          <div className="d-flex test_series_header employee_container align-items-end mt-3">
            <div className="d-flex gap-3 test_series_header_wrapper">
              <div className="form-group new_employee_form_group">
                <label>Profile</label>
                <div className="profile_select_box">
                  {" "}
                  <CustomSelectComp
                    optionsData={all_languagages}
                    changeHandler={changeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="gap-3 d-flex text-center serach_add_outer">
              <button
                className="cmn_Button_style cmn_darkgray_btn"
                onClick={() => handleSearch()}
              >
                Search
              </button>
              <button
                onClick={() => {
                  setShowCreateTestSeriesModal(true);
                }}
                className="cmn_Button_style"
              >
                Add
              </button>
            </div>
          </div>

          <div className="create_series_outer mt-3">
            <div className="row">
              {all_series?.isLoading ? <img src={Loader} alt="loader" className="loader_gif" /> : all_series?.data?.data?.map((series, i) => {
                return (
                  <div className="col-lg-4 col-sm-12 col-md-6">
                    <div key={i} className="series_card">
                      <div className="d-flex justify-content-end gap-1 align-items-center series_description_outer">
                        <h3 className="series_created_text">
                          <FaRegUser /> {series?.name}
                        </h3>
                        <h3 className="series_created_text">
                          {series?.language}
                        </h3>
                        <h3 className="series_created_text">
                          {formatTimeToReadable(series?.time_taken)}
                        </h3>
                        {localStorage?.getItem('userId')?.toString() === series?.createdBy?.toString() && (
                          <RiDeleteBinLine
                            className="cursor_pointer series_created_heading"
                            onClick={() => {
                              setSeriesId(series?.id);
                              setShowDeleteModal(true);
                            }}
                          />
                        )}
                      </div>

                      <h2 className="card_heading">{series?.series_name}</h2>
                      <h6>{series?.description}</h6>
                      <div className="create_series_btn_outer">
                        <button
                          className="cmn_cancel_btn"
                          onClick={() => {
                            setSeriesId(series?.id);
                            setShowEditSeriesModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="cmn_Button_style mt-3"
                          onClick={() => {
                            navigate("/viewTestSeriesQuestion", {
                              state: {
                                id: series?.id,
                                language_id: series?.language_id,
                              },
                            });
                          }}
                        >
                          View Questions
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <CommonDeleteModal
          dialogClassname={"custom_modal_width"}
          heading_text={
            "Are you sure to delete the 4 Year of Experience form Test Series"
          }
          paragraph_text={""}
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          handleDelete={handleDelete}
        />
      )}
      {showCreateTestSeriesModal && (
        <CreateTestSeriesModal
          show={showCreateTestSeriesModal}
          setShow={setShowCreateTestSeriesModal}
          languages={languages}
        />
      )}
      {showEditSeriesModal && (
        <EditTestSeriesModal
          show={showEditSeriesModal}
          setShow={setShowEditSeriesModal}
          seriesId={seriesId}
          languages={languages}
        />
      )}
    </section>
  );
};

export default Testseries;
