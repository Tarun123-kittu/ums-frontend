import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_applied_leave_detail = createAsyncThunk("get_applied_leave_detail", async ({ leave_id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_applied_leave_detail?leave_id=${leave_id}`, requestOptions)
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

export const getAppliedLeaveDetail = createSlice({
    name: "getAppliedLeaveDetail",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_applied_leave_detail_slice: (state) => {
            state.data = []
            state.isSuccess = false
            state.isError = false
            state.isLoading = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_applied_leave_detail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_applied_leave_detail.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_applied_leave_detail.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_applied_leave_detail_slice } = getAppliedLeaveDetail.actions
export default getAppliedLeaveDetail.reducer