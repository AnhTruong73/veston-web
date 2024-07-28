import { NextResponse } from 'next/server';
export const maxDuration = 300;
import bcrypt from 'bcryptjs';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import moment from 'moment';

export async function POST(req) {
  try {
    //input validation

    const body = await req.json();

    const {
      email,
      shareholder_nm,
      role = 'SUPPERADMIN',
      cre_usr_id,
      del_yn = 'N',
      share_value,
      birthday,
      address,
      phone,
    } = body;

    const shareInt = parseInt(share_value, 10);

    const CheckShareValue = await prisma.shareholder.aggregate({
      _sum: {
        share_value: true,
      },
      where: {
        del_yn: 'N',
      },
    });

    const existingShareholder = await prisma.shareholder.findFirst({
      select: {
        shareholder_id: true,
      },
      orderBy: { cre_dt: 'desc' },
    });

    const existEmail = await prisma.shareholder.findFirst({
      where: {
        email: email,
      },
      select: {
        shareholder_id: true,
      },
    });

    var cre_share = '';
    var shareDate = moment(new Date()).format('YYYYMMDD');

    shareDate = shareDate.substring(2, 6);

    if (existingShareholder) {
      cre_share = existingShareholder.shareholder_id.slice(6); // ''
      cre_share = (cre_share * 1 + 1)
        .toString()
        .padStart(cre_share.length, '0'); //1
      cre_share = 'SH' + shareDate + cre_share;
    } else {
      cre_share = 'SH' + shareDate + '01';
    }

    console.log(birthday);
    var datetimeBirth = new Date(birthday).toISOString();

    if (!existEmail && CheckShareValue._sum.share_value + shareInt <= 100) {
      const insertShareholder = await prisma.shareholder.create({
        data: {
          shareholder_id: cre_share,
          shareholder_nm: shareholder_nm,
          email: email,
          share_value: shareInt,
          birthday: datetimeBirth,
          del_yn: 'N',
          gender: 'MALE',
          address: address,
          phone: phone,
          cre_usr_id: cre_usr_id,
          upd_usr_id: cre_usr_id,
        },
      });
      return NextResponse.json(
        ResponseObject(
          1,
          LOGIN_MESSAGE.SAVE_SUCCESS,
          insertShareholder,
          'Shareholder',
          body
        )
      );
    } else {
      if (CheckShareValue._sum.share_value + shareInt > 100) {
        return NextResponse.json(
          ResponseObject(
            0,
            'Share value must less than or equal to ' +
              (100 - CheckShareValue._sum.share_value) +
              '%',
            existEmail,
            'Shareholder',
            body
          )
        );
      } else {
        return NextResponse.json(
          ResponseObject(
            0,
            'Email or Username Existing!',
            existEmail,
            'Shareholder',
            body
          )
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Shareholder', error)
    );
  }
}
