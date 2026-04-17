import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import './employeeDashboard.css'
import { get_dashboard_accepted_leaves } from "../../../utils/redux/dashboardSlice/getAllEmployeeAcceptedLeaves"
import NoLeave from "../../assets/No-leaves-bg.png"


const EmployeeOnLeave = () => {
    const dispatch = useDispatch()
    const leave_data = useSelector((store) => store.ALL_EMPLOYEES_ACCEPTED_LEAVES)
    console.log(leave_data, "this is the leave data")
    useEffect(() => {
        dispatch(get_dashboard_accepted_leaves())
    }, [])

    function formatDateRange(dateRange) {
        const [startDate, endDate] = dateRange.split(" to ").map(date => new Date(date));

        const options = { day: 'numeric', month: 'short' };

        const formattedStartDate = startDate.toLocaleDateString('en-GB', options);
        const formattedEndDate = endDate.toLocaleDateString('en-GB', options);

        return `${formattedStartDate} to ${formattedEndDate}`;
    }

    const positionData = [
        { value: "INTERN", label: "Intern" },
        { value: "TRAINEE", label: "Trainee" },
        { value: "JRDEVELOPER", label: "Jr Developer" },
        { value: "SRDEVELOPER", label: "Sr Developer" },
        { value: "PROJECTMANAGER", label: "Project Manager" },
        { value: "HR", label: "HR" },
        { value: "TESTER", label: "Tester" },
        { value: "BDE", label: "BDE" },
        { value: "TEAMLEAD", label: "Team Lead" },
    ];
    return (
        <>
            <section className="dashboard-sections">
                <h3 className="heading-h3" >
                    On Leave Roster for This Week
                </h3>
                <table className="table table-sm table-borderless">
                    <thead style={{ color: '#848CA9' }}>
                        <tr>
                            <th scope="col" className=" col-3 py-2 rounded-start">
                                <p className="m-0 " style={{ fontSize: '16px', fontWeight: 600, }}> Name</p>
                            </th>
                            <th scope="col" className=" col-3 py-2">
                                <p className="m-0 " style={{ fontSize: '16px', fontWeight: 600, }}> Profile</p>

                            </th>
                            <th scope="col" className="col-3 py-2">
                                <p className="m-0 " style={{ fontSize: '16px', fontWeight: 600, }}> Days</p>

                            </th>
                            <th scope="col" className="col-3 py-2 rounded-end">
                                <p className="m-0 " style={{ fontSize: '16px', fontWeight: 600, }}>   Duration</p>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(leave_data?.data) && leave_data?.data?.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-3">
                                    <img className="m-auto" src={NoLeave} alt="no leave" />
                                </td>
                            </tr>
                        ) : (
                            Array.isArray(leave_data?.data?.data) &&
                            leave_data?.data?.data?.map((leave, i) => (
                                <tr className="bg-white" key={i}>
                                    <td className="py-3">{leave?.name}</td>
                                    <td className="py-3">
                                        {positionData
                                            ?.filter((post) => post.value === leave?.department)
                                            ?.map((filteredPost, index) => (
                                                <span key={index}>{filteredPost.label}</span>
                                            ))}
                                    </td>
                                    <td className="py-3">{leave?.count}</td>
                                    <td className="py-3">
                                        {leave?.duration ? formatDateRange(leave?.duration) : "Loading..."}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </section>

        </>
    )
}

export default EmployeeOnLeave