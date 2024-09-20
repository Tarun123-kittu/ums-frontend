import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_user_attendance_report } from "../../../utils/redux/attendanceSlice/getAttendanceRepot";

const UseUserAttendanceReport = ({ name, month, year }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_user_attendance_report({ name, month, year }))
    }, [dispatch])

    return null
}

export default UseUserAttendanceReport