import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const total_present_employees = createAsyncThunk("total_present_employees", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_all_present_employee`, requestOptions)
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

export const totalPresentEmployees = createSlice({
    name: "totalPresentEmployees",
    initialState: {
        total_employee: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(total_present_employees.pending, (state) => {
                state.isLoading = true
            })
            .addCase(total_present_employees.fulfilled, (state, action) => {
                state.total_employee = action.payload
                state.isLoading = true
                state.isLoading = false
            })
            .addCase(total_present_employees.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default totalPresentEmployees.reducer