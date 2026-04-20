import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_employee_current_year_leaves = createAsyncThunk("get_employee_current_year_leaves", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-employee-leaves-record`, requestOptions)
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

export const getEmployeeCurrentYearLeaves = createSlice({
    name: "getEmployeeCurrentYearLeaves",
    initialState: {
        data: [],
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_employee_current_year_leaves.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_employee_current_year_leaves.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_employee_current_year_leaves.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})

export default getEmployeeCurrentYearLeaves.reducer