import React from "react"

const EmployeeOnLeave = () => {
    return (
        <>
            <div className="bg-white p-4 rounded my-4 " style={{border: '1px solid #0000000F' }}>
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
                        <tr className="bg-white">
                            <td className="px-3 py-3">
                                Pritpal Singh
                            </td>
                            <td className="px-3 py-3">
                                Product Manager
                            </td>
                            <td className="px-3 py-3">
                                02
                            </td>
                            <td className="px-3 py-3">
                                12, Oct to 14, Oct
                            </td>
                        </tr>
                        <tr className="bg-white">
                        <td className="px-3 py-3">
                                Pritpal Singh
                            </td>
                            <td className="px-3 py-3">
                                Product Manager
                            </td>
                            <td className="px-3 py-3">
                                02
                            </td>
                            <td className="px-3 py-3">
                                12, Oct to 14, Oct
                            </td>
                        </tr>
                        <tr className="bg-white">
                        <td className="px-3 py-3">
                                Pritpal Singh
                            </td>
                            <td className="px-3 py-3">
                                Product Manager
                            </td>
                            <td className="px-3 py-3">
                                02
                            </td>
                            <td className="px-3 py-3">
                                12, Oct to 14, Oct
                            </td>
                        </tr>
                        <tr className="bg-white">
                        <td className="px-3 py-3">
                                Pritpal Singh
                            </td>
                            <td className="px-3 py-3">
                                Product Manager
                            </td>
                            <td className="px-3 py-3">
                                02
                            </td>
                            <td className="px-3 py-3">
                                12, Oct to 14, Oct
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default EmployeeOnLeave