import { NextResponse } from 'next/server';
export const maxDuration = 300;
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import { formatISODateGMT7 } from '@/common/jay';

export async function POST(req) {
  try {
    const JWT_SECRET = process.env.SECRET_KET;
    const jwt = require('jsonwebtoken');
    const sessionToken = req.cookies.get('token')?.value;
    if (sessionToken) {
      const userInfor = jwt.decode(sessionToken, JWT_SECRET).id;
      const body = await req.json();
      var searchOtp = [];
      var { orderId, cre_dt } = body;
      if (orderId) {
        searchOtp.push({ orderId: { equals: orderId } });
      }
      if (cre_dt) {
        const utcDate = formatISODateGMT7(cre_dt);
        searchOtp.push({ cre_dt: { equals: utcDate } });
      }
      var searchOrder = await prisma.sewingticket.findMany({
        where: {
          AND: searchOtp,
        },
        select: {
          id: true,
          branchId: true,
          sewingTicketId: true,
          orderId: true,
          height: true,
          weight: true,
          bust: true,
          waist: true,
          hips: true,
          price: true,
          status: true,
          productId: true,
          cre_usr_id: true,
          cre_dt: true,
          upd_usr_id: true,
          upd_dt: true,
          product: true,
          branch: true,
          Orders: true,
        },
        orderBy: [{ cre_dt: 'asc' }],
      });
      if (searchOrder.length == 0) {
        return NextResponse.json(
          ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Sewing', {})
        );
      } else {
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SEARCH_SUCCESS,
            searchOrder,
            'Sewing',
            {}
          )
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Sewing', error)
    );
  }
}
