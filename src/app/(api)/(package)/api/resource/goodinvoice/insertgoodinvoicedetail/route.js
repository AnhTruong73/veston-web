import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import { v4 as uuidv4 } from 'uuid';
import CheckSessionToken from '../../account/CheckSessionToken';

export async function POST(req) {
  try {
    const body = await req.json();
    const sessionToken = req.cookies.get('token')?.value;
    const { paramsAdd, goodInvoiceMaster } = body;
    const userInfor = CheckSessionToken(sessionToken);
    console.log(
      paramsAdd.quantity +
        '*' +
        paramsAdd.unitAmount +
        '*' +
        (100 - paramsAdd.discount) / 100 +
        '*' +
        (100 + paramsAdd.tax) / 100
    );
    const transactionTest = await prisma.$transaction(async (tx) => {
      if (userInfor) {
        const costCodeId = uuidv4();
        const mergeCostCode = await tx.costcode.upsert({
          where: {
            id: paramsAdd.costCd ? paramsAdd.costCd : 'Create New',
          },
          update: {
            cost_nm: paramsAdd.costNm,
            cost_color: paramsAdd.costColor,
            cost_type: paramsAdd.costType,
            cost_uom: paramsAdd.costUom,
            upd_usr_id: userInfor.usr_id,
          },
          create: {
            id: costCodeId,
            cost_cd: costCodeId,
            cost_nm: paramsAdd.costNm,
            cost_color: paramsAdd.costColor,
            cost_type: paramsAdd.costType,
            cost_uom: paramsAdd.costUom,
            cre_usr_id: userInfor.usr_id,
            upd_usr_id: userInfor.usr_id,
          },
        });

        const mergeGoodInvoiceDetail = await tx.goodsInvoiceDetail.upsert({
          where: {
            branch_id_inv_id_cost_cd: {
              branch_id: goodInvoiceMaster.branch_id,
              inv_id: goodInvoiceMaster.inv_id,
              cost_cd: paramsAdd.costCd ? paramsAdd.costCd : 'Create New',
            },
          },
          update: {
            quantity: paramsAdd.quantity * 1,
            unit_amount: paramsAdd.unitAmount * 1,
            discount: paramsAdd.discount * 1,
            tax: paramsAdd.tax * 1,

            total_amt:
              paramsAdd.quantity *
              paramsAdd.unitAmount *
              ((100 - paramsAdd.discount) / 100) *
              ((100 + paramsAdd.tax * 1) / 100),
            upd_usr_id: userInfor.usr_id,
          },
          create: {
            branch_id: goodInvoiceMaster.branch_id,
            inv_id: goodInvoiceMaster.inv_id,
            cost_cd: costCodeId,
            quantity: paramsAdd.quantity * 1,
            unit_amount: paramsAdd.unitAmount * 1,
            discount: paramsAdd.discount * 1,
            tax: paramsAdd.tax * 1,
            total_amt:
              paramsAdd.quantity *
              paramsAdd.unitAmount *
              ((100 - paramsAdd.discount) / 100) *
              ((100 + paramsAdd.tax * 1) / 100),
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
