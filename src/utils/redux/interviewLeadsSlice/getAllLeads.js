import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_all_leads = createAsyncThunk(
    "get_all_leads",
    async ({ page, profile, experience }, thunkAPI) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            // Build the query string based on the available parameters
            const queryParams = new URLSearchParams({ page });
            if (profile) queryParams.append("profile", profile);
            if (experience) queryParams.append("experience", experience);

            // Use queryParams in the fetch URL
            const response = await fetch(
                `${process.env.REACT_APP_BACKEN_URL}/get_all_leads?${queryParams.toString()}`,
                requestOptions
            );

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

export const getAllLeads = createSlice({
    name: "getAllLeads",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_leads.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_all_leads.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(get_all_leads.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
            });
    }
});

export default getAllLeads.reducer;
