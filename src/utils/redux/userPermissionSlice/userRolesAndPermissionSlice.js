import { createSlice } from "@reduxjs/toolkit";

export const userPermissionHandler = createSlice({
    name: "user_permission_handler",
    initialState: {
        roles_data: [],
        permission_data: []
    },
    reducers: {
        save_user_permission_and_roles_globally: (state, action) => {
            state.roles_data = action.payload.uniqueRole
            state.permission_data = action.payload.permissions

            return state
        }
    }
})

export const { save_user_permission_and_roles_globally } = userPermissionHandler.actions
export default userPermissionHandler.reducer