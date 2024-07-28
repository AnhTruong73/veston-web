import { LOGIN_MESSAGE } from '@/message';
import { NextResponse } from 'next/server';
export const maxDuration = 300;
import ResponseObject from '../../responseObject';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import prisma from '@/app/(api)/db/db';
import { storeImageBase64 } from '@/utils/storeImageBase64';

export async function POST(req) {
  try {
    //input validation

    const body = await req.json();

    const {
      imgsrc,
      usrname,
      password,
      email,
      employee_nm,
      role = 'SUPPERADMIN',
      cre_usr_id,
      flagAcc,
      branch_id,
      del_yn = 'N',
      salary,
      birthday,
      gender,
      address,
      position,
      phone,
    } = body;
    const salInt = parseInt(salary, 10);

    const imgPath = storeImageBase64(imgsrc, 'employees');

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

    var datetimeBirth = new Date(birthday).toISOString();
    console.log(birthday);
    if (!existEmail) {
      const insertEmployee = await prisma.employee.create({
        data: {
          imgsrc: imgPath,
          employee_id: cre_emp,
          employee_nm: employee_nm,
          email: email,
          position: position,
          salary: salInt,
          birthday: datetimeBirth,
          del_yn: 'N',
          gender: gender,
          address: address,
          phone: phone,
          cre_usr_id: cre_usr_id,
          upd_usr_id: cre_usr_id,
          Branch: {
            connect: {
              branch_id: branch_id,
            },
          },
        },
      });

      if (flagAcc == false) {
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

        if (!existingUser) {
          const hashedPassword = await bcrypt.hash(password, 16);
          const creAccount = await prisma.account.create({
            data: {
              usr_email: email,
              usr_name: employee_nm,
              usrname: usrname,
              password: hashedPassword,
              role: role,
              branch_id: branch_id,
              del_yn: del_yn,
              cre_usr_id: cre_usr_id,
              upd_usr_id: cre_usr_id,
              usr_id: cre_emp,
            },
          });

          return NextResponse.json(
            ResponseObject(
              1,
              LOGIN_MESSAGE.SAVE_SUCCESS,
              creAccount,
              'Account',
              body
            )
          );
        } else {
          return NextResponse.json(
            ResponseObject(
              0,
              'Email or Username Existing!',
              existingUser,
              'Account',
              body
            )
          );
        }
      }

      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SAVE_SUCCESS,
          insertEmployee,
          'Employee',
          body
        )
      );
    } else {
      return NextResponse.json(
        ResponseObject(
          0,
          'Email or Username Existing!',
          existEmail,
          'Employee',
          body
        )
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Employee', error)
    );
  }
}
