import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_selected_holiday_and_event_details = createAsyncThunk("get_selected_holiday_and_event_details", async ({ id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ums_token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/get_holiday_and_event?id=${id}`, requestOptions)
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

export const getSelectedHolidayAndEventDetails = createSlice({
    name: "getSelectedHolidayAndEventDetails",
    initialState: {
        data: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_get_selected_holiday_and_event_state: (state) => {
            state.data = {}
            state.isSuccess = false
            state.isError = false
            state.isLoading = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_selected_holiday_and_event_details.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_selected_holiday_and_event_details.fulfilled, (state, action) => {
                state.data = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(get_selected_holiday_and_event_details.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_get_selected_holiday_and_event_state } = getSelectedHolidayAndEventDetails.actions
export default getSelectedHolidayAndEventDetails.reducer
