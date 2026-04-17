import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submit_developer_review = createAsyncThunk("submit_developer_review", async ({ interview_id, technical_round_result, developer_review }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "interview_id": interview_id,
            "technical_round_result": technical_round_result,
            "developer_review": developer_review
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/technical_round_result`, requestOptions)
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

export const submitDeveloperReview = createSlice({
    name: "submitDeveloperReview",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_developer_review_state: (state) => {
            state.message = {}
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submit_developer_review.pending, (state) => {
                state.isLoading = true
            })
            .addCase(submit_developer_review.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(submit_developer_review.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_developer_review_state } = submitDeveloperReview.actions
export default submitDeveloperReview.reducer