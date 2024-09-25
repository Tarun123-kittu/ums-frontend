import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const update_holiday_and_event = createAsyncThunk("update_holiday_and_event", async ({ occasion_name, occasion_type, occasion_description, date, id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "occasion_name": occasion_name,
            "occasion_type": occasion_type,
            "occasion_description": occasion_description,
            "date": date
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/update_holidayOrEvent?holidayOrEventId=${id}`, requestOptions)
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

export const updateSelectedEvents = createSlice({
    name: "updateSelectedEvent",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: false
    },
    reducers: {
        clear_updated_holiday_and_event_state: (state) => {
            state.message = {}
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(update_holiday_and_event.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_holiday_and_event.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(update_holiday_and_event.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_updated_holiday_and_event_state } = updateSelectedEvents.actions
export default updateSelectedEvents.reducer