import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const tech_round_submit_result = createAsyncThunk("tech_round_submit_result", async ({ interview_id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-tech-round-test-submit-status?interview_id=${interview_id}`, requestOptions)
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

export const techRoundSubmitResult = createSlice({
    name: "techRoundSubmitResult",
    initialState: {
        data: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    reducers: {
        clear_tech_round_submit_state: (state) => {
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
            .addCase(tech_round_submit_result.pending, (state) => {
                state.isLoading = true
            })
            .addCase(tech_round_submit_result.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(tech_round_submit_result.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_tech_round_submit_state } = techRoundSubmitResult.actions
export default techRoundSubmitResult.reducer