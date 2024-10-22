import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_all_user_leave = createAsyncThunk(
    "get_all_user_leave",
    async ({ name, month, year, page }, thunkAPI) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ums_token"));

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            let url = `${process.env.REACT_APP_BACKEN_URL}/all_user_applied_leaves?`;
            const params = new URLSearchParams();

            if (name) params.append("name", name);
            if (month) params.append("month", month);
            if (year) params.append("year", year);
            if (page) params.append("page", page)

            if (params.toString()) {
                url += params.toString();
            }

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

export const getAllUserLeave = createSlice({
    name: "getAllUserLeave",
    initialState: {
        data: [],
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_user_leave.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_all_user_leave.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(get_all_user_leave.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
            });
    },
});

export default getAllUserLeave.reducer;
