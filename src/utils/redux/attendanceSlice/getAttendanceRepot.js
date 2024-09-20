import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_user_attendance_report = createAsyncThunk(
    "get_user_attendance_report",
    async ({ name, month, year }, thunkAPI) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            let queryParams = new URLSearchParams();
            if (name) queryParams.append('name', name);
            if (month) queryParams.append('month', month);
            if (year) queryParams.append('year', year);
            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
            const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_attendances_report${queryString}`, requestOptions);

            if (!response.ok) {
                const errorMessage = await response.json();
                if (errorMessage) {
                    throw new Error(errorMessage.message);
                }
            }

            const result = await response.json();
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: error.message,
            });
        }
    }
);

export const getUserAttendanceReport = createSlice({
    name: "getUserAttendanceReport",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_user_attendance_report.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_user_attendance_report.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(get_user_attendance_report.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
            });
    }
});

export default getUserAttendanceReport.reducer;
