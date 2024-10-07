import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const verify_lead = createAsyncThunk("verify_lead", async ({ lead_id }, thunkAPI) => {
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/verify_lead?lead_id=${lead_id}`, requestOptions)
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

export const verifyLead = createSlice({
    name: "verifyLead",
    initialState: {
        data: {},
        isSucess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(verify_lead.pending, (state) => {
                state.isLoading = true
            })
            .addCase(verify_lead.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSucess = true
                state.isLoading = false
            })
            .addCase(verify_lead.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default verifyLead.reducer