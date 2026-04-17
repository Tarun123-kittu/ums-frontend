import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_all_user_roles } from "../../../utils/redux/rolesAndPermissionSlice/getUserRolesSlice";

const UseAllUserRoles = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_all_user_roles())
    }, [dispatch])

    return null
}

export default UseAllUserRoles