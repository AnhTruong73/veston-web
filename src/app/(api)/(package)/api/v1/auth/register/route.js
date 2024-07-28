import prisma from '@/app/(api)/db/db';
import { NextResponse } from 'next/server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { LOGIN_MESSAGE } from '@/message';

export async function POST(req) {
  try {
    //input validation
    const userSchema = z
      .object({
        usrname: z.string().min(1, 'Yêu cầu tài khoản.').max(100),
        usr_email: z.string().min(1, 'Yêu cầu email.').email('Invalid email'),
        password: z
          .string()
          .min(1, 'Yêu cầu nhập mật khẩu.')
          .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.'),
        confirmPassword: z.string().min(1, 'Yêu cầu xác nhận lại mật khẩu.'),
        usr_name: z.string(),
        role: z.string(),
        position: z.string(),
        usr_id: z.string(),
        del_yn: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Mật khẩu xác thực không chính xác.',
      });

    //get data from Form
    const body = await req.json();
    //init data
    const { usrname, password, usr_email, usr_name, role, usr_id, del_yn } =
      userSchema.parse(body);

    const existingUser = await prisma.account.findFirst({
      where: {
        OR: [
          { usrname: { equals: usrname } },
          { usr_email: { equals: usr_email } },
        ],
      },
      select: {
        usrname: true,
        usr_email: true,
      },
    });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 16);
      await prisma.account.create({
        data: {
          usr_email: usr_email,
          usr_name: usr_name,
          usrname: usrname,
          password: hashedPassword,
          role: role,
          del_yn: del_yn,
          cre_usr_id: usr_id,
          upd_usr_id: usr_id,
        },
      });
      return NextResponse.json(
        {
          user: {
            usrname,
            password,
            usr_email,
            usr_name,
            role,
            usr_id,
            del_yn,
          },
          message: LOGIN_MESSAGE.REGISTER_SUCCESS,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { usrname: existingUser, message: LOGIN_MESSAGE.REGISTER_FAILED },
        { status: 409 }
      );
    }
  } catch (error) {
    console.log('Failed: ', error);
    return NextResponse.json({ succes: false, message: error });
  }
}
