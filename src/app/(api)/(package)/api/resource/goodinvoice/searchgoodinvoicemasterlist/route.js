import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const JWT_SECRET = process.env.SECRET_KET;
    const jwt = require('jsonwebtoken');
    const sessionToken = req.cookies.get('token')?.value;
    if (sessionToken) {
      const userInfor = jwt.decode(sessionToken, JWT_SECRET).id;
      const body = await req.json();
      var searchOtp = [];
      const { branch_id_otp, inv_id_otp } = body;
      if (inv_id_otp) {
        searchOtp.push({ inv_id: { equals: inv_id_otp } });
      }
      if (branch_id_otp) {
        searchOtp.push({ branch_id: { equals: branch_id_otp } });
      }

      var searchInvoice = await prisma.goodsInvoiceMaster.findMany({
        where: {
          AND: searchOtp,
        },
        select: {
          branch_id: true,
          branch: true,
          goodsInvoiceDetail: true,
          inv_id: true,
          issue_dt: true,
          provider_address: true,
          provider_nm: true,
          provider_phone: true,
          provider_representative: true,
          status: true,
          total_amt: true,
          cre_usr_id: true,
          cre_dt: true,
          upd_usr_id: true,
          upd_dt: true,
        },
        orderBy: [{ cre_dt: 'asc' }],
      });
      if (searchInvoice.length == 0) {
        return NextResponse.json(
          ResponseObject(
            0,
            LOGIN_MESSAGE.SEARCH_FAILED,
            [],
            'Good Invoice Master',
            {}
          )
        );
      } else {
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SEARCH_SUCCESS,
            searchInvoice,
            'Good Invoice Master',
            {}
          )
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Good Invoice Master', error)
    );
  }
}
