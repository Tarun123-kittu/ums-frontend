import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const update_attendance = createAsyncThunk("update_attendance", async ({ id, in_time, out_time, remark, report }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "rating": 5,
            "report": report,
            "in_time": in_time,
            "out_time": out_time,
            "remark": remark
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/update_attendance_details?attendanceId=${id}`, requestOptions)
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

export const updateAttendance = createSlice({
    name: "updateAttendance",
    initialState: {
        message: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    reducers: {
        clear_update_attendance_state: (state) => {
            state.message = {}
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(update_attendance.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_attendance.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(update_attendance.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_update_attendance_state } = updateAttendance.actions
export default updateAttendance.reducer