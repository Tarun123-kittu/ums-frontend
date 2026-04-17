import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const user_pending_leaves = createAsyncThunk("user_pending_leaves", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_user_pending_leaves`, requestOptions)
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

export const userPendingLeaves = createSlice({
    name: "userPendingLeaves",
    initialState: {
        leaves: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(user_pending_leaves.pending, (state) => {
                state.isLoading = true
            })
            .addCase(user_pending_leaves.fulfilled, (state, action) => {
                state.leaves = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(user_pending_leaves.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default userPendingLeaves.reducer