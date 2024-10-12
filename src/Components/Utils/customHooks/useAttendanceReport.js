import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_attendance_report } from "../../../utils/redux/attendanceSlice/getTodayAttendance";


const UseAttendanceReport = ({ page, limit = 10 }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_attendance_report({ page, limit }))
    }, [dispatch])

    return null
}

export default UseAttendanceReport