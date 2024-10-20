import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_leaves_on_dashboard = createAsyncThunk("get_leaves_on_dashboard", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_dashboard_leaves`, requestOptions)
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

export const getLeavesOnDashboard = createSlice({
    name: "getLeavesOnDashboard",
    initialState: {
        data: [],
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_leaves_on_dashboard.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_leaves_on_dashboard.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_leaves_on_dashboard.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default getLeavesOnDashboard.reducer