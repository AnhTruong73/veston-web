import { NextResponse } from 'next/server';
export const maxDuration = 300;

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      customerId,
      fullName,
      email,
      phoneNumber,
      shippingAddress,
      totalAmount,
      order_items,
      branchId,
      shippingMethod,
    } = body;
    console.log(body);

    const transactionTest = await prisma.$transaction(async (tx) => {
      const order = await tx.ordersRequest.create({
        data: {
          orderId: uuidv4(),
          fullName,
          phoneNumber,
          totalAmount,
          email,
          shippingAddress,
          status: 'REQUEST',
          shippingMethod,
          cre_usr_id: customerId,
          upd_usr_id: customerId,
          branch: {
            connect: { branch_id: branchId },
          },
          customer: {
            connect: {
              customer_id: customerId,
            },
          },
        },
      });
      for (const item of order_items) {
        const sewingTicket = await tx.sewingticketRequest.create({
          data: {
            sewingTicketId: uuidv4(),
            height: item.height * 1,
            weight: item.weight * 1,
            bust: item.bust * 1,
            waist: item.waist * 1,
            hips: item.hips * 1,
            price: item.price * 1,
            quantity: item.quantity * 1,
            status: 'REQUEST',
            cre_usr_id: customerId,
            upd_usr_id: customerId,
            product: {
              connect: {
                product_id: item.productVariantId,
              },
            },
            branch: {
              connect: {
                branch_id: item.branchId,
              },
            },
            Orders: {
              connect: {
                orderId: order.orderId,
              },
            },
          },
        });
      }

      return ResponseObject(
        1,
        LOGIN_MESSAGE.REGISTER_SUCCESS,
        [],
        'CLIENT API',
        null
      );
    });

    return NextResponse.json(transactionTest);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.REGISTER_FAILED, [], 'CLIENT API', null)
    );
  }
}
export async function OPTIONS(req) {
  try {
    return NextResponse.json(
      ResponseObject(1, LOGIN_MESSAGE.SEARCH_SUCCESS, [], 'CLIENT API', null)
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'CLIENT API', null)
    );
  }
}
