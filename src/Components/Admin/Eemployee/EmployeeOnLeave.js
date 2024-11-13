import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { get_dashboard_accepted_leaves } from "../../../utils/redux/dashboardSlice/getAllEmployeeAcceptedLeaves"


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
            <div className="bg-white p-4 rounded my-4 " style={{ border: '1px solid #0000000F' }}>
                <h4 className="px-3 font-semibold ">
                    On Leave Roster for This Week
                </h4>
                <table className="table table-sm table-borderless">
                    <thead style={{ color: '#848CA9' }}>
                        <tr>
                            <th scope="col" className="px-3 py-2 rounded-start">
                                Name
                            </th>
                            <th scope="col" className="px-3 py-2">
                                Profile
                            </th>
                            <th scope="col" className="px-3 py-2">
                                Days
                            </th>
                            <th scope="col" className="px-3 py-2 rounded-end">
                                Duration
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leave_data?.data?.data?.map((leave, i) => {
                            return (
                                <tr className="bg-white">
                                    <td className="px-3 py-3">
                                        {leave?.name}
                                    </td>
                                    <td className="px-3 py-3">
                                        {positionData
                                            ?.filter((post) => post.value === leave?.department)
                                            ?.map((filteredPost, index) => (
                                                <span key={index}>{filteredPost.label}</span>
                                            ))}
                                    </td>
                                    <td className="px-3 py-3">
                                        {leave?.count}
                                    </td>
                                    <td className="px-3 py-3">
                                        {leave?.duration ? formatDateRange(leave?.duration) : "Loading..."}
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default EmployeeOnLeave