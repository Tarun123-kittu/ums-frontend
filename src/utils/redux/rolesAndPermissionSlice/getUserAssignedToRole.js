import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_users_assigned_to_role = createAsyncThunk("get_users_assigned_to_role", async ({ role_id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_role_assigned_to_users?role_id=${role_id}`, requestOptions)
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

export const getUsersAssignedToRoles = createSlice({
    name: "getUsersAssignedToRoles",
    initialState: {
        data: [],
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_users_assigned_to_role.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_users_assigned_to_role.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_users_assigned_to_role.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default getUsersAssignedToRoles.reducer