import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_selected_language_series = createAsyncThunk("get_selected_language_series", async ({ language }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-language-test-series?language=${language}`, requestOptions)
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

export const getSelectedLanguageSeries = createSlice({
    name: "getSelectedLanguageSeries",
    initialState: {
        data: [],
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    reducer: {
        clear_language_series_state: (state) => {
            state.data = []
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_selected_language_series.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_selected_language_series.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_selected_language_series.rejected, (state, action) => {
                state.isError = true
                state.error = action.payload
                state.isLoading = false
            })
    }
})
export const {clear_language_series_state} = getSelectedLanguageSeries.actions
export default getSelectedLanguageSeries.reducer