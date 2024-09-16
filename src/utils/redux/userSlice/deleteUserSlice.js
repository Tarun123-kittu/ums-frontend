import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const delete_user = createAsyncThunk("delete_user", async ({ id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6W251bGxdLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjY0NzUzOTR9.q2fTeDNt5st98Umo4oGwbf8PSG6ypV6JsEwMT5mbYWs");

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/delete_employee/${id}`, requestOptions)
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

export const deleteUser = createSlice({
    name: "deleteUser",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_create_delete_state: (state) => {
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
            .addCase(delete_user?.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delete_user?.fulfilled, (state, action) => {
                state.message = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(delete_user?.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_create_delete_state } = deleteUser.actions
export default deleteUser.reducer