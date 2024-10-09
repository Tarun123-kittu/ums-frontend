import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_lead_answer = createAsyncThunk("get_lead_answer", async ({ leadId }, thunkAPI) => {
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_lead_technical_response?leadId=${leadId}`, requestOptions)
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

export const getLeadAnswer = createSlice({
    name: "getLeadAnswer",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_lead_answer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_lead_answer.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_lead_answer.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default getLeadAnswer.reducer