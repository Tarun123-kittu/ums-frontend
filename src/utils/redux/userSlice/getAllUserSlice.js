import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const get_all_users_user = createAsyncThunk(
    "get_all_users_user",
    async ({ name, status, page }, thunkAPI) => {
        try {
            page = page * 1
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            // Start with the base URL
            let url = `${process.env.REACT_APP_BACKEN_URL}/get_employees?page=${page}`;

            // Collect query parameters if name and/or status exist
            const queryParams = [];
            if (name) {
                queryParams.push(`name=${encodeURIComponent(name)}`);
            }
            if (status) {
                queryParams.push(`status=${encodeURIComponent(status)}`);
            }

            if (queryParams.length > 0) {
                url += `&${queryParams.join('&')}`;
            }
            console.log("Fetching data from URL:", url);

            const response = await fetch(url, requestOptions);

            // Check if the response is ok
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || "Failed to fetch users");
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            return thunkAPI.rejectWithValue({
                message: error.message,
            });
        }
    }
);

export const getAllUsers = createSlice({
    name: "getAllUsers",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_users_user.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_all_users_user.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(get_all_users_user.rejected, (state, action) => {
                state.isError = true;
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export default getAllUsers.reducer;
