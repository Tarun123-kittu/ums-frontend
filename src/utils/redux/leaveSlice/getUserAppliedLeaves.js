import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const user_applied_leaves = createAsyncThunk(
    "user_applied_leaves",
    async ({ month, year }, thunkAPI) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/user_applied_leaves?month=${month}&year=${year}`, requestOptions)
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

export const userAppliedLeaves = createSlice({
    name: "userAppliedLeaves",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(user_applied_leaves.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(user_applied_leaves.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(user_applied_leaves.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
            });
    }
});

export default userAppliedLeaves.reducer;
