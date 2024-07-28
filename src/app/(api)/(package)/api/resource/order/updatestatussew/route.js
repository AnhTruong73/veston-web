import { NextResponse } from 'next/server';
export const maxDuration = 60;

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
      const { orderId, statusDone } = body;
      if (orderId) {
        searchOtp.push({ orderId: { equals: orderId } });
      }
      var updateSew = await prisma.sewingticket.updateMany({
        where: {
          AND: searchOtp,
        },
        data: {
          status: statusDone,
        },
      });
      if (updateSew.length == 0) {
        return NextResponse.json(
          ResponseObject(0, LOGIN_MESSAGE.UPDATE_FAILED, [], 'Sewing', {})
        );
      } else {
        return NextResponse.json(
          ResponseObject(1, LOGIN_MESSAGE.SAVE_SUCCESS, updateSew, 'Sewing', {})
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
