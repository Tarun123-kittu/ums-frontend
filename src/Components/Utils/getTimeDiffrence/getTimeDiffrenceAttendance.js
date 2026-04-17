const getTimeDifference = (markAttendanceTime) => {
    const currentTime = new Date();

    const [attendanceHours, attendanceMinutes, attendanceSeconds] =
        markAttendanceTime.split(":").map(Number);

    const attendanceTime = new Date();
    attendanceTime.setHours(attendanceHours);
    attendanceTime.setMinutes(attendanceMinutes);
    attendanceTime.setSeconds(attendanceSeconds);

    let timeDiff = currentTime - attendanceTime;

    if (timeDiff < 0) {
        return "Attendance time is in the future!";
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    timeDiff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(timeDiff / (1000 * 60));
    timeDiff -= minutes * (1000 * 60);

    const seconds = Math.floor(timeDiff / 1000);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export default getTimeDifference