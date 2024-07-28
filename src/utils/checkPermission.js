const rolePermissions = {
  SUPPERADMIN: ['/home', '/users'],
  BRANCHMANAGER: ['/home', '/profile'],
  STOREMANAGER: ['/home'],
  RECEPTIONIST: ['/home'],
  SHAREHOLDER: ['/home'],
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
