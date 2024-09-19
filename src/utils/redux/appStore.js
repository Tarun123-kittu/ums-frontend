import { configureStore } from '@reduxjs/toolkit'
import getAllUsers from './userSlice/getAllUserSlice'
import createNewUser from './userSlice/createNewUserSlice'
import deleteUser from './userSlice/deleteUserSlice'
import Login from './loginSlice/loginSlice'
import getLoggedInUserPermissions from './userPermissionSlice/userpermissionSlice'
import userPermissionHandler from './userPermissionSlice/userRolesAndPermissionSlice'
import getUserDetails from './userSlice/userDetailsSlice'
import updateUser from './userSlice/updateUserSlice'
import getAttendanceReport from './attendanceSlice/getAttendanceReport'

const appStore = configureStore({
    reducer: {
        LOGIN: Login,
        GET_ALL_USERS: getAllUsers,
        CREATE_NEW_USER: createNewUser,
        DELETE_USER: deleteUser,
        USER_PERMISSIONS: getLoggedInUserPermissions,
        USER_ALL_PERMISSIONS: userPermissionHandler,
        GET_USER_DETAILS: getUserDetails,
        UPDATE_USER: updateUser,
        ATTENDANCE_REPORT: getAttendanceReport
    },
})

export default appStore

