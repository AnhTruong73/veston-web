'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { COOKIE_KEY } from '@/web.config';
import Cookies from 'js-cookie';
import { logout } from '@/app/redux/slice/authSlice';
import { setLayoutLoading } from '@/app/redux/slice/stateSlice';
import { refreshBranch } from '@/app/redux/slice/scense/branch';
import { refreshEmployee } from '@/app/redux/slice/scense/employee';
import { refreshShareholder } from '@/app/redux/slice/scense/shareholder';
import { refreshMaterial } from '@/app/redux/slice/scense/material';
import { refreshGoodInvoice } from '@/app/redux/slice/scense/goodinvoice';
import { refreshGoodInvoiceDetail } from '@/app/redux/slice/scense/goodinvoicedetail';
import { useRouter } from 'next/navigation';

function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout());
    dispatch(setLayoutLoading(false));
    dispatch(refreshBranch());
    dispatch(refreshEmployee());
    dispatch(refreshShareholder());
    dispatch(refreshMaterial());
    dispatch(refreshGoodInvoice());
    dispatch(refreshGoodInvoiceDetail());
    //
    Cookies.remove(COOKIE_KEY.API_TOKEN_KEY);
  }, []);

  return <></>;
}

export default Logout;
