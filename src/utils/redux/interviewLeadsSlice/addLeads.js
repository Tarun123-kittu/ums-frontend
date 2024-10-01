import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const add_interview_leads = createAsyncThunk("add_interview_leads", async ({ name, mobile, email, gender, dob, profile, state, address, experience, current_salary, expected_salary, last_company }, thunkAPI) => {
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
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/create_lead`, requestOptions)
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

export const addInterviewLeads = createSlice({
    name: "addInterviewLeads",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: false
    },
    reducers: {
        clear_interview_leads_state: (state) => {
            state.message = {}
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_interview_leads.pending, (state) => {
                state.isLoading = true
            })
            .addCase(add_interview_leads.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(add_interview_leads.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_interview_leads_state } = addInterviewLeads.actions
export default addInterviewLeads.reducer