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
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_verify_lead_status: (state) => {
            state.data = {}
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(verify_lead.pending, (state) => {
                state.isLoading = true
            })
            .addCase(verify_lead.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(verify_lead.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_verify_lead_status } = verifyLead.actions
export default verifyLead.reducer