import { NextResponse } from 'next/server';
import { checkPermissionSV } from './utils/checkPermission';

const authPaths = [
  '/auth/login',
  '/auth/register',
  '/api/auth/login',
  '/api/auth/register',
];
const jwt = require('jsonwebtoken');

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('token')?.value;
  const JWT_SECRET = process.env.SECRET_KET;
  console.log('Jay Trương');
  console.log('========>start<========');
  console.log(`request -> --${pathname}--`);
  let endPoint = pathname;
  try {
    const UserInfor = jwt.decode(sessionToken, JWT_SECRET);
    if (UserInfor) {
      console.log(UserInfor);
      // console.log(`UserInfor-> ${UserInfor.id ? true : false}`);
      if (pathname === '/') {
        console.log('server redirect to home with /');
        endPoint = '/home';
      }
      if (authPaths.some((path) => pathname.startsWith(path))) {
        console.log('server redirect to Home');
        endPoint = '/home';
      }
      console.log('==> START checkPermission <==');
      const isAuthRole = checkPermissionSV(endPoint, UserInfor);
      console.log(`isAuthRole -> ${isAuthRole}`);
      if (!isAuthRole) {
        endPoint = '/auth/unauthorized';
      }
      console.log('==> END CheckPermission <==');
    } else {
      endPoint = '/auth/login';
    }
  } catch (error) {
    console.log(error);
    console.log(`UserInfor-> false`);
    if (sessionToken) {
      endPoint = '/auth/logout';
    } else {
      endPoint = '/auth/login';
    }
  } finally {
    console.log(`pathname -> --${pathname}--`);
    console.log(`endpoint -> --${endPoint}--`);
    console.log(`========> end <========`);

    if (pathname == endPoint) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(endPoint, request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/home',
    '/branch',
    '/employee',
    '/shareholder',
    '/account',
    '/customer',
    '/api/resource/:path*',
  ],
};
