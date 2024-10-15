import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_all_roles = createAsyncThunk("get_all_roles", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_all_roles`, requestOptions)
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

export const getAllRoles = createSlice({
    name: "getAllRoles",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_roles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_all_roles.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_all_roles.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default getAllRoles.reducer