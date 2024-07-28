import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();
    var searchOtp = [];
    var searchAc = [];

    if (Object.keys(body).length > 0) {
      const { customer_id, customer_nm, del_yn_otp } = body;
      console.log(body);
      if (customer_id) {
        searchOtp.push({ customer_id: { startsWith: customer_id } });
        searchAc.push({ customer_id: { startsWith: customer_id } });
      }
      if (del_yn_otp) {
        searchOtp.push({ del_yn: { equals: del_yn_otp } });
      }
      if (customer_nm) {
        searchOtp.push({ customer_nm: { startsWith: customer_nm } });
      }
    }

    const searchCt = await prisma.customer.findMany({
      where: {
        AND: searchOtp,
      },
      select: {
        customer_id: true,
        customer_nm: true,
        email: true,
        birthday: true,
        del_yn: true,
        gender: true,
        address: true,
        phone: true,
        cre_usr_id: true,
        cre_dt: true,
        upd_usr_id: true,
        upd_dt: true,
      },
    });
    searchCt.forEach((ct) => {
      ct.cre_dt = new Date(ct.cre_dt).toISOString().split('T')[0];
      ct.upd_dt = new Date(ct.upd_dt).toISOString().split('T')[0];
    });
    if (searchCt.length > 0) {
      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SEARCH_SUCCESS,
          searchCt,
          'Customer',
          null
        )
      );
    } else {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Customer', null)
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Customer', error)
    );
  }
}
