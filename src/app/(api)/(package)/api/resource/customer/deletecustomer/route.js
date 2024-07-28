import { NextResponse } from 'next/server';
export const maxDuration = 300;
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import CheckSessionToken from '../../account/CheckSessionToken';

export async function POST(req) {
  try {
    const body = await req.json();
    const sessionToken = req.cookies.get('token')?.value;

    var listParam = Object.keys(body ?? {}).map((key) => body[key]);
    // console.log(listParam);

    const tokenInfor = CheckSessionToken(sessionToken);
    // console.log(CheckSessionToken(sessionToken));
    if (tokenInfor) {
      if (listParam.length > 0) {
        const rstCustomer = await prisma.$transaction(
          listParam.map((param) =>
            prisma.customer.update({
              where: {
                customer_id: param,
              },
              data: {
                upd_usr_id: tokenInfor.usr_id,
                del_yn: 'Y',
              },
            })
          )
        );
        if (rstCustomer) {
          return NextResponse.json(
            ResponseObject(
              1,
              LOGIN_MESSAGE.DELETE_SUCESS,
              [],
              'Customer',
              rstCustomer
            )
          );
        }
      } else {
        return NextResponse.json(
          ResponseObject(
            0,
            LOGIN_MESSAGE.MISSING_PARAMETER,
            [],
            'Customer',
            null
          )
        );
      }
    } else {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.INVALID_TOKEN, [], 'Customer', null)
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'error', null)
    );
  }
}
