import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_all_tech_round_leads = createAsyncThunk("get_all_tech_round_leads", async ({ page, limit, profile, experience, result_status }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        // Create query parameters string based on available filters
        let queryParams = `page=${page}&limit=${limit}`;

        // Add filters to the query if they exist
        if (profile) queryParams += `&profile=${profile}`;
        if (experience) queryParams += `&experience=${experience}`;
        if (result_status) queryParams += `&result_status=${result_status}`;

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        // Fetch data with query parameters
        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/all_technical_round_leads?${queryParams}`, requestOptions);

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

export const getAllTechLeads = createSlice({
    name: "getAllTechLeads",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_tech_round_leads.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_all_tech_round_leads.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(get_all_tech_round_leads.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
            });
    }
});

export default getAllTechLeads.reducer;
