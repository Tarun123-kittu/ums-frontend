// export const permissionsList = [
//     { can_view: false, can_create: false, can_update: false, can_delete: false, permission: "Salary", permission_id: 1 },
//     { can_view: false, can_create: false, can_update: false, can_delete: false, permission: "Attendance", permission_id: 2 },
//     { can_view: false, can_create: false, can_update: false, can_delete: false, permission: "Events", permission_id: 3 },
//     { can_view: false, can_create: false, can_update: false, can_delete: false, permission: "Interviews", permission_id: 4 },
//     { can_view: false, can_create: false, can_update: false, can_delete: false, permission: "Users", permission_id: 5 },
// ]
import { useState, useEffect } from "react"
import { get_permissions } from "../../../utils/redux/rolesAndPermissionSlice/getPermissions"
import { useDispatch, useSelector } from "react-redux"


export const PermissionsList = () => {
    const [permissions, setPermissions] = useState()
    const dispatch = useDispatch()
    const all_permissions = useSelector((store) => store.GET_ALL_PERMISSIONS)

    useEffect(() => {
        dispatch(get_permissions())
    }, [])

    useEffect(() => {
        const data = []
        if (all_permissions?.isSuccess) {
            all_permissions?.data?.data?.map((per) => {
                data.push({ can_view: false, can_create: false, can_update: false, can_delete: false, permission: per?.permission, permission_id: per?.permission_id })
            })
        }
        setPermissions(data)
    }, [all_permissions])

    return permissions;
}