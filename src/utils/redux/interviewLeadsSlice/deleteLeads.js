import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const delete_lead = createAsyncThunk("delete_lead", async ({ leadId }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/delete_lead_records?leadId=${leadId}`, requestOptions)
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

export const deleteLead = createSlice({
    name: "deleteLead",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: false
    },
    reducers: {
        clear_delete_lead_slice: (state) => {
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
            .addCase(delete_lead.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delete_lead.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(delete_lead.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_delete_lead_slice } = deleteLead.actions
export default deleteLead.reducer