import { NextResponse } from 'next/server';
export const maxDuration = 300;

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';
import bcrypt from 'bcryptjs';
import moment from 'moment';

export async function POST(req) {
  try {
    //input validation
    const body = await req.json();
    const { email, password } = body;

    const existingCustomer = await prisma.customerAccount.findFirst({
      where: {
        email: email,
      },
      select: {
        customer_id: true,
        email: true,
        password: true,
      },
    });

    var isCorrect = false;
    if (existingCustomer) {
      var returnPwd = existingCustomer.password;
      isCorrect = await bcrypt.compare(password, returnPwd);
      if (isCorrect) {
        const customerInfor = await prisma.customer.findFirst({
          where: {
            customer_id: existingCustomer.customer_id,
            del_yn: 'N',
          },
          select: {
            customer_id: true,
            customer_nm: true,
            address: true,
            email: true,
            birthday: true,
            gender: true,
            phone: true,
          },
        });
        if (customerInfor) {
          const formattedCustomerInfo = {
            customer_id: customerInfor.customer_id,
            customer_name: customerInfor.customer_nm,
            address: customerInfor.address,
            email: customerInfor.email,
            birthday: customerInfor.birthday,
            gender: customerInfor.gender,
            phone_number: customerInfor.phone,
          };
          return NextResponse.json(
            ResponseObject(
              1,
              LOGIN_MESSAGE.LOGIN_SUCCESS,
              [],
              'CLIENT API',
              formattedCustomerInfo
            )
          );
        }
      }
    }
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.LOGIN_FAILED, [], 'CLIENT API', null)
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.LOGIN_FAILED, [], 'CLIENT API', null)
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
