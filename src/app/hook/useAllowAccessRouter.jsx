'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../redux/slice/authSlice';
import Cookies from 'js-cookie';

function useAllowAccessRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const sessionToken = Cookies.get('token');
  if (!sessionToken) {
    dispatch(loginRequest());
  }

  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    console.log('Auth', isAuth);
    if (!isAuth) {
      if (pathname.includes('logout')) {
        router.push('/auth/login');
      } else if (!pathname.includes('login')) {
        router.push('auth/logout');
      }
      router.push(pathname);
    } else {
      if (pathname.includes('login') || pathname.includes('register')) {
        router.push('/home');
      } else {
        router.push(pathname);
      }
    }
  }, [isAuth]);
}

export default useAllowAccessRouter;
