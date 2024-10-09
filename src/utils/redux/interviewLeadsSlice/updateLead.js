import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const update_lead = createAsyncThunk("update_lead", async ({ name, mobile, email, gender, dob, profile, state, address, experience, current_salary, expected_salary, last_company, id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "name": name,
            "phone_number": mobile,
            "email": email,
            "gender": gender,
            "dob": dob,
            "profile": profile,
            "state": state,
            "house_address": address,
            "experience": experience,
            "current_salary": current_salary,
            "expected_salary": expected_salary,
            "last_company": last_company
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/update_lead?leadId=${id}`, requestOptions)
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

export const updateLead = createSlice({
    name: "updateLead",
    initialState: {
        message: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    reducer: {
        clear_update_lead_state: (state) => {
            state.message = {}
            state.isSuccess = false
            state.isError = false
            state.isLoading = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(update_lead.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_lead.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(update_lead.rejected, (state, action) => {
                state.isError = true
                state.error = action.payload
                state.isLoading = false
            })
    }
})
export const { clear_update_lead_state } = updateLead.actions
export default updateLead.reducer