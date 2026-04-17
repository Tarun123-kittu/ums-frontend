import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submit_result = createAsyncThunk("submit_result", async ({ lead_id, responses }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const filteredResponses = responses.map(response => ({
            questionid: response.question_id * 1,
            answer: response.answer
        }));

        const raw = JSON.stringify({
            lead_id: lead_id,
            responses: filteredResponses
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/submit_technical_round`, requestOptions);
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
});

export const submitTest = createSlice({
    name: "submitTest",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_submit_test_state: (state) => {
            state.message = {};
            state.isSuccess = false;
            state.isError = false;
            state.isLoading = false;
            state.error = null;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submit_result.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(submit_result.fulfilled, (state, action) => {
                state.message = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(submit_result.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
            });
    }
});

export const { clear_submit_test_state } = submitTest.actions;
export default submitTest.reducer;
