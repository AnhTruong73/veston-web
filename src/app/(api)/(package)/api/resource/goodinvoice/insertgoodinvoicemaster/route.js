import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const JWT_SECRET = process.env.SECRET_KET;
    const jwt = require('jsonwebtoken');
    const sessionToken = req.cookies.get('token')?.value;
    if (sessionToken) {
      const userInfor = jwt.decode(sessionToken, JWT_SECRET).id;
      const body = await req.json();
      // console.log(body);
      var searchOtp = [];
      const {
        cre_id,
        branch_id,
        inv_id,
        issue_dt,
        provider_nm,
        provider_phone,
        provider_representative,
        provider_address,
        total_amt,
        status,
      } = body;
      if (branch_id) {
        searchOtp.push({ branch_id: { equals: branch_id } });
      }
      if (inv_id) {
        searchOtp.push({ inv_id: { equals: inv_id } });
      }

      const searchInvoice = await prisma.goodsInvoiceMaster.findMany({
        where: {
          AND: searchOtp,
        },
        select: {
          branch_id: true,
        },
        orderBy: [{ cre_dt: 'asc' }],
      });

      if (searchInvoice.length == 0) {
        var insertInvoiceMasterSuccess = {};
        await prisma.$transaction(async (tx) => {
          const insertInvoiceMaster = await tx.goodsInvoiceMaster.create({
            data: {
              branch_id: branch_id,
              inv_id: inv_id,
              issue_dt: issue_dt,
              provider_nm: provider_nm,
              provider_phone: provider_phone,
              provider_representative: provider_representative,
              provider_address: provider_address,
              total_amt: total_amt * 1,
              status: status,
              cre_usr_id: userInfor.usr_id,
              upd_usr_id: userInfor.usr_id,
            },
          });
          insertInvoiceMasterSuccess = insertInvoiceMaster;
        });
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SAVE_SUCCESS,
            [],
            'Good Invoice Master',
            insertInvoiceMasterSuccess
          )
        );
      } else {
        return NextResponse.json(
          ResponseObject(
            0,
            LOGIN_MESSAGE.EXISTING_DATA,
            [],
            'Good Invoice Master',
            {}
          )
        );
      }
      // console.log(searchInvoice);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Good Invoice Master', error)
    );
  }
}
