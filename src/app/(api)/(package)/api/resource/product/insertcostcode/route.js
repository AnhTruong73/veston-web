import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import CheckSessionToken from '../../account/CheckSessionToken';

export async function POST(req) {
  try {
    const body = await req.json();
    const sessionToken = req.cookies.get('token')?.value;
    const { paramsAdd, productMaster } = body;
    const transactionTest = await prisma.$transaction(async (tx) => {
      const userInfor = CheckSessionToken(sessionToken);
      if (userInfor) {
        console.log({ paramsAdd, productMaster });
        const mergeProductDetail = await tx.productDetail.upsert({
          where: {
            product_id_product_detail_id: {
              product_id: productMaster.product_id,
              product_detail_id: paramsAdd.product_detail_id,
            },
          },
          update: {
            quantity: paramsAdd.quantity * 1,
            upd_usr_id: userInfor.usr_id,
          },
          create: {
            product_id: productMaster.product_id,
            product_detail_id: paramsAdd.product_detail_id,
            quantity: paramsAdd.quantity * 1,
            cre_usr_id: userInfor.usr_id,
            upd_usr_id: userInfor.usr_id,
          },
        });

        const returnProductDetailList = await tx.productDetail.findMany({
          where: {
            product_id: productMaster.product_id,
          },
          select: {
            product_id: true,
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
