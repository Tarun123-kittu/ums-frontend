import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";

export const create_new_user = createAsyncThunk("create_new_user", async ({
    name,
    email,
    mobile,
    emergency_contact_relationship,
    emergency_contact_name,
    emergency_contact,
    bank_name,
    account_number,
    ifsc,
    increment_date,
    gender,
    dob,
    doj,
    skype_email,
    ultivic_email,
    salary,
    security,
    total_security,
    installments,
    position,
    department,
    status,
    username,
    password,
    confirm_password,
    selected_role,
    address,
    selectedDocuments,
}, thunkAPI) => {
    try {
        console.log(name, email, mobile)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            username: username,
            email: email,
            name: name,
            mobile: mobile,
            emergency_contact: emergency_contact,
            emergency_contact_relationship: emergency_contact_relationship,
            emergency_contact_name: emergency_contact_name,
            bank_name: bank_name,
            account_number: account_number,
            ifsc: ifsc,
            increment_date: moment(increment_date).format('YYYY-MM-DD'),
            gender: gender,
            dob: moment(dob).format('YYYY-MM-DD'),
            doj: moment(doj).format('YYYY-MM-DD'),
            skype_email: skype_email,
            ultivic_email: ultivic_email,
            salary: salary * 1,
            security: security * 1,
            total_security: total_security * 1,
            installments: installments * 1,
            position: position,
            department: department,
            status: status,
            address: address,
            role: selected_role,
            confirm_password: confirm_password,
            password: password,
            documents: selectedDocuments // assuming selectedDocuments is meant to represent the documents
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/create_user`, requestOptions);
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
});

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
            state.message = {};
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.error = null;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(create_new_user.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(create_new_user.fulfilled, (state, action) => {
                state.message = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(create_new_user.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isLoading = false;
            });
    }
});

export const { clear_create_user_state } = createNewUser.actions;
export default createNewUser.reducer;
