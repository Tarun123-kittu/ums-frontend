import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const create_new_role_and_assign_permissions = createAsyncThunk("create_new_role_and_assign_permissions", async ({ permission_data, role, user_id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "role": role,
            "user_id": user_id,
            "permission_data": permission_data
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/assign_new_permissions_to_roles`, requestOptions)
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

export const createNewRoleAndAssignPermissions = createSlice({
    name: "createNewRoleAndAssignPermissions",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_new_role_permission_state: (state) => {
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
            .addCase(create_new_role_and_assign_permissions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_new_role_and_assign_permissions.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(create_new_role_and_assign_permissions.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_new_role_permission_state } = createNewRoleAndAssignPermissions.actions
export default createNewRoleAndAssignPermissions.reducer