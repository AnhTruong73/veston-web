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
      const { shareholder_id, shareholder_nm, del_yn_otp } = body;
      console.log(body);
      if (shareholder_id) {
        searchOtp.push({ shareholder_id: { startsWith: shareholder_id } });
        searchAc.push({ shareholder_id: { startsWith: shareholder_id } });
      }
      if (del_yn_otp) {
        searchOtp.push({ del_yn: { equals: del_yn_otp } });
      }
      if (shareholder_nm) {
        searchOtp.push({ shareholder_nm: { startsWith: shareholder_nm } });
      }
    }

    const searchSh = await prisma.shareholder.findMany({
      where: {
        AND: searchOtp,
      },
      select: {
        shareholder_id: true,
        shareholder_nm: true,
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
        share_value: true,
      },
    });
    searchSh.forEach((sh) => {
      sh.cre_dt = new Date(sh.cre_dt).toISOString().split('T')[0];
      sh.upd_dt = new Date(sh.upd_dt).toISOString().split('T')[0];
    });
    if (searchSh.length > 0) {
      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SEARCH_SUCCESS,
          searchSh,
          'Shareholder',
          null
        )
      );
    } else {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Shareholder', null)
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Shareholder', error)
    );
  }
}
