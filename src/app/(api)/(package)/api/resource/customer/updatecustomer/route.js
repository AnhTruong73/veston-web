import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();

    if (Object.keys(body).length > 0) {
      const {
        customer_id,
        customer_nm,
        birthday,
        gender,
        address,
        phone,
        email,
      } = body;

      const updateCustomer = await prisma.customer.update({
        where: {
          customer_id: customer_id,
        },
        data: {
          customer_nm: customer_nm,
          birthday: birthday,
          gender: gender,
          address: address,
          phone: phone,
          email: email,
        },
      });
      if (updateCustomer) {
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SAVE_SUCCESS,
            updateCustomer,
            'Customer',
            null
          )
        );
      } else {
        return NextResponse.json(
          ResponseObject(0, LOGIN_MESSAGE.UPDATE_FAILED, [], 'Customer', null)
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Customer', error)
    );
  }
}
