import { NextResponse } from 'next/server';
export const maxDuration = 60;

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { paramsAdd, goodInvoiceMaster } = body;
    const transactionTest = await prisma.$transaction(async (tx) => {
      const JWT_SECRET = process.env.SECRET_KET;
      const jwt = require('jsonwebtoken');
      const sessionToken = req.cookies.get('token')?.value;
      if (sessionToken) {
        const userInfor = jwt.decode(sessionToken, JWT_SECRET).id;
        const mergeCostCode = await tx.costcode.upsert({
          where: { cost_cd: paramsAdd.cost_cd },
          update: {
            // cost_nm: paramsAdd.costcode.cost_nm,
            // cost_color: paramsAdd.costcode.cost_color,
            // cost_type: paramsAdd.costcode.cost_type,
            // cost_uom: paramsAdd.costcode.cost_uom,
            // upd_usr_id: userInfor.usr_id,
          },
          create: {
            cost_cd: paramsAdd.costcode.cost_cd,
            cost_nm: paramsAdd.costcode.cost_nm,
            cost_color: paramsAdd.costcode.cost_color,
            cost_type: paramsAdd.costcode.cost_type,
            cost_uom: paramsAdd.costcode.cost_uom,
            cre_usr_id: userInfor.usr_id,
            upd_usr_id: userInfor.usr_id,
          },
        });

        const mergeGoodInvoiceDetail = await tx.goodsInvoiceDetail.upsert({
          where: {
            branch_id_inv_id_cost_cd: {
              branch_id: goodInvoiceMaster.branch_id,
              inv_id: goodInvoiceMaster.inv_id,
              cost_cd: paramsAdd.cost_cd,
            },
          },
          update: {
            quantity: paramsAdd.quantity * 1,
            unit_amount: paramsAdd.unit_amount * 1,
            discount: paramsAdd.discount * 1,
            tax: paramsAdd.tax * 1,

            total_amt:
              (((paramsAdd.quantity *
                paramsAdd.unit_amount *
                (100 - paramsAdd.discount)) /
                100) *
                (100 + paramsAdd.tax)) /
              100,
            upd_usr_id: userInfor.usr_id,
          },
          create: {
            branch_id: goodInvoiceMaster.branch_id,
            inv_id: goodInvoiceMaster.inv_id,
            cost_cd: paramsAdd.cost_cd,
            quantity: paramsAdd.quantity * 1,
            unit_amount: paramsAdd.unit_amount * 1,
            discount: paramsAdd.discount * 1,
            tax: paramsAdd.tax * 1,
            total_amt:
              (((paramsAdd.quantity *
                paramsAdd.unit_amount *
                (100 - paramsAdd.discount)) /
                100) *
                (100 + paramsAdd.tax)) /
              100,
            cre_usr_id: userInfor.usr_id,
            upd_usr_id: userInfor.usr_id,
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
    console.log(transactionTest);
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
