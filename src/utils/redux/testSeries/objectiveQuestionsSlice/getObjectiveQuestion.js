import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_objective_question = createAsyncThunk("get_objective_question", async ({ question_id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_objective_questions?question_id=${question_id}`, requestOptions)
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

export const getObjectiveQuestion = createSlice({
    name: "getObjectiveQuestion",
    initialState: {
        data: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_objective_questions_state: (state) => {
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
            .addCase(get_objective_question.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_objective_question.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_objective_question.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export const { clear_objective_questions_state } = getObjectiveQuestion.actions
export default getObjectiveQuestion.reducer