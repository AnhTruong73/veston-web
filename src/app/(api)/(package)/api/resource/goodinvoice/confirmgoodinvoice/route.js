import { NextResponse } from 'next/server';
export const maxDuration = 60;

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { goodInvoiceMaster } = body;
    const transactionTest = await prisma.$transaction(async (tx) => {
      const JWT_SECRET = process.env.SECRET_KET;
      const jwt = require('jsonwebtoken');
      const sessionToken = req.cookies.get('token')?.value;
      if (sessionToken) {
        const userInfor = jwt.decode(sessionToken, JWT_SECRET).id;

        const mergeGoodInvoiceDetail = await tx.goodsInvoiceMaster.update({
          where: {
            branch_id_inv_id: {
              branch_id: goodInvoiceMaster.branch_id,
              inv_id: goodInvoiceMaster.inv_id,
            },
          },

          data: {
            status: 'APPROVE',
            upd_usr_id: userInfor.usr_id,
          },
        });

        const findCostCodeList = await tx.goodsInvoiceDetail.findMany({
          where: {
            AND: {
              branch_id: goodInvoiceMaster.branch_id,
              inv_id: goodInvoiceMaster.inv_id,
            },
          },
          select: {
            cost_cd: true,
            quantity: true,
          },
        });

        for (const costCode of findCostCodeList) {
          await tx.warehouseDetail.upsert({
            where: {
              branch_id_cost_cd: {
                branch_id: goodInvoiceMaster.branch_id,
                cost_cd: costCode.cost_cd,
              },
            },
            update: {
              quantity: { increment: costCode.quantity },
              upd_usr_id: userInfor.usr_id,
            },
            create: {
              branch_id: goodInvoiceMaster.branch_id,
              cost_cd: costCode.cost_cd,
              quantity: costCode.quantity,
              cre_usr_id: userInfor.usr_id,
              upd_usr_id: userInfor.usr_id,
            },
          });
        }

        const returnGoodInvoiceMaster =
          await prisma.goodsInvoiceMaster.findMany({
            where: {
              AND: {
                branch_id: goodInvoiceMaster.branch_id,
                inv_id: goodInvoiceMaster.inv_id,
              },
            },
            select: {
              branch_id: true,
              branch: true,
              goodsInvoiceDetail: { include: { costcode: true } },
              inv_id: true,
              issue_dt: true,
              provider_address: true,
              provider_nm: true,
              provider_phone: true,
              provider_representative: true,
              status: true,
              total_amt: true,
              cre_usr_id: true,
              cre_dt: true,
              upd_usr_id: true,
              upd_dt: true,
            },
            orderBy: [{ cre_dt: 'asc' }],
          });
        return returnGoodInvoiceMaster;
      }
    });
    console.log(transactionTest);
    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.CONFIRM_SUCCESS,
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
