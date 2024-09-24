import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const delete_user_assigned_to_role = createAsyncThunk("delete_user_assigned_to_role", async ({ user_id, roleId }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/delete_user_role?user_id=${user_id}&roleId=${roleId}`, requestOptions)
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

export const deleteUserAssignedToRole = createSlice({
    name: "deleteUserAssignedToRole",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_delete_user_assigned_to_role: (state) => {
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
            .addCase(delete_user_assigned_to_role.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delete_user_assigned_to_role.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(delete_user_assigned_to_role.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_delete_user_assigned_to_role } = deleteUserAssignedToRole.actions
export default deleteUserAssignedToRole.reducer