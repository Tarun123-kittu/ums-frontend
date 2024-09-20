import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_attendance_report } from "../../../utils/redux/attendanceSlice/getAttendanceReport";


const UseAttendanceReport = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_attendance_report())
    }, [dispatch])

    return null
}

export default UseAttendanceReport