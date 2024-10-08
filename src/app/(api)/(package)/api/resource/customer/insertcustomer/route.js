import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import moment from 'moment';

export async function POST(req) {
  try {
    //input validation

    const body = await req.json();

    const {
      email,
      customer_nm,
      gender,
      cre_usr_id,
      del_yn = 'N',
      birthday,
      address,
      phone,
    } = body;

    const existingCustomer = await prisma.customer.findFirst({
      select: {
        customer_id: true,
      },
      orderBy: { cre_dt: 'desc' },
    });

    const existEmail = await prisma.customer.findFirst({
      where: {
        email: email,
      },
      select: {
        customer_id: true,
      },
    });

    var cre_customer = '';
    var customerDate = moment(new Date()).format('YYYYMMDD');

    customerDate = customerDate.substring(2, 6);

    if (existingCustomer) {
      cre_customer = existingCustomer.customer_id.slice(6); // ''
      cre_customer = (cre_customer * 1 + 1)
        .toString()
        .padStart(cre_customer.length, '0'); //1
      cre_customer = 'CT' + customerDate + cre_customer;
    } else {
      cre_customer = 'CT' + customerDate + '01';
    }

    console.log(birthday);
    var datetimeBirth = new Date(birthday).toISOString();

    if (!existEmail) {
      const insertCustomer = await prisma.customer.create({
        data: {
          customer_id: cre_customer,
          customer_nm: customer_nm,
          email: email,
          birthday: datetimeBirth,
          del_yn: del_yn,
          gender: gender,
          address: address,
          phone: phone,
          cre_usr_id: cre_usr_id,
          upd_usr_id: cre_usr_id,
        },
      });

      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SAVE_SUCCESS,
          insertCustomer,
          'Customer',
          body
        )
      );
    } else {
      return NextResponse.json(
        ResponseObject(
          0,
          'Email or Username Existing!',
          existEmail,
          'Customer',
          body
        )
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Customer', error)
    );
  }
}
