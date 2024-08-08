import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import CheckSessionToken from '../../account/CheckSessionToken';

export async function POST(req) {
  try {
    const body = await req.json();
    const sessionToken = req.cookies.get('token')?.value;

    var listParam = Object.keys(body ?? {}).map((key) => body[key]);

    const tokenInfor = CheckSessionToken(sessionToken);
    if (tokenInfor) {
      if (listParam.length > 0) {
        const rstGoodsInv = await prisma.$transaction(async (tx) => {
          for (var i = 0; i < listParam.length; i++) {
            await tx.goodsInvoiceMaster.update({
              where: {
                branch_id_inv_id: {
                  branch_id: listParam[i].branch_id,
                  inv_id: listParam[i].inv_id,
                },
              },
              data: {
                upd_usr_id: tokenInfor.usr_id,
                status: 'REJECT',
              },
            });
          }
          return true;
        });

        if (rstGoodsInv) {
          return NextResponse.json(
            ResponseObject(
              1,
              LOGIN_MESSAGE.REJECT_SUCCESS,
              [],
              'GoodsInvoiceMaster',
              null
            )
          );
        }
      } else {
        return NextResponse.json(
          ResponseObject(
            0,
            LOGIN_MESSAGE.MISSING_PARAMETER,
            [],
            'GoodsInvoiceMaster',
            null
          )
        );
      }
    } else {
      return NextResponse.json(
        ResponseObject(
          0,
          LOGIN_MESSAGE.INVALID_TOKEN,
          [],
          'GoodsInvoiceMaster',
          null
        )
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'error', null)
    );
  }
}
