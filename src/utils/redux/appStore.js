import { configureStore } from '@reduxjs/toolkit'
import getAllUsers from './userSlice/getAllUserSlice'
import createNewUser from './userSlice/createNewUserSlice'
import deleteUser from './userSlice/deleteUserSlice'

const appStore = configureStore({
    reducer: {
        GET_ALL_USERS: getAllUsers,
        CREATE_NEW_USER: createNewUser,
        DELETE_USER: deleteUser
    },
})

export default appStore

