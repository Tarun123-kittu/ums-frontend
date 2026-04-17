import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const update_role_permission = createAsyncThunk("update_role_permission", async ({ permission_data }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "permission_data": permission_data
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/update_permissions_assigned_to_role`, requestOptions)
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

export const updateRolePermission = createSlice({
    name: "updateRolePermission",
    initialState: {
        message: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        error: null
    },
    reducers: {
        clear_update_role_permissions_slice: (state) => {
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
            .addCase(update_role_permission.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_role_permission.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(update_role_permission.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_update_role_permissions_slice } = updateRolePermission.actions
export default updateRolePermission.reducer