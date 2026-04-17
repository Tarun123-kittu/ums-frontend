import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_logged_in_user_permissions } from "../../../utils/redux/userPermissionSlice/userpermissionSlice";
import checkPermissions from "../checkPermissions";

export const UsePermissions = (permission) => {
    const dispatch = useDispatch()
    const [permissions, setPermissions] = useState({
        can_view: false,
        can_create: false,
        can_delete: false,
        can_update: false,
    });
    const user_all_permissions = useSelector(
        (store) => store.USER_ALL_PERMISSIONS
    );
    useEffect(() => {
        dispatch(get_logged_in_user_permissions())
    }, [])


    useEffect(() => {
        const permissionStatus = checkPermissions(
            permission,
            user_all_permissions?.roles_data,
            user_all_permissions?.permission_data
        );
        setPermissions(permissionStatus);
    }, [user_all_permissions]);

    return permissions
}