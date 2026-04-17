import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_test_questions = createAsyncThunk("get_test_questions", async ({ lead_id }, thunkAPI) => {
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_lead_questions?lead_id=${lead_id}`, requestOptions)
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

export const getTestQuestions = createSlice({
    name: "getTestQuestions",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_get_test_question_state: (state) => {
            state.data = []
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_test_questions.pending, (state) => {
                state.isLoading = false
            })
            .addCase(get_test_questions.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_test_questions.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_get_test_question_state } = getTestQuestions.actions
export default getTestQuestions.reducer