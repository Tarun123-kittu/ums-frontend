import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_all_series = createAsyncThunk("get_all_series", async ({ id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const url = id
            ? `${process.env.REACT_APP_BACKEN_URL}/get_all_series?languageId=${id}`
            : `${process.env.REACT_APP_BACKEN_URL}/get_all_series`;

        const response = await fetch(url, requestOptions);

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
});

export const getAllSeries = createSlice({
    name: "getAllSeries",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_series_state: (state) => {
            state.daya = []
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_series.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(get_all_series.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(get_all_series.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            });
    }
});
export const { clear_series_state } = getAllSeries.actions
export default getAllSeries.reducer;
