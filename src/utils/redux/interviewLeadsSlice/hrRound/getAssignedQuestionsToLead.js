import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const hr_assigned_questions_to_lead = createAsyncThunk("hr_assigned_questions_to_lead", async ({ interview_id, lead_id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_hr_round_assign_questions_to_lead?interview_id=${interview_id}&lead_id=${lead_id}`, requestOptions)
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

export const hrAssinedQuestionsToLead = createSlice({
    name: "hrAssinedQuestionsToLead",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(hr_assigned_questions_to_lead.pending, (state) => {
                state.isLoading = true
            })
            .addCase(hr_assigned_questions_to_lead.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(hr_assigned_questions_to_lead.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default hrAssinedQuestionsToLead.reducer