import { NextResponse } from 'next/server';
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
      var { orderId } = body;
      if (orderId) {
        searchOtp.push({ orderId: { equals: orderId } });
      }
      var searchOrder = await prisma.orders.findFirst({
        where: {
          AND: searchOtp,
          NOT: {
            status: 'REJECT',
          },
        },
        select: {
          id: true,
          branchId: true,
          customerId: true,
          orderId: true,
          fullName: true,
          phoneNumber: true,
          totalAmount: true,
          prepaid: true,
          email: true,
          status: true,
          shippingAddress: true,
          shippingMethod: true,
          est_delivery: true,
          actual_delivery: true,
          cre_usr_id: true,
          cre_dt: true,
          upd_usr_id: true,
          upd_dt: true,
          branch: true,
          customer: true,
          sewingticket: {
            where: {
              NOT: {
                status: 'REJECT',
              },
            },
          },
        },
        orderBy: [{ cre_dt: 'asc' }],
      });
      if (searchOrder.length == 0) {
        return NextResponse.json(
          ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Order Master', {})
        );
      } else {
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SEARCH_SUCCESS,
            searchOrder,
            'Order Master',
            {}
          )
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Order Master', error)
    );
  }
}
