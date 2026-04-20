import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_user_monthly_leave_report = createAsyncThunk("get_user_monthly_leave_report", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get_employee_montly_leave_report`, requestOptions)
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

export const getUserMonthlyLeaveReportAPI = createSlice({
    name: "getUserMonthlyLeaveReportAPI",
    initialState: {
        data: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_user_monthly_leave_report.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_user_monthly_leave_report.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(get_user_monthly_leave_report.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export default getUserMonthlyLeaveReportAPI.reducer