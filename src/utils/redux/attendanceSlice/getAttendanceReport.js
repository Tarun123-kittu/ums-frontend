import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_attendance_report = createAsyncThunk("get_attendance_report", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_attendances`, requestOptions)
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
})

export const getAttendanceReport = createSlice({
    name: "getAttendanceReport",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_attendance_report.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_attendance_report.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_attendance_report.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default getAttendanceReport.reducer