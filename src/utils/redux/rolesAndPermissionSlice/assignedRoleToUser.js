import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const assigned_role = createAsyncThunk("assigned_role", async ({ role_id, user_id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "user_id": user_id,
            "role_id": role_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/assign_role`, requestOptions)
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

export const assignedRole = createSlice({
    name: "assignedRole",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_assigned_role_state: (state) => {
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
            .addCase(assigned_role.pending, (state) => {
                state.isLoading = true
            })
            .addCase(assigned_role.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(assigned_role.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_assigned_role_state } = assignedRole.actions
export default assignedRole.reducer