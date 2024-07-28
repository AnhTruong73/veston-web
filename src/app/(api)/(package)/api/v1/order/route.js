import { NextResponse } from 'next/server';
export const maxDuration = 300;
import prisma from '@/app/(api)/db/db';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
// import { getUserByName } from '@/app/(api)/(package)/services/user/user';
import { LOGIN_MESSAGE } from '@/message';

export async function POST(req) {
  try {
    const userSchema = z.object({
      height: z.number().min(1),
      weight: z.number().min(1),
      bust: z.number().min(1),
    });
    const body = await req.json();

    const { id } = userSchema.parse(body);

    const users = await prisma.account.findFirst({
      where: {
        id: { equals: id },
      },
      select: {
        usrname: true,
        usr_email: true,
        usr_name: true,
        role: true,
        id: true,
        del_yn: true,
        usr_id: true,
      },
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
        message: LOGIN_MESSAGE.SEARCH_SUCCESS,
        data: { user: users },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Failed: ', error);
    return NextResponse.json({
      status: 0,
      message: LOGIN_MESSAGE.SEARCH_FAILED,
    });
  }
}
