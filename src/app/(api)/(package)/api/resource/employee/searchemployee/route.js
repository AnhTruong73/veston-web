import { NextResponse } from 'next/server';
export const maxDuration = 300;
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();
    var searchOtp = [];
    var searchAc = [];

    if (Object.keys(body).length > 0) {
      const { employee_id_otp, branch_id_otp, employee_name_otp, del_yn_otp } =
        body;
      console.log(body);
      if (employee_id_otp) {
        searchOtp.push({ employee_id: { startsWith: employee_id_otp } });
        searchAc.push({ employee_id: { startsWith: employee_id_otp } });
      }
      if (del_yn_otp) {
        searchOtp.push({ del_yn: { equals: del_yn_otp } });
      }
      if (employee_name_otp) {
        searchOtp.push({ employee_nm: { startsWith: employee_name_otp } });
      }
      if (branch_id_otp) {
        searchOtp.push({ branchBranch_id: { equals: branch_id_otp } });
      }
    }

    const searchEmp = await prisma.employee.findMany({
      where: {
        AND: searchOtp,
      },
      select: {
        imgsrc: true,
        branchBranch_id: true,
        Branch: {
          select: {
            area_nm: true,
            branch_nm: true,
          },
        },
        employee_id: true,
        employee_nm: true,
        position: true,
        salary: true,
        birthday: true,
        del_yn: true,
        gender: true,
        email: true,
        address: true,
        phone: true,
        cre_usr_id: true,
        cre_dt: true,
        upd_usr_id: true,
        upd_dt: true,
      },
    });
    console.log('test' + searchEmp);
    if (searchEmp.length > 0) {
      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SEARCH_SUCCESS,
          searchEmp,
          'Employee',
          null
        )
      );
    } else {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Employee', null)
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Employee', error)
    );
  }
}
