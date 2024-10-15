import React, { useState, useEffect } from "react";
import Notification from "../Notification/Notification";
import Table from "react-bootstrap/Table";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { user_pending_leaves } from "../../../utils/redux/leaveSlice/getUserPendingLeaves";
import { useSelector, useDispatch } from "react-redux";
import {
  apply_leave_handler,
  clear_apply_leave_state,
} from "../../../utils/redux/leaveSlice/applyLeave";
import toast from "react-hot-toast";
import { user_applied_leaves } from "../../../utils/redux/leaveSlice/getUserAppliedLeaves";

const ApplyLeaves = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed (0-11), so add 1
  const currentYear = currentDate.getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [enable_search, setEnableSearch] = useState(false);
  const pending_leaves = useSelector((store) => store.USER_PENDING_LEAVES);
  const is_leave_applied = useSelector((store) => store.APPLY_LEAVE);
  const applied_leaves = useSelector((store) => store.USER_APPLIED_LEAVES);
  console.log(applied_leaves, "this is the user applied leaved");

  useEffect(() => {
    dispatch(user_pending_leaves());
    dispatch(user_applied_leaves({ month, year }));
  }, []);
  const handleChange = (value) => {
    if (value === null) {
      setStartDate("");
      setEndDate("");
    } else {
      setStartDate(value[0]);
      setEndDate(value[1]);
    }
  };

  const apply_leave = () => {
    if (!type) {
      toast.error("Please select the leave type");
    } else if (!startDate || !endDate) {
      toast.error("Please select start and end date");
    } else if (!description) {
      toast.error("Please provide leave reason");
    } else {
      dispatch(
        apply_leave_handler({
          from_date: startDate,
          to_date: endDate,
          description,
          type,
        })
      );
    }
  };

  useEffect(() => {
    if (is_leave_applied?.isSuccess) {
      dispatch(user_applied_leaves({ month, year }));
      dispatch(clear_apply_leave_state());
      setType("");
      setStartDate("");
      setEndDate("");
      setDescription("");
    }
  }, [is_leave_applied]);

  const generateYearOptions = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ label: year, value: year });
    }
    return years;
  };
  const years = generateYearOptions(2022, new Date().getFullYear());

  const yearDataObj = years;

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

  const handleSearch = () => {
    if (!enable_search) {
      toast.error("Please select month and year");
    } else {
      dispatch(user_applied_leaves({ month, year }));
    }
  };
  return (
    <section>
      <div className="min-vh-100">
        <Notification view={true} />
        <div className="container">
          <div className="admin_dashboard_outer mt-0">
            <div className="attendence_submit cmn_card">
              <h4>Apply for Leave</h4>
              <div className="report_header">
                <div className="flex-grow-1 form-group">
                  <label htmlFor="leaveType">Type </label>
                  <select
                    class="form-select"
                    name=""
                    id=""
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value={"SICK LEAVE"}>Sick Leave</option>
                    <option value={"URGENT LEAVE"}>Urgent Leave</option>
                    <option value={"HALF DAY"}>Half Day Leave</option>
                    <option value={"SHORT DAY"}>Short Leave</option>
                  </select>
                </div>
                <div className="flex-grow-1 form-group">
                  <label htmlFor="Date">Date</label>
                  <DateRangePicker onChange={handleChange} />
                </div>
                <div className="flex-grow-1 form-group">
                  <label htmlFor="Date">Pending Leaves</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={
                      pending_leaves?.leaves?.data?.total_allowed_leaves -
                      pending_leaves?.leaves?.data?.total_accepted_leaves
                    }
                  />
                </div>
              </div>
              <div className="flex-grow-1 form-group">
                <label htmlFor="Date">Pending Leaves</label>
                <textarea
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="text-center mt-4">
                <button className="cmn_bg_btn" onClick={() => apply_leave()}>
                  Apply
                </button>
              </div>
            </div>
            <div className="attendence_submit cmn_card mt-4">
              <div className="report_header">
                <div className="flex-grow-1 form-group">
                  <label htmlFor="leaveType">Month</label>
                  <select
                    class="form-select"
                    name=""
                    id=""
                    onChange={(e) => {
                      setMonth(e.target.value);
                      setEnableSearch(true);
                    }}
                  >
                    <option>Select</option>
                    {monthDataObj?.map((month, i) => {
                      return (
                        <option key={i} value={month?.value}>
                          {month?.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex-grow-1 form-group">
                  <label htmlFor="leaveType">Type </label>
                  <select
                    class="form-select"
                    name=""
                    id=""
                    onChange={(e) => {
                      setYear(e.target.value);
                      setEnableSearch(true);
                    }}
                  >
                    <option>Select</option>
                    {yearDataObj?.map((year, i) => {
                      return (
                        <option key={i} value={year?.value}>
                          {year?.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <button className="cmn_bg_btn" onClick={() => handleSearch()}>
                Apply
              </button>
            </div>
            <div className="attendence_submit cmn_card mt-3">
              <h4>Leave Report</h4>
              {applied_leaves?.data?.message === "No leaves found" ? (
                <h4 className="text-center">{applied_leaves?.data?.message}</h4>
              ) : (
                <Table
                  responsive
                  bordered
                  hover
                  className="mb-0 leave_table table report_table"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Apply On</th>
                      <th>from</th>
                      <th>To</th>
                      <th>Total</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Remark</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applied_leaves?.data?.data?.map((leave, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>

                          <td>{leave?.type}</td>
                          <td>
                            {new Date(leave?.createdAt).toLocaleDateString(
                              "en-CA"
                            )}
                          </td>
                          <td>{leave?.from_date}</td>
                          <td>{leave?.to_date}</td>
                          <td>{leave?.count}</td>
                          <td>{leave?.description}</td>
                          <td>{leave?.status}</td>
                          <td>{leave?.remark}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyLeaves;
