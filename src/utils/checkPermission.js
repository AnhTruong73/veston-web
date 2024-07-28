const rolePermissions = {
  SUPPERADMIN: ['/home', '/auth/logout', '/users'],
  BRANCHMANAGER: ['/home', '/auth/logout', '/profile'],
  STOREMANAGER: ['/home', '/auth/logout'],
  RECEPTIONIST: ['/home', '/auth/logout'],
  SHAREHOLDER: ['/home', '/auth/logout'],
};

const checkPermission = (pathname, UserInfor) => {
  if (UserInfor) {
    const isSupperAdmin = UserInfor?.role === 'SUPPERADMIN';
    if (
      !rolePermissions[UserInfor?.role]?.includes(pathname) &&
      !isSupperAdmin
    ) {
      return false;
    }
    return true;
  }
  return false;
};

export const checkPermissionSV = (pathname, UserInfor) => {
  if (UserInfor) {
    const isSupperAdmin = UserInfor?.id?.role === 'SUPPERADMIN';
    console.log(rolePermissions[UserInfor?.id?.role]?.includes(pathname));
    if (
      !rolePermissions[UserInfor?.id?.role]?.includes(pathname) &&
      !isSupperAdmin
    ) {
      return false;
    }
    return true;
  }
  return false;
};
export default checkPermission;
