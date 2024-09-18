import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const get_all_users_user = createAsyncThunk("get_all_users_user", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6W251bGxdLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjY0NzUzOTR9.q2fTeDNt5st98Umo4oGwbf8PSG6ypV6JsEwMT5mbYWs");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_employees`, requestOptions)
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

export const getAllUsers = createSlice({
    name: "getAllUsers",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_users_user.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_all_users_user.fulfilled, (state, action) => {
                state.isSuccess = true
                state.data = action.payload
                state.isLoading = false
            })
            .addCase(get_all_users_user.rejected, (state, action) => {
                state.isError = true
                state.error = action.payload
                state.isLoading = false
            })
    }
})

export default getAllUsers.reducer