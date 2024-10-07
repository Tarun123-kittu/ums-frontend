import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const update_key_point = createAsyncThunk("update_key_point", async ({ question_id, lead_id, interview_id, key_point }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "question_id": question_id,
            "lead_id": lead_id,
            "interview_id": interview_id,
            "key_point": key_point
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/update_key_point`, requestOptions)
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

export const updateKeypoint = createSlice({
    name: "updateKeypoint",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_update_key_point_state: (state) => {
            state.message = {}
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(update_key_point.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_key_point.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(update_key_point.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_update_key_point_state } = updateKeypoint.actions
export default updateKeypoint.reducer