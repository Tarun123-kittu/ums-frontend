import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const apply_leave_handler = createAsyncThunk("apply_leave_handler", async ({ from_date, to_date, description, type }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "••••••");

        const raw = JSON.stringify({
            "from_date": from_date,
            "to_date": to_date,
            "description": description,
            "type": type
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/apply_leave`, requestOptions)
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

export const applyLeaveHandler = createSlice({
    name: "applyLeaveHandler",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(apply_leave_handler.pending, (state) => {
                state.isLoading = true
            })
            .addCase(apply_leave_handler.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(apply_leave_handler.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default applyLeaveHandler.reducer