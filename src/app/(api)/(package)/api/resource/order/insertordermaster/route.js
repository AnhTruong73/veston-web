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
      const {
        orderId,
        fullName,
        phoneNumber,
        totalAmount,
        customerId,
        email,
        shippingAddress,
        status,
        prepaid,
        sewingticket,
        shippingMethod,
        est_delivery,
        actual_delivery,
        branchId,
        cre_usr_id,
        cre_dt,
        upd_usr_id,
        upd_dt,
      } = body;

      const searchOrder = await prisma.orders.findMany({
        where: {
          orderId: orderId,
        },
        select: {
          orderId: true,
        },
        orderBy: [{ cre_dt: 'asc' }],
      });
      if (searchOrder == 0) {
        var insertOrdersSuccess = {};
        await prisma.$transaction(async (tx) => {
          const insertOrders = await tx.orders.create({
            data: {
              orderId: orderId,
              fullName: fullName,
              phoneNumber: phoneNumber,
              totalAmount: totalAmount,
              customerId: customerId,
              email: email,
              shippingAddress: shippingAddress,
              status: 'APPROVE',
              prepaid: prepaid,
              shippingMethod: shippingMethod,
              est_delivery: est_delivery,
              actual_delivery: actual_delivery,
              branchId: branchId,
              cre_usr_id: cre_usr_id,
              cre_dt: cre_dt,
              upd_usr_id: upd_usr_id,
              upd_dt: upd_dt,
            },
          });

          for (const ticket of sewingticket) {
            const insertSewing = await tx.sewingticket.create({
              data: ticket,
            });
            const updateSewing = await tx.sewingticketRequest.updateMany({
              where: {
                orderId: ticket.orderId,
                sewingTicketId: ticket.sewingTicketId,
              },
              data: {
                status: 'APPROVE',
              },
            });
          }
          insertOrdersSuccess = insertOrders;
        });

        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SAVE_SUCCESS,
            [],
            'Orders Master',
            insertOrdersSuccess
          )
        );
      } else {
        return NextResponse.json(
          ResponseObject(
            0,
            LOGIN_MESSAGE.EXISTING_DATA,
            [],
            'Orders Master',
            {}
          )
        );
      }
      // console.log(searchInvoice);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Orders Master', error)
    );
  }
}
