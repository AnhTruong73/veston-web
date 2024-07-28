import { NextResponse } from 'next/server';
export const maxDuration = 300;

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function GET(req, { params }) {
  console.log(params);
  const productId_areaId = params.product_id.split('&');
  const productId = productId_areaId[0];
  const areaId = productId_areaId[1];
  try {
    const areaArray = await prisma.branch.findMany({
      where: {
        area_id: areaId,
      },
      select: {
        branch_id: true,
        branch_nm: true,
      },
      distinct: 'branch_id',
    });

    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        areaArray,
        'CLIENT API',
        null
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'CLIENT API', error)
    );
  }
}
