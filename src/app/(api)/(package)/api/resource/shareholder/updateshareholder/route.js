import { NextResponse } from 'next/server';
export const maxDuration = 60;
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();

    if (Object.keys(body).length > 0) {
      const {
        shareholder_id,
        shareholder_nm,
        birthday,
        gender,
        address,
        phone,
        email,
        share_value,
      } = body;

      const salShare = parseInt(share_value, 10);

      const CheckShareValue = await prisma.shareholder.aggregate({
        _sum: {
          share_value: true,
        },
        where: {
          del_yn: 'N',
          NOT: {
            shareholder_id: shareholder_id,
          },
        },
      });
      if (CheckShareValue._sum.share_value + salShare <= 100) {
        const updateShare = await prisma.shareholder.update({
          where: {
            shareholder_id: shareholder_id,
          },
          data: {
            shareholder_nm: shareholder_nm,
            birthday: birthday,
            gender: gender,
            address: address,
            phone: phone,
            email: email,
            share_value: salShare,
          },
        });
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SAVE_SUCCESS,
            updateShare,
            'Shareholder',
            null
          )
        );
      } else {
        if (CheckShareValue._sum.share_value + salShare > 100) {
          return NextResponse.json(
            ResponseObject(
              0,
              'Share value must less than or equal to ' +
                (100 - CheckShareValue._sum.share_value) +
                '%',
              CheckShareValue,
              'Shareholder',
              body
            )
          );
        } else {
          return NextResponse.json(
            ResponseObject(
              0,
              LOGIN_MESSAGE.UPDATE_FAILED,
              [],
              'Shareholder',
              null
            )
          );
        }
      }
    }
    // if(checkEmp.length > 0 ){
    //
  } catch (error) {
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Shareholder', error)
    );
  }
}
