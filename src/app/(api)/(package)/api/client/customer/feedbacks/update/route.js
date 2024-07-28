import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import { v4 as uuidv4 } from 'uuid';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    const { customer_id, product_variant_id, rate, content } = body;

    const transactionTest = await prisma.$transaction(async (tx) => {
      const updatefeedback = await tx.feedbacks.update({
        where: {
          customer_id_product_id: {
            customer_id: customer_id,
            product_id: product_variant_id,
          },
        },
        data: {
          rate: rate,
          content: content,
          upd_usr_id: customer_id,
        },
      });
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
