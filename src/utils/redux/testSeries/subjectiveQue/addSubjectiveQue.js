import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const add_subjective_que = createAsyncThunk("add_subjective_que", async ({ test_series_id, language_id, question, answer }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "test_series_id": test_series_id,
            "language_id": language_id,
            "question": question,
            "answer": answer
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/add_subjective`, requestOptions)
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

export const addSubjectiveQue = createSlice({
    name: "addSubjectiveQue",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_add_sub_ques_state: (state) => {
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
            .addCase(add_subjective_que.pending, (state) => {
                state.isLoading = true
            })
            .addCase(add_subjective_que.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(add_subjective_que.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_add_sub_ques_state } = addSubjectiveQue.actions
export default addSubjectiveQue.reducer