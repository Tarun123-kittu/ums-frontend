import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";

export const create_new_user = createAsyncThunk("create_new_user", async ({ field_data }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "username": field_data?.username,
            "email": field_data?.email,
            "name": field_data?.name,
            "mobile": field_data?.mobile,
            "emergency_contact": field_data?.emergency_contact,
            "emergency_contact_relationship": field_data?.emergency_contact_relationship,
            "emergency_contact_name": field_data?.emergency_contact_name,
            "bank_name": field_data?.bank_name,
            "account_number": field_data?.account_number,
            "ifsc": field_data?.ifsc,
            "increment_date": moment(field_data?.increment_date).format('YYYY-MM-DD'),
            "gender": field_data?.gender,
            "dob": moment(field_data.dob).format('YYYY-MM-DD'),
            "doj": moment(field_data.doj).format('YYYY-MM-DD'),
            "skype_email": field_data?.skype_email,
            "ultivic_email": field_data?.ultivic_email,
            "salary": field_data?.salary * 1,
            "security": field_data?.security * 1,
            "total_security": field_data?.total_security * 1,
            "installments": field_data?.installments * 1,
            "position": field_data?.position,
            "department": field_data?.department,
            "status": field_data?.status,
            "address": field_data?.address,
            "role": field_data?.role,
            "confirm_password": field_data?.confirm_password,
            "password": field_data?.password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/create_user`, requestOptions)
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

export const createNewUser = createSlice({
    name: "createNewUser",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_create_user_state: (state) => {
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
            .addCase(create_new_user?.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_new_user?.fulfilled, (state, action) => {
                state.message = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(create_new_user?.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_create_user_state } = createNewUser.actions
export default createNewUser.reducer