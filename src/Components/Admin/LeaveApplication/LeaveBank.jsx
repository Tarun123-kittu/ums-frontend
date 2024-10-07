import React, { useState, useEffect } from "react";
import BreadcrumbComp from "../../Breadcrumb/BreadcrumbComp";
import Notification from "../Notification/Notification";
import { FiEdit } from "react-icons/fi";
import Sidebar from "../../Sidebar/Sidebar";
import { useAppContext } from "../../Utils/appContecxt";
import Select from "../../Common/Select";
import EditLeaveBankModal from "../../Modal/EditLeaveBankModal";
import { useDispatch, useSelector } from "react-redux";
import { get_leave_bank_report } from "../../../utils/redux/leaveSlice/getLeaveBankReport";
import PaginationComp from "../../Pagination/Pagination";
import CustomSelectComp from "../../Common/CustomSelectComp";
import UnauthorizedPage from "../../Unauthorized/UnauthorizedPage";

const LeaveBank = () => {
  const dispatch = useDispatch();
  const [showEditLeaveModal, setShowEditLeaveModal] = useState(false);
  const leave_bank_data = useSelector((store) => store.LEAVE_REPORT_BANK);
  const user_all_permissions = useSelector(
    (store) => store.USER_ALL_PERMISSIONS
  );
  const [session, setSession] = useState("");
  const [selected_year, setSelected_year] = useState("");
  const [selected_month, setSelected_month] = useState("");
  const [year, setYear] = useState([]);
  const [yearObj, setYearObj] = useState([]);
  const [financial_year, setFinancial_year] = useState([]);
  const obj = [
    { name: "Leave Application", path: "" },
    { name: "Leave Bank", path: "/leaveBank" },
  ];

  const monthDataObj = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const { show } = useAppContext();

  useEffect(() => {
    dispatch(
      get_leave_bank_report({
        session,
        month: selected_month,
        year: selected_year,
      })
    );
    years();
  }, []);

  const years = (startYear = 2020) => {
    setYear([]);
    let currentYear = new Date().getFullYear();
    let result = [];

    while (startYear <= currentYear) {
      result.push(startYear++);
    }
    setYear(result);
  };

  useEffect(() => {
    if (year?.length !== 0) {
      year?.forEach((data) => {
        if (!yearObj.some((item) => item.value === data)) {
          yearObj.push({ value: data, label: data });
          financial_year.push({
            value: data + "-" + (Number(data) + 1),
            label: data + "-" + (Number(data) + 1),
          });
        }
      });
    }
  }, [year]);

  const handleFilter = (e, filter) => {
    if (filter === "financial_year") setSession(e.value);
    if (filter === "month") setSelected_month(e.value);
    if (filter === "year") setSelected_year(e.value);
  };

  if (
    !(
      user_all_permissions?.roles_data?.includes("Admin") ||
      user_all_permissions?.roles_data?.includes("HR")
    )
  ) {
    return <UnauthorizedPage />;
  }

  return (
    <section className="attendenceBank_outer">
      <Sidebar />
      <div
        className={`wrapper gray_bg admin_outer  ${show ? "cmn_margin" : ""}`}
      >
        <Notification />

        <div className="cmn_padding_outer minheight">
          <BreadcrumbComp
            data={obj}
            classname={"inter_fontfamily employee_heading"}
            onBreadcrumbClick={""}
          />

          <div className="d-flex employee_container align-items-end mt-3">
            <div className="employee_wrapper">
              {/* <Select
                labelname={"Select Financial Year"}
                labelClass={""}
                options={financial_year}
                onChange={(e) => handleFilter(e, "financial_year")}
              /> */}
              <div className="form-group new_employee_form_group mt-2">
                <label className="modal_label">Select Financial Year</label>
                <div className="mt-2">
                  <CustomSelectComp
                    optionsData={financial_year}
                    changeHandler={(e) => handleFilter(e, "financial_year")}
                    value={session}
                  />
                </div>
              </div>
            </div>

            <div className="employee_wrapper">
              {/* <Select
                labelname={"Month"}
                labelClass={""}
                options={monthDataObj}
                onChange={(e) => handleFilter(e, "month")}
              /> */}
              <div className="form-group new_employee_form_group mt-2">
                <label className="modal_label">Month</label>
                <div className="mt-2">
                  <CustomSelectComp
                    optionsData={monthDataObj}
                    changeHandler={(e) => handleFilter(e, "month")}
                    value={selected_month}
                  />
                </div>
              </div>
            </div>
            <div className="employee_wrapper">
              {/* <Select
                labelname={"Year"}
                labelClass={""}
                options={yearObj}
                onChange={(e) => handleFilter(e, "year")}
              /> */}
              <div className="form-group new_employee_form_group mt-2">
                <label className="modal_label">Year</label>
                <div className="mt-2">
                  <CustomSelectComp
                    optionsData={yearObj}
                    changeHandler={(e) => handleFilter(e, "year")}
                    value={selected_year}
                  />
                </div>
              </div>
            </div>

            <div className="employee_wrapper text-end serach_add_outer">
              <button
                className="cmn_Button_style"
                onClick={() =>
                  dispatch(
                    get_leave_bank_report({
                      session,
                      month: selected_month,
                      year: selected_year,
                    })
                  )
                }
              >
                Search
              </button>
            </div>
          </div>

          <div className="table-responsive mt-3 transparent_bg">
            <table className="employee_detail_table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee </th>
                  <th>Taken Leaves</th>
                  <th>Paid Leaves</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(leave_bank_data?.data?.data) &&
                  leave_bank_data.data.data.map((leave_bank, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{leave_bank?.name}</td>
                        <td>{leave_bank?.taken_leave}</td>
                        <td>{leave_bank?.paid_leave}</td>

                        <td>
                          <div
                            className="cmn_action_outer yellow_bg cusror_pointer"
                            onClick={() => {
                              setShowEditLeaveModal(true);
                            }}
                          >
                            <FiEdit />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <PaginationComp />

        {showEditLeaveModal && (
          <EditLeaveBankModal
            show={showEditLeaveModal}
            setShow={setShowEditLeaveModal}
          />
        )}
      </div>
    </section>
  );
};

export default LeaveBank;
