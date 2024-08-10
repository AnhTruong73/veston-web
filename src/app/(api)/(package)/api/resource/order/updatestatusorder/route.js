import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import moment from 'moment';

export async function POST(req) {
  try {
    const JWT_SECRET = process.env.SECRET_KET;
    const jwt = require('jsonwebtoken');
    const sessionToken = req.cookies.get('token')?.value;
    if (sessionToken) {
      const userInfor = jwt.decode(sessionToken, JWT_SECRET).id;
      const body = await req.json();
      var searchOtp = [];
      const { orderId, statusDone, est_delivery } = body;
      if (orderId) {
        searchOtp.push({ orderId: { equals: orderId } });
      }
      if (statusDone == 'APPROVE') {
        var updateOrder = await prisma.ordersRequest.updateMany({
          where: {
            AND: searchOtp,
          },
          data: {
            est_delivery: est_delivery,
            status: statusDone,
          },
        });
      } else {
        var updateOrder = await prisma.orders.updateMany({
          where: {
            AND: searchOtp,
          },
          data: {
            actual_delivery: moment(new Date()).format('YYYY-MM-DD'),
            status: statusDone,
          },
        });
        var updateOrderRequest = await prisma.ordersRequest.updateMany({
          where: {
            AND: searchOtp,
          },
          data: {
            actual_delivery: moment(new Date()).format('YYYY-MM-DD'),
            status: statusDone,
          },
        });
      }
      if (updateOrder.length == 0) {
        return NextResponse.json(
          ResponseObject(0, LOGIN_MESSAGE.UPDATE_FAILED, [], 'Order', {})
        );
      } else {
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SAVE_SUCCESS,
            updateOrder,
            'Order',
            {}
          )
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Order', error)
    );
  }
}
