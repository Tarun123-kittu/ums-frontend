import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_role_permissions } from "../../../utils/redux/rolesAndPermissionSlice/getRolePermissions";

const UseRolePermissions = ({ id }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_role_permissions({ id }))
    }, [])

    return null
}

export default UseRolePermissions