import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const add_holiday_and_event = createAsyncThunk("add_holiday_and_event", async ({ occasion_name, occasion_type, date }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "occasion_name": occasion_name,
            "occasion_type": occasion_type,
            "date": date
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/add_holidayOrEvent`, requestOptions)
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

export const addHolidayAndEvent = createSlice({
    name: "addHolidayAndEvent",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_holiday_and_events_state: (state) => {
            state.message = {}
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_holiday_and_event.pending, (state) => {
                state.isLoading = true
            })
            .addCase(add_holiday_and_event.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(add_holiday_and_event.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_holiday_and_events_state } = addHolidayAndEvent.actions
export default addHolidayAndEvent.reducer