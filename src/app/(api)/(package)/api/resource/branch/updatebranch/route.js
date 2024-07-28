import { NextResponse } from 'next/server';
export const maxDuration = 300;
import * as z from 'zod';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const userSchema = z.object({
      area_id: z.string(),
      //   area_nm: z.string(),
      branch_id: z.string(),
      //   branch_nm: z.string(),
      //   email: z.string(),
      //   phone: z.string(),
      //   address: z.string(),
      //   del_yn: z.string(),
      //   headoffice_yn: z.string(),
      //   upd_usr_id: z.string(),
    });
    const JWT_SECRET = process.env.SECRET_KET;
    const body = await req.json();
    const jwt = require('jsonwebtoken');
    const sessionToken = req.cookies.get('token')?.value;
    if (Object.keys(body).length > 0) {
      const {
        area_id,
        area_nm,
        branch_id,
        branch_nm,
        email,
        phone,
        address,
        headoffice_yn,
        upd_usr_id,
        del_yn,
      } = body;

      var searchOtp = {
        area_id,
        area_nm,
        branch_id,
        branch_nm,
        email,
        phone,
        address,
        headoffice_yn,
        upd_usr_id,
        del_yn,
      };

      const filteredObj = Object.fromEntries(
        Object.entries(searchOtp).filter(
          ([key, value]) =>
            value !== null && value !== undefined && value !== ''
        )
      );

      if (sessionToken) {
        const userInfor = jwt.decode(sessionToken, JWT_SECRET).id;
        filteredObj.upd_usr_id = userInfor.usr_id;
        if (area_id && branch_id) {
          const updateBranch = await prisma.branch.updateMany({
            where: {
              branch_id: { equals: branch_id },
              area_id: { equals: area_id },
            },
            data: filteredObj,
          });
          if (updateBranch.count > 0) {
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
              ResponseObject(
                1,
                LOGIN_MESSAGE.SAVE_SUCCESS,
                [],
                'Branch',
                rstBranch
              )
            );
          } else {
            return NextResponse.json(
              ResponseObject(0, LOGIN_MESSAGE.UPDATE_FAILED, [], 'Branch', null)
            );
          }
        } else {
          return NextResponse.json(
            ResponseObject(
              0,
              LOGIN_MESSAGE.MISSING_PRIMARY_KEY,
              [],
              'Branch',
              null
            )
          );
        }

        // console.log(updateBranch);
      } else {
        return NextResponse.json(
          ResponseObject(
            0,
            LOGIN_MESSAGE.MISSING_PARAMETER,
            [],
            'Branch',
            error
          )
        );
      }
    }
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.MISSING_PARAMETER, [], 'Branch', error)
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'error', null)
    );
  }
}
