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
      console.log(body);
      const { OrderMasterId, sewingTicketId } = body;

      var updatedOrder = await prisma.sewingticket.findMany({
        where: {
          orderId: OrderMasterId,
          sewingTicketId: {
            in: sewingTicketId,
          },
        },
        include: {
          Orders: true,
        },
      });

      var updateOrder = await prisma.sewingticket.updateMany({
        where: {
          orderId: OrderMasterId,
          sewingTicketId: {
            in: sewingTicketId,
          },
        },
        data: {
          status: 'REJECT',
        },
      });

      if (updateOrder.count == 0) {
        return NextResponse.json(
          ResponseObject(0, LOGIN_MESSAGE.UPDATE_FAILED, [], 'Sewing', {})
        );
      } else {
        console.log(updatedOrder);
        var updateOrderNew = await prisma.orders.update({
          where: {
            orderId: OrderMasterId,
          },
          data: {
            totalAmount:
              updatedOrder[0].Orders.totalAmount -
              calculateTotalPrice(updatedOrder) * 1,
          },
        });

        // await prisma.ordersRequest.upsert({
        //   where: {
        //     orderId: OrderMasterId,
        //   },
        //   data: {
        //     totalAmount:
        //       updateOrder[0].Orders.totalAmount -
        //       calculateTotalPrice(updateOrder) * 1,
        //   },
        // });

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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Sewing', error)
    );
  }
}
const calculateTotalPrice = (orders) => {
  return orders.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );
};
