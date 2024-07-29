import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import CheckSessionToken from '../../account/CheckSessionToken';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);

    const { selecteds, goodInvoiceMaster } = body;
    const sessionToken = req.cookies.get('token')?.value;
    const transactionTest = await prisma.$transaction(async (tx) => {
      const tokenInfor = CheckSessionToken(sessionToken);
      if (tokenInfor) {
        const deleteGoodInvoiceDetail = await tx.goodsInvoiceDetail.deleteMany({
          where: {
            branch_id: goodInvoiceMaster.branch_id,
            inv_id: goodInvoiceMaster.inv_id,
            cost_cd: { in: selecteds },
          },
        });
        const returnGoodInvoiceDetailList =
          await tx.goodsInvoiceDetail.findMany({
            where: {
              branch_id: goodInvoiceMaster.branch_id,
              inv_id: goodInvoiceMaster.inv_id,
            },
            select: {
              branch_id: true,
              inv_id: true,
              cost_cd: true,
              quantity: true,
              unit_amount: true,
              discount: true,
              tax: true,
              total_amt: true,
              cre_usr_id: true,
              cre_dt: true,
              upd_usr_id: true,
              upd_dt: true,
              costcode: true,
            },
            orderBy: [{ cre_dt: 'asc' }],
          });
        return returnGoodInvoiceDetailList;
      }
    });
    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SAVE_SUCCESS,
        transactionTest,
        'Good Invoice Detail',
        null
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Good Invoice Master', error)
    );
  }
}
