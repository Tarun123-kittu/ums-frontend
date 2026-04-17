import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const shift_task = createAsyncThunk("shift_task", async ({ task_status, tasks_ids }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "task_status": task_status,
            "tasks_ids": tasks_ids
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/shift_task`, requestOptions)
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

export const shiftTaskAPI = createSlice({
    name: "shiftTaskAPI",
    initialState: {
        isSuccess: false,
        isLoading: false,
        isError: false,
        message: {},
        error: null
    },
    reducers: {
        clear_shift_task_state: (state) => {
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.message = {}
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(shift_task.pending, (state) => {
                state.isLoading = true
            })
            .addCase(shift_task.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(shift_task.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_shift_task_state } = shiftTaskAPI.actions
export default shiftTaskAPI.reducer