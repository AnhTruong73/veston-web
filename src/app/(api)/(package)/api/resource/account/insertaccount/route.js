import prisma from '@/app/(api)/db/db';
import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';

export async function POST(req) {
  try {
    //get data from Form
    const body = await req.json();
    //init data
    const {
      usrname,
      password,
      email,
      usr_name,
      role,
      cre_usr_id,
      usr_id,
      del_yn = 'N',
    } = body;

    const existingUser = await prisma.account.findFirst({
      where: {
        OR: [
          { usrname: { equals: usrname } },
          { usr_email: { equals: email } },
        ],
      },
      select: {
        usrname: true,
        usr_email: true,
      },
    });
    console.log('Test' + usrname + email);
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 16);
      console.log(hashedPassword);
      const creAccount = await prisma.account.create({
        data: {
          usr_email: email,
          usr_name: usr_name,
          usrname: usrname,
          password: hashedPassword,
          role: role,
          del_yn: del_yn,
          cre_usr_id: cre_usr_id,
          upd_usr_id: cre_usr_id,
          usr_id: usr_id,
        },
      });
      if (creAccount) {
        return NextResponse.json(
          ResponseObject(1, LOGIN_MESSAGE.REGISTER_SUCCESS, [], 'Account', null)
        );
      }
    } else {
      console.log(existingUser.usrname == usrname);
      if (existingUser.usr_email == email) {
        return NextResponse.json(
          ResponseObject(0, 'Email nay da co Account!', [], 'Account', null)
        );
      }
      if (existingUser.usrname == usrname) {
        return NextResponse.json(
          ResponseObject(0, 'Username existed!', [], 'Account', null)
        );
      }
    }
  } catch (error) {
    console.log('Failed: ', error);
    return NextResponse.json(400, LOGIN_MESSAGE.FAILED, [], 'Account', error);
  }
}
