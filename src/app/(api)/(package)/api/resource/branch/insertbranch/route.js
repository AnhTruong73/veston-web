import { NextResponse } from 'next/server';

import * as z from 'zod';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    //input validation
    const userSchema = z.object({
      area_id: z.string().min(1),
      area_nm: z.string().min(1),
      branch_id: z.string().min(1),
      branch_nm: z.string().min(1),
      email: z.string().min(1),
      phone: z.string().min(1),
      address: z.string().min(1),
      headoffice_yn: z.string().min(1),
    });
    const JWT_SECRET = process.env.SECRET_KET;
    const body = await req.json();
    const jwt = require('jsonwebtoken');
    const sessionToken = req.cookies.get('token')?.value;
    if (sessionToken) {
      const userInfor = jwt.decode(sessionToken, JWT_SECRET).id;
      console.log(userInfor);
      const {
        area_id,
        area_nm,
        branch_id,
        branch_nm,
        email,
        phone,
        address,
        headoffice_yn,
      } = userSchema.parse(body);
      const existingBranch = await prisma.branch.findFirst({
        where: {
          AND: [
            { area_id: { equals: area_id } },
            { branch_id: { equals: branch_id } },
          ],
        },
        select: {
          area_id: true,
          branch_id: true,
        },
      });
      if (!existingBranch) {
        const creBranch = await prisma.branch.create({
          data: {
            area_id: area_id,
            area_nm: area_nm,
            branch_id: branch_id,
            branch_nm: branch_nm,
            email: email,
            phone: phone,
            address: address,
            headoffice_yn: headoffice_yn,
            cre_usr_id: userInfor.usr_id,
            upd_usr_id: userInfor.usr_id,
            del_yn: 'N',
          },
        });

        const rstBranch = await prisma.branch.findFirst({
          where: {
            AND: [
              { area_id: { equals: area_id } },
              { branch_id: { equals: branch_id } },
            ],
          },
          select: {
            branch_id: true,
            branch_nm: true,
            phone: true,
            email: true,
            address: true,
            area_id: true,
            area_nm: true,
            headoffice_yn: true,
            cre_usr_id: true,
            cre_dt: true,
            upd_usr_id: true,
            upd_dt: true,
          },
        });
        return NextResponse.json(
          ResponseObject(1, LOGIN_MESSAGE.SAVE_SUCCESS, [], 'Branch', rstBranch)
        );
      }
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.EXISTING_DATA, [], 'Branch', null)
      );
    }
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.EXISTING_DATA, [], 'Branch', null)
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(2, LOGIN_MESSAGE.FAILED, [], 'Branch', null)
    );
  }
}

function generateRandomString(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
