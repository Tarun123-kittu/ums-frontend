import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_permissions = createAsyncThunk("get_permissions", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-permissions`, requestOptions)
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

export const getPermissions = createSlice({
    name: "getPermissions",
    initialState: {
        data: [],
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_permissions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_permissions.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_permissions.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default getPermissions.reducer