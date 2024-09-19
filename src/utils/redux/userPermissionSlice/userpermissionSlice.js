import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_logged_in_user_permissions = createAsyncThunk("get_logged_in_user_permissions", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_roles_permissions`, requestOptions)
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

export const getLoggedInUserPermissions = createSlice({
    name: "getLoggedInUserPermissions",
    initialState: {
        data: [],
        user_permissions: [],
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_logged_in_user_permissions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_logged_in_user_permissions.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_logged_in_user_permissions.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { all_user_permissions } = getLoggedInUserPermissions.actions
export default getLoggedInUserPermissions.reducer