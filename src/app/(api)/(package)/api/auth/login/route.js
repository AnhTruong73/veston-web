import { NextResponse } from 'next/server';
import prisma from '@/app/(api)/db/db';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
// import { getUserByName } from '@/app/(api)/(package)/services/user/user';
import { LOGIN_MESSAGE } from '@/message';

const jwt = require('jsonwebtoken');

export async function POST(req) {
  try {
    //input validation
    const userSchema = z.object({
      usrname: z.string().min(1),
      password: z.string().min(1),
    });

    //get data from Form
    const body = await req.json();

    //init data
    const { usrname, password } = userSchema.parse(body);

    //the query
    // const Users = await getUserByName({ usrname });
    const users = await prisma.account.findFirst({
      where: {
        usrname: { equals: usrname },
      },
      select: {
        usrname: true,
        password: true,
        usr_email: true,
        usr_name: true,
        role: true,
        id: true,
        del_yn: true,
        usr_id: true,
      },
    });
    var isCorrect = false;
    if (users) {
      var returnPwd = users.password;
      isCorrect = await bcrypt.compare(password, returnPwd);
      if (isCorrect) {
        delete users.password;
        const token = jwt.sign({ id: users }, process.env.SECRET_KET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        const personalProfile = await prisma.employee.findUnique({
          where: { employee_id: users.usr_id },
          select: {
            branchBranch_id: true,
            imgsrc: true,
            employee_id: true,
            employee_nm: true,
            position: true,
            salary: true,
            email: true,
            birthday: true,
            del_yn: true,
            gender: true,
            address: true,
            phone: true,
            Branch: true,
          },
        });
        users.personalProfile = personalProfile;
        return NextResponse.json(
          {
            status: 1,
            message: LOGIN_MESSAGE.LOGIN_SUCCESS,
            data: { user: users, token },
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { status: 0, message: LOGIN_MESSAGE.LOGIN_FAILED },
      { status: 200 }
    );
  } catch (error) {
    console.log('Failed: ', error);
    return NextResponse.json({ status: 0, message: LOGIN_MESSAGE.FAILED });
  }
}
