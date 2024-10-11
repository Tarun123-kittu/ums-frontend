import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const unmark_attendance = createAsyncThunk("unmark_attendance", async ({ report, logout_device, logout_mobile }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "report": report,
            "logout_device": logout_device,
            "logout_mobile": logout_mobile
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/unmark_attendance`, requestOptions)
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

export const unmarkAttendance = createSlice({
    name: "unmarkAttendance",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_unmark_attendance_slice: (state) => {
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
            .addCase(unmark_attendance.pending, (state) => {
                state.isLoading = true
            })
            .addCase(unmark_attendance.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(unmark_attendance.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export const { clear_unmark_attendance_slice } = unmarkAttendance.actions
export default unmarkAttendance.reducer