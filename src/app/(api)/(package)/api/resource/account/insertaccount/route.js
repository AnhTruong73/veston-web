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

    const hashedPassword = await bcrypt.hash(password, 16);

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
        id: true,
      },
    });

    const upsertAccountUser = await prisma.account.upsert({
      where: {
        usr_id: usr_id,
        usrname: usrname,
        id: existingUser ? existingUser.id * 1 : 0,
      },
      update: {
        role: role,
        password: hashedPassword,
        upd_usr_id: cre_usr_id,
      },
      create: {
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

    if (upsertAccountUser) {
      return NextResponse.json(
        ResponseObject(1, LOGIN_MESSAGE.SAVE_SUCCESS, [], 'Account', null)
      );
    } else {
      return NextResponse.json();
    }
  } catch (error) {
    console.log('Failed: ', error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Account', null)
    );
  }
}
