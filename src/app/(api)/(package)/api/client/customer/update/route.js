import { NextResponse } from 'next/server';
export const maxDuration = 300;

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function POST(req) {
  try {
    //input validation
    const body = await req.json();
    const {
      customer_id,
      customer_name,
      gender,
      birthday,
      address,
      phone_number,
    } = body;
    var datetimeBirth = new Date(birthday).toISOString();
    const transactionTest = await prisma.$transaction(async (tx) => {
      const updateCustomerAccount = await tx.customer.update({
        where: {
          customer_id: customer_id,
        },
        data: {
          customer_nm: customer_name,
          address: address,
          phone: phone_number,
          gender: gender,
          birthday: datetimeBirth,
        },
      });

      return ResponseObject(
        1,
        LOGIN_MESSAGE.UPDATE_FAILED,
        [],
        'CLIENT API',
        updateCustomerAccount
      );
    });

    return NextResponse.json(transactionTest);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.UPDATE_FAILED, [], 'CLIENT API', null)
    );
  }
}
export async function OPTIONS(req) {
  try {
    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        // areaArray,
        'CLIENT API',
        null
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'CLIENT API', null)
    );
  }
}
