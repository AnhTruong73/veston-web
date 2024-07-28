import { NextResponse } from 'next/server';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();

    var searchOtp = [];

    if (Object.keys(body).length > 0) {
      const { employee_id, email } = body;

      if (employee_id) {
        searchOtp.push({ Employee_id: { equals: employee_id } });
      }

      if (email) {
        searchOtp.push({ usr_email: { equals: email } });
      }
    }
    const searchAccount = await prisma.account.findMany({
      where: {
        AND: searchOtp,
      },
      select: {
        usrname: true,
        password: true,
      },
    });
    console.log('test' + searchAccount);
    if (searchAccount.length > 0) {
      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SEARCH_SUCCESS,
          searchAccount,
          'Account',
          null
        )
      );
    } else {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Account', null)
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(400, LOGIN_MESSAGE.FAILED, [], 'Account', error)
    );
  }
}
