import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to build the query string based on filters
const buildQueryParams = (month, year) => {
    let params = new URLSearchParams();
    if (month) params.append("month", month);
    if (year) params.append("year", year);
    return params.toString();
};

export const get_user_monthly_attendence = createAsyncThunk(
    "get_user_monthly_attendence",
    async ({ month, year }, thunkAPI) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            // Build the query parameters based on filters
            const queryParams = buildQueryParams(month, year);
            const url = `${process.env.REACT_APP_BACKEN_URL}/get_user_monthly_report` + (queryParams ? `?${queryParams}` : '');

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
    }
);

export const getUserMonthlyAttendence = createSlice({
    name: "getUserMonthlyAttendence",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_user_monthly_attendence.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_user_monthly_attendence.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(get_user_monthly_attendence.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
            });
    }
});

export default getUserMonthlyAttendence.reducer;
