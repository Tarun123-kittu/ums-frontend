import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_all_languages = createAsyncThunk("get_all_languages", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_all_languages`, requestOptions)
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

export const getAllLanguage = createSlice({
    name: "getAllLanguage",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_languages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_all_languages.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_all_languages.rejected, (state, action) => {
                state.isError = true
                state.error = action.payload
                state.isLoading = false
            })
    }
})

export default getAllLanguage.reducer