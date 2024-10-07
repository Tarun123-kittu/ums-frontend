import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const update_technical_round_status = createAsyncThunk("update_technical_round_status", async ({ interview_id, status }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/update_status?interview_id=${interview_id}&status=${status}`, requestOptions)
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

export const updateTechStatus = createSlice({
    name: "updateTechStatus",
    initialState: {
        message: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    reducers: {
        clear_tech_round_status_state: (state) => {
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
            .addCase(update_technical_round_status.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_technical_round_status.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(update_technical_round_status.rejected, (state, action) => {
                state.error = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
    }
})
export const { clear_tech_round_status_state } = updateTechStatus.actions
export default updateTechStatus.reducer