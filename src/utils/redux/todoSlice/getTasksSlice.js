import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_all_todo_tasks = createAsyncThunk("get_all_todo_tasks", async ({ task_status }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-tasks?task_status=${task_status}`, requestOptions)
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

export const getAllTodoTasksAPI = createSlice({
    name: "getAllTodoTasksAPI",
    initialState: {
        isSuccess: false,
        isLoading: false,
        isError: false,
        data: [],
        error: null
    },
    reducers: {
        clear_all_todo_tasks_state: (state) => {
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.data = []
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_todo_tasks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_all_todo_tasks.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(get_all_todo_tasks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export const { clear_all_todo_tasks_state } = getAllTodoTasksAPI.actions
export default getAllTodoTasksAPI.reducer
