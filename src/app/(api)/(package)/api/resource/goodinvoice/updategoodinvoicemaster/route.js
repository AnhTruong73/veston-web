import { NextResponse } from 'next/server';
export const maxDuration = 300;

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
      // console.log(body);
      var searchOtp = [];
      const { branch_id, inv_id, total_amt, status } = body;
      if (inv_id && branch_id) {
        searchOtp.push({ inv_id: { equals: inv_id } });
        searchOtp.push({ branch_id: { equals: branch_id } });
      }
      if (searchOtp.length == 0) {
        searchOtp.push({ inv_id: { equals: 'lkkk   @@@@AAAA!!!@@@' } });
      }

      var searchInvoice = await prisma.goodsInvoiceMaster.updateMany({
        where: {
          AND: searchOtp,
        },
        data: {
          total_amt: total_amt * 1,
          status: status,
          upd_usr_id: userInfor.usrId,
        },
      });
      if (searchInvoice.length == 0) {
        return NextResponse.json(
          ResponseObject(
            0,
            LOGIN_MESSAGE.UPDATE_FAILED,
            [],
            'Good Invoice Master',
            {}
          )
        );
      } else {
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SAVE_SUCCESS,
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
