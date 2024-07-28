import { NextResponse } from 'next/server';
export const maxDuration = 300;
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();
    var searchOtp = [];
    if (Object.keys(body).length > 0) {
      console.log(body);
      const { area_id } = body;

      if (area_id) {
        searchOtp.push({ area_id: { equals: area_id } });
      }

      const searchNameArea = await prisma.branch.findMany({
        where: {
          AND: searchOtp,
        },
        select: {
          area_nm: true,
        },
        distinct: ['area_nm'],
        orderBy: [{ cre_dt: 'asc' }],
      });
      if (searchNameArea.length > 0) {
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SEARCH_SUCCESS,
            searchNameArea,
            'NameArea',
            null
          )
        );
      } else {
        return NextResponse.json(
          ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'NameArea', null)
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
