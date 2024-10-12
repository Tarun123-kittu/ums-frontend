import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_final_round_leads = createAsyncThunk("get_final_round_leads", async ({ page, limit, profile, experience, result_status }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        // Construct query parameters based on available filters
        let queryParams = `page=${page}&limit=${limit}`;

        // Add optional filters to query string if they are present
        if (profile) queryParams += `&profile=${profile}`;
        if (experience) queryParams += `&experience=${experience}`;
        if (result_status) queryParams += `&result_status=${result_status}`;

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        // Fetch with dynamically constructed query parameters
        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_final_round_leads?${queryParams}`, requestOptions);

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

export const getFinalRoundLeads = createSlice({
    name: "getFinalRoundLeads",
    initialState: {
        data: [],
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_final_round_leads.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_final_round_leads.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(get_final_round_leads.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
            });
    }
});

export default getFinalRoundLeads.reducer;
