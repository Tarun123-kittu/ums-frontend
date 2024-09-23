import { configureStore } from '@reduxjs/toolkit'
import getAllUsers from './userSlice/getAllUserSlice'
import createNewUser from './userSlice/createNewUserSlice'
import deleteUser from './userSlice/deleteUserSlice'
import Login from './loginSlice/loginSlice'
import getLoggedInUserPermissions from './userPermissionSlice/userpermissionSlice'
import userPermissionHandler from './userPermissionSlice/userRolesAndPermissionSlice'
import getUserDetails from './userSlice/userDetailsSlice'
import updateUser from './userSlice/updateUserSlice'
import getAttendanceReport from './attendanceSlice/getTodayAttendance'
import getUserAttendanceReport from './attendanceSlice/getAttendanceRepot'
import getAllAppliedLeaves from './leaveSlice/getAllAppliedLeaves'
import getAllUserRoles from './rolesAndPermissionSlice/getUserRolesSlice'
import getRolePermissions from './rolesAndPermissionSlice/getRolePermissions'
import updateRolePermission from './rolesAndPermissionSlice/updateRolePermission'
import disableRole from './rolesAndPermissionSlice/deleteRole'
import createNewRoleAndAssignPermissions from './rolesAndPermissionSlice/createNewRole'
import getAllUsername from './userSlice/getAllUserName'
import getUsersAssignedToRoles from './rolesAndPermissionSlice/getUserAssignedToRole'
import deleteUserAssignedToRole from './rolesAndPermissionSlice/deleteUserAssignedToRole'
import assignedRole from './rolesAndPermissionSlice/assignedRoleToUser'

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
        ATTENDANCE_REPORT: getAttendanceReport,
        GET_USER_ATTENDANCE_REPORT: getUserAttendanceReport,
        GET_ALL_APPLIED_LEAVES: getAllAppliedLeaves,
        GET_ALL_USER_ROLES: getAllUserRoles,
        GET_ROLE_PERMISSIONS: getRolePermissions,
        UPDATE_ROLE_PERMISSION: updateRolePermission,
        DISABLE_ROLE: disableRole,
        CREATE_NEW_ROLE_AND_PERMISSIONS: createNewRoleAndAssignPermissions,
        ALL_USERNAMES: getAllUsername,
        USERS_ASSIGNED_TO_ROLE: getUsersAssignedToRoles,
        DELETE_USER_ASSIGNED_TO_ROLE: deleteUserAssignedToRole,
        ASSIGNED_ROLE: assignedRole
    },
})

export default appStore

