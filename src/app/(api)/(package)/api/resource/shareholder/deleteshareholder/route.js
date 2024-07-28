import { NextResponse } from 'next/server';
export const maxDuration = 60;
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import CheckSessionToken from '../../account/CheckSessionToken';

export async function POST(req) {
  try {
    const body = await req.json();
    const sessionToken = req.cookies.get('token')?.value;

    var listParam = Object.keys(body ?? {}).map((key) => body[key]);
    // X
    const tokenInfor = CheckSessionToken(sessionToken);
    // console.log(CheckSessionToken(sessionToken));
    if (tokenInfor) {
      if (listParam.length > 0) {
        const rstShareholder = await prisma.$transaction(async (tx) => {
          const listShareholder = await tx.shareholder.updateMany({
            where: {
              shareholder_id: { in: listParam },
            },
            data: {
              upd_usr_id: tokenInfor.usr_id,
              del_yn: 'Y',
            },
          });
          console.log(listParam);
          const listAccount = await tx.account.updateMany({
            where: {
              usr_id: { in: listParam },
            },
            data: {
              upd_usr_id: tokenInfor.usr_id,
              del_yn: 'Y',
            },
          });
          return listShareholder;
        });
        console.log(rstShareholder);
        if (rstShareholder) {
          return NextResponse.json(
            ResponseObject(
              1,
              LOGIN_MESSAGE.DELETE_SUCESS,
              [],
              'Shareholder',
              rstShareholder
            )
          );
        }
      } else {
        return NextResponse.json(
          ResponseObject(
            0,
            LOGIN_MESSAGE.MISSING_PARAMETER,
            [],
            'Shareholder',
            null
          )
        );
      }
    } else {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.INVALID_TOKEN, [], 'Shareholder', null)
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'error', null)
    );
  }
}
