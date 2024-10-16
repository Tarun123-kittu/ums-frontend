import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";

export const update_user = createAsyncThunk("update_user", async ({ name, username, email, mobile, emergency_contact_relationship, emergency_contact_name,
    emergency_contact, bank_name, account_number, ifsc, increment_date, gender, dob, doj, skype_email,
    ultivic_email, salary, security, total_security, installments, position, department, status, documents,
    address, id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "id": id,
            "name": name,
            "username": username,
            "email": email,
            "mobile": mobile,
            "emergency_contact_relationship": emergency_contact_relationship,
            "emergency_contact_name": emergency_contact_name,
            "emergency_contact": emergency_contact,
            "bank_name": bank_name,
            "account_number": account_number,
            "ifsc": ifsc,
            "increment_date": moment(increment_date).format('YYYY-MM-DD'),
            "gender": gender,
            "dob": moment(dob).format('YYYY-MM-DD'),
            "doj": moment(doj).format('YYYY-MM-DD'),
            "skype_email": skype_email,
            "ultivic_email": ultivic_email,
            "salary": salary,
            "security": security,
            "total_security": total_security,
            "installments": installments,
            "position": position,
            "department": department,
            "status": status,
            "address": address,
            "documents": documents
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/update_user`, requestOptions)
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

export const updateUser = createSlice({
    name: "updateUser",
    initialState: {
        message: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    reducers: {
        clear_update_user_state: (state) => {
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
            .addCase(update_user.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_user.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(update_user.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_update_user_state } = updateUser.actions
export default updateUser.reducer