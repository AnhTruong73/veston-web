import { NextResponse } from 'next/server';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function GET() {
  try {
    //input validation
    // const userSchema = z.object({
    //   area_id_otp: z.string(),
    //   area_nm_otp: z.string(),
    //   branch_id_otp: z.string(),
    //   branch_nm_otp: z.string(),
    //   email_otp: z.string(),
    //   phone_otp: z.string(),
    //   address_otp: z.string(),
    //   del_yn_otp: z.string(),
    // });

    const searchArea = await prisma.branch.findMany({
      distinct: ['area_id'],
      select: {
        area_id: true,
        area_nm: true,
      },
    });
    if (searchArea.length > 0) {
      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SEARCH_SUCCESS,
          searchArea,
          'Area',
          null
        )
      );
    } else {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Area', null)
      );
    }
  } catch (error) {
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Area', null)
    );
  }
}
