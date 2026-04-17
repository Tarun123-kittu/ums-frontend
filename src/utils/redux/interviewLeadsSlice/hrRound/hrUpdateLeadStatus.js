import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const hr_update_lead_status = createAsyncThunk("hr_update_lead_status", async ({ interview_id, hr_round_result }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "interview_id": interview_id,
            "hr_round_result": hr_round_result
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/hr_round_result`, requestOptions)
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

export const hrUpdateLeadStatus = createSlice({
    name: "hrUpdateLeadStatus",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_hr_lead_updated_status: (state) => {
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
            .addCase(hr_update_lead_status.pending, (state) => {
                state.isLoading = true
            })
            .addCase(hr_update_lead_status.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(hr_update_lead_status.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
                state.isError = true
            })
    }
})
export const { clear_hr_lead_updated_status } = hrUpdateLeadStatus.actions
export default hrUpdateLeadStatus.reducer