import { createSlice, createAsyncThunk, isAllOf } from "@reduxjs/toolkit";

export const check_lead_answers = createAsyncThunk("check_lead_answers", async ({ interview_id, lead_id, question_id, answer_status }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "interview_id": interview_id,
            "lead_id": lead_id,
            "question_id": question_id,
            "answer_status": answer_status
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/check_lead_answer`, requestOptions)
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

export const checkLeadAnswer = createSlice({
    name: "checkLeadAnswer",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_check_answers_state: (state) => {
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
            .addCase(check_lead_answers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(check_lead_answers.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(check_lead_answers.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_check_answers_state } = checkLeadAnswer.actions
export default checkLeadAnswer.reducer