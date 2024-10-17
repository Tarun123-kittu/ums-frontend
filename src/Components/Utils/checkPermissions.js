const checkPermissions = (requestedPermission, roles, permissions) => {
    const permissionFlags = {
        can_view: false,
        can_create: false,
        can_delete: false,
        can_update: false,
    };

    roles.forEach((role) => {
        permissions.forEach((perm) => {
            if (perm.role === role && perm.permission === requestedPermission) {
                console.log(perm, "this is from the middleware");
                perm?.can_view === 0 ? permissionFlags.can_view = false : permissionFlags.can_view = true
                perm?.can_create === 0 ? permissionFlags.can_create = false : permissionFlags.can_create = true
                perm?.can_delete === 0 ? permissionFlags.can_delete = false : permissionFlags.can_delete = true
                perm?.can_update === 0 ? permissionFlags.can_update = false : permissionFlags.can_update = true
            }
        });
    });

    if (!permissionFlags.can_view && !permissionFlags.can_create && !permissionFlags.can_delete && !permissionFlags.can_update) {
        return {
            canView: false,
            canCreate: false,
            canDelete: false,
            canUpdate: false,
        };
    }

    return permissionFlags;
};

export default checkPermissions;
