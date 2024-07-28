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
        branch_id: z.string(),
        del_yn: z.string(),
        employee_id: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Mật khẩu xác thực không chính xác.',
      });

    //get data from Form
    const body = await req.json();
    //init data
    const {
      usrname,
      password,
      confirmPassword,
      usr_email,
      usr_name,
      role,
      usr_id,
      employee_id,
      branch_id,
      del_yn,
    } = userSchema.parse(body);

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

    const existingEmployee = await prisma.employee.findFirst({
      select: {
        employee_id: true,
      },
      orderBy: { cre_dt: 'desc' },
    });

    const existEmail = await prisma.employee.findFirst({
      where: {
        email: email,
      },
      select: {
        employee_id: true,
      },
    });

    var cre_emp = '';
    var empDate = moment(new Date()).format('YYYYMMDD');

    empDate = empDate.substring(2, 6);

    if (existingEmployee) {
      cre_emp = existingEmployee.employee_id.slice(4);
      cre_emp = (cre_emp * 1 + 1).toString().padStart(cre_emp.length, '0');
      cre_emp = empDate + cre_emp;
    } else {
      cre_emp = empDate + '01';
    }

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 16);
      console.log(hashedPassword);
      const creAccount = await prisma.account.create({
        data: {
          usr_email: usr_email,
          usr_name: usr_name,
          usrname: usrname,
          password: hashedPassword,
          role: role,
          branch_id: branch_id,
          del_yn: del_yn,
          cre_usr_id: cre_emp,
          upd_usr_id: cre_emp,
          usr_id: cre_emp,
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
            branch_id,
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
