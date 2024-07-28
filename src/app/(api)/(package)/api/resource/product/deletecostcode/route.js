import { NextResponse } from 'next/server';
export const maxDuration = 60;

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import CheckSessionToken from '../../account/CheckSessionToken';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);

    const { selecteds, productMaster } = body;
    const sessionToken = req.cookies.get('token')?.value;
    const transactionTest = await prisma.$transaction(async (tx) => {
      const tokenInfor = CheckSessionToken(sessionToken);
      if (tokenInfor) {
        const deleteProductDetail = await tx.productDetail.deleteMany({
          where: {
            product_id: productMaster.product_id,
            product_detail_id: { in: selecteds },
          },
        });
        const returnProductDetailList = await tx.productDetail.findMany({
          where: {
            product_id: productMaster.product_id,
          },
          select: {
            product_detail_id: true,
            quantity: true,
            cre_usr_id: true,
            cre_dt: true,
            upd_usr_id: true,
            upd_dt: true,
            costcode: true,
          },
          orderBy: [{ cre_dt: 'asc' }],
        });
        return returnProductDetailList;
      }
    });
    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SAVE_SUCCESS,
        transactionTest,
        'Product Detail',
        null
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Product Detail', error)
    );
  }
}
