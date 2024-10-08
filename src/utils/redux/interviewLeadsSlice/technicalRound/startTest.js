import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const start_test = createAsyncThunk("start_test", async ({ lead_id }, thunkAPI) => {
    try {
        const requestOptions = {
            method: "PUT",
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/start_test?lead_id=${lead_id}`, requestOptions)
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

export const startTest = createSlice({
    name: "startTest",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_start_test_state: (state) => {
            state.message = {}
            state.isSuccess = false
            state.isError = false
            state.isLoading = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(start_test.pending, (state) => {
                state.isLoading = true
            })
            .addCase(start_test.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(start_test.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_start_test_state } = startTest.actions
export default startTest.reducer