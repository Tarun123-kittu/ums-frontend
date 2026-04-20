import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const add_todo_task = createAsyncThunk("add_todo_task", async ({ task_name }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "task_name": task_name
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create_task`, requestOptions)
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

export const AddTodoTaskAPI = createSlice({
    name: "AddTodoTaskAPI",
    initialState: {
        isSuccess: false,
        isLoading: false,
        isError: false,
        message: {},
        error: null
    },
    reducers: {
        clear_add_todo_task_state: (state) => {
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.message = {}
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_todo_task.pending, (state) => {
                state.isLoading = true
            })
            .addCase(add_todo_task.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(add_todo_task.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_add_todo_task_state } = AddTodoTaskAPI.actions
export default AddTodoTaskAPI.reducer