import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_leave_bank_report = createAsyncThunk("get_leave_bank_report", async ({ session, month, year }, thunkAPI) => {
    console.log(session, month, year, "session, month, year")
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        // Construct query parameters based on provided filters
        const params = new URLSearchParams();
        if (session) params.append("session", session);
        if (month) params.append("month", month);
        if (year) params.append("year", year);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const url = `${process.env.REACT_APP_BACKEN_URL}/leave_bank_report?${params.toString()}`;
        console.log("Fetching URL:", url);  // Log the URL for debugging

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error("Error Response:", errorMessage); // Log the error response
            throw new Error(errorMessage.message);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Fetch Error:", error); // Log the error
        return thunkAPI.rejectWithValue({
            message: error.message,
        });
    }
})

export const getLeaveBankReport = createSlice({
    name: "getLeaveBankReport",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_leave_bank_report.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_leave_bank_report.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(get_leave_bank_report.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
            });
    }
})

export default getLeaveBankReport.reducer;
