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
    const {
      email,
      customer_name,
      gender,
      del_yn = 'N',
      birthday,
      address,
      password,
      phone_number,
    } = body;
    const hashedPassword = await bcrypt.hash(password, 16);
    var cre_customer = '';
    var customerDate = moment(new Date()).format('YYYYMMDD');
    customerDate = customerDate.substring(2, 6);
    var datetimeBirth = new Date(birthday).toISOString();
    const transactionTest = await prisma.$transaction(async (tx) => {
      const existingCustomer = await tx.customer.findFirst({
        select: {
          customer_id: true,
        },
        orderBy: { cre_dt: 'desc' },
      });

      const existEmail = await tx.customer.findFirst({
        where: {
          email: email,
        },
        select: {
          customer_id: true,
        },
      });

      if (existingCustomer) {
        cre_customer = existingCustomer.customer_id.slice(6); // ''
        cre_customer = (cre_customer * 1 + 1)
          .toString()
          .padStart(cre_customer.length, '0'); //1
        cre_customer = 'CT' + customerDate + cre_customer;
      } else {
        cre_customer = 'CT' + customerDate + '01';
      }

      if (!existEmail) {
        const insertCustomer = await tx.customer.create({
          data: {
            customer_id: cre_customer,
            customer_nm: customer_name,
            email: email,
            birthday: datetimeBirth,
            del_yn: del_yn,
            gender: gender,
            address: address,
            phone: phone_number,
            cre_usr_id: cre_customer,
            upd_usr_id: cre_customer,
          },
        });

        const insertCustomerAccount = await tx.customerAccount.create({
          data: {
            customer_id: cre_customer,
            email: email,
            password: hashedPassword,
            cre_usr_id: cre_customer,
            upd_usr_id: cre_customer,
          },
        });

        return ResponseObject(
          1,
          LOGIN_MESSAGE.REGISTER_SUCCESS,
          [],
          'CLIENT API',
          insertCustomer
        );
      } else {
        return ResponseObject(
          0,
          'Email or Username Existing!',
          [],
          'CLIENT API',
          null
        );
      }
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
