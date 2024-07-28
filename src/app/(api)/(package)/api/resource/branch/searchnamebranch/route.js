import { NextResponse } from 'next/server';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();
    var searchOtp = [];
    if (Object.keys(body).length > 0) {
      console.log(body);
      const { branchId } = body;

      if (branchId) {
        searchOtp.push({ branch_id: { equals: branchId } });
      }

      const searchNameBranch = await prisma.branch.findMany({
        where: {
          AND: searchOtp,
        },
        select: {
          branch_nm: true,
        },
        distinct: ['branch_nm'],
        orderBy: [{ cre_dt: 'asc' }],
      });
      if (searchNameBranch.length > 0) {
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SEARCH_SUCCESS,
            searchNameBranch,
            'NameArea',
            null
          )
        );
      } else {
        return NextResponse.json(
          ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'NameBranch', null)
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Branch', null)
    );
  }
}
