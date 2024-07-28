import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function POST(req, { params }) {
  try {
    const transactionTest = await prisma.$transaction(async (tx) => {
      const updatedOrder = await prisma.ordersRequest.update({
        where: { orderId: params.orderId, status: 'REQUEST' },
        data: {
          status: 'REJECT',
          sewingticket: {
            updateMany: {
              where: { orderId: params.orderId },
              data: { status: 'REJECT' },
            },
          },
        },
      });

      return ResponseObject(
        1,
        LOGIN_MESSAGE.REJECT_SUCCESS,
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
