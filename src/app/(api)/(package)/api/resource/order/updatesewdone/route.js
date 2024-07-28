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
      // console.log(body);
      var searchOtp = [];
      const { sewingTicketId, orderId } = body;

      if (sewingTicketId) {
        searchOtp.push({ sewingTicketId: {equals: sewingTicketId} });
      }

      var updateOrder = await prisma.sewingticket.updateMany({
        where: {
          AND: searchOtp,
        },
        data: {
          status: "DONE"
        },
      });

      var searchDoneSew = await prisma.sewingticket.count({
        where:{
          orderId: orderId,
          status: "DONE"
        }
      })

      var searchSew = await prisma.sewingticket.count({
        where:{
          orderId: orderId,
        }
      })


      if (updateOrder.length == 0) {
        return NextResponse.json(
          ResponseObject(
            0,
            LOGIN_MESSAGE.UPDATE_FAILED,
            [],
            'Sewing',
            {}
          )
        );
      } else {
        if(searchDoneSew == searchSew){
          return NextResponse.json(
            ResponseObject(
              1,
              LOGIN_MESSAGE.SAVE_SUCCESS,
              'DONE',
              'Sewing',
              {}
            )
          );
        }else{
          return NextResponse.json(
            ResponseObject(
              1,
              LOGIN_MESSAGE.SAVE_SUCCESS,
              updateOrder,
              'Sewing',
              {}
            )
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Sewing', error)
    );
  } 
}
