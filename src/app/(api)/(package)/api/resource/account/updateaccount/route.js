import { NextResponse } from 'next/server';
import * as z from 'zod';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const body = await req.json();

    if (Object.keys(body).length > 0) {
      const { password, usrname } = body;

      const hashedPassword = await bcrypt.hash(password, 16);

      const updateAcc = await prisma.account.update({
        where: {
          usrname: usrname,
        },
        data: {
          password: hashedPassword,
        },
      });
      if (updateAcc) {
        return NextResponse.json(
          ResponseObject(
            1,
            'Đổi password thành công!',
            updateAcc,
            'Account',
            null
          )
        );
      } else {
        return NextResponse.json(
          ResponseObject(0, 'Đổi password thất bại!', [], 'Account', null)
        );
      }
    }
    // if(checkEmp.length > 0 ){
    //
  } catch (error) {
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Account', error)
    );
  }
}
