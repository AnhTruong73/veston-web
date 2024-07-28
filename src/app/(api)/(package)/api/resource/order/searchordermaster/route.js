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
      var { order_id_otp, branch_id_otp, customer_id_otp, cre_dt } = body;
      if (order_id_otp) {
        searchOtp.push({ order_id: { equals: order_id_otp } });
      }
      if (branch_id_otp) {
        searchOtp.push({ branchId: { equals: branch_id_otp } });
      }
      if (customer_id_otp) {
        searchOtp.push({ customerId: { equals: customer_id_otp } });
      }
      if (cre_dt) {
        const utcDate = formatISODateGMT7(cre_dt);
        searchOtp.push({ cre_dt: { equals: utcDate } });
      }
      var searchOrder = await prisma.orders.findMany({
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
      var searchOrderRequest = await prisma.ordersRequest.findMany({
        where: {
          AND: searchOtp,
          status: 'REQUEST',
        },
        select: {
          id: true,
          branchId: true,
          customerId: true,
          orderId: true,
          fullName: true,
          phoneNumber: true,
          totalAmount: true,
          email: true,
          status: true,
          shippingAddress: true,
          shippingMethod: true,
          est_delivery: true,
          actual_delivery: true,
          cre_usr_id: true,
          cre_dt: true,
          prepaid: true,
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

      searchOrder.push(...searchOrderRequest);
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
