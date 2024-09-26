import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_selected_attendance_details = createAsyncThunk("get_selected_attendance_details", async ({ id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_attendance_details?attendanceId=${id}`, requestOptions)
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

export const getSelectedAttendanceDetail = createSlice({
    name: "getSelectedAttendanceDetail",
    initialState: {
        data: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    reducers: {
        clear_selected_attendance_slice: (state) => {
            state.data = {}
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_selected_attendance_details.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_selected_attendance_details.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_selected_attendance_details.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_selected_attendance_slice } = getSelectedAttendanceDetail.actions
export default getSelectedAttendanceDetail.reducer