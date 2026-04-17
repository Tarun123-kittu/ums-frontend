import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const update_bank_leave = createAsyncThunk("update_bank_leave", async ({ employeeId, taken_leaves, paid_leaves, session }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/update_user_leave_bank?employeeId=${employeeId}&taken_leaves=${taken_leaves}&paid_leaves=${paid_leaves}&session=${session}`, requestOptions)
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

export const updateBankLeave = createSlice({
    name: "updateBankLeave",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_bank_leave_state: (state) => {
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
            .addCase(update_bank_leave.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_bank_leave.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(update_bank_leave.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_bank_leave_state } = updateBankLeave.actions
export default updateBankLeave.reducer