import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const create_obj_question = createAsyncThunk("create_obj_question", async ({ test_series_id, language_id, question, options, correct_option_number }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "test_series_id": test_series_id,
            "language_id": language_id,
            "question": question,
            "options": options,
            "correct_option_number": correct_option_number
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/add_objective`, requestOptions)
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

export const createObjQuestion = createSlice({
    name: "createObjQuestion",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_add_obj_question_state: (state) => {
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
            .addCase(create_obj_question.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_obj_question.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(create_obj_question.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_add_obj_question_state } = createObjQuestion.actions
export default createObjQuestion.reducer