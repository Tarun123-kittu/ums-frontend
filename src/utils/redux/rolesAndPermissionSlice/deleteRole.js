import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const disable_role = createAsyncThunk("delete_role", async ({ role_id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('ums_token'));

        const raw = JSON.stringify({
            "role_id": role_id
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEN_URL}/delete_role`, requestOptions)
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

export const disableRole = createSlice({
    name: "disableRole",
    initialState: {
        message: {},
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null
    },
    reducers: {
        clear_disable_role_state: (state) => {
            state.message = {}
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(disable_role.pending, (state) => {
                state.isLoading = true
            })
            .addCase(disable_role.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(disable_role.rejected, (state, action) => {
                state.error = action.payload
                state.isError = true
                state.isLoading = false
            })
    }
})
export const { clear_disable_role_state } = disableRole.actions
export default disableRole.reducer