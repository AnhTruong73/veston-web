import { NextResponse } from 'next/server';
export const maxDuration = 300;

import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { costCd } = body;
    console.log(costCd);
    const returnProductDetailList = await prisma.costcode.findMany({
      where: {
        cost_cd: { equals: costCd },
      },
      select: {
        cost_cd: true,
        cost_nm: true,
        cost_color: true,
        cost_type: true,
        cost_uom: true,
      },
    });
    if (returnProductDetailList.length < 1) {
      return NextResponse.json(
        ResponseObject(
          0,
          LOGIN_MESSAGE.SEARCH_FAILED,
          [],
          'Product Detail',
          null
        )
      );
    }

    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        returnProductDetailList,
        'Product Detail',
        null
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Product Detail', error)
    );
  }
}
