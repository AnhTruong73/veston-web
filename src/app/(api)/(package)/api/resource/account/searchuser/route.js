import { NextResponse } from 'next/server';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();
    if (Object.keys(body).length > 0) {
      const { shareholder_id, employee_id } = body;
      if (shareholder_id) {
        console.log(shareholder_id);
        const searchSh = await prisma.shareholder.findFirst({
          where: {
            AND: { shareholder_id: { equals: shareholder_id } },
          },
          select: {
            shareholder_nm: true,
            email: true,
          },
        });
        if (searchSh) {
          return NextResponse.json(
            ResponseObject(
              1,
              LOGIN_MESSAGE.SEARCH_SUCCESS,
              searchSh,
              'Shareholder',
              null
            )
          );
        } else {
          return NextResponse.json(
            ResponseObject(
              0,
              LOGIN_MESSAGE.SEARCH_FAILED,
              [],
              'Shareholder',
              null
            )
          );
        }
      }
      if (employee_id) {
        console.log(employee_id);
        const searchEmp = await prisma.employee.findFirst({
          where: {
            AND: { employee_id: { equals: employee_id } },
          },
          select: {
            employee_nm: true,
            email: true,
          },
        });
        if (searchEmp) {
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
      }
    }
  } catch (error) {
    console.log(error);
  }
}
