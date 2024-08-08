import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '../../responseObject';
import CheckSessionToken from '../../account/CheckSessionToken';

export async function POST(req) {
  try {
    const body = await req.json();

    const sessionToken = req.cookies.get('token')?.value;

    var searchOtp = [];
    if (Object.keys(body).length > 0) {
      const { product_id_otp, product_name_otp } = body;
      console.log(body);
      if (product_id_otp) {
        searchOtp.push({ product_id: { equals: product_id_otp } });
      }
      if (product_name_otp) {
        searchOtp.push({ product_name: { contains: product_name_otp } });
      }
    }
    const tokenInfor = CheckSessionToken(sessionToken);
    var processedProductDetailList = [];
    if (tokenInfor) {
      const returnProductDetailList = await prisma.product.findMany({
        where: {
          AND: searchOtp,
        },
        select: {
          product_id: true,
          product_name: true,
          price: true,
          category: true,
          description: true,
          ProductDetail: true,
          product_img: true,
        },
        orderBy: [{ cre_dt: 'asc' }],
      });
      processedProductDetailList = returnProductDetailList.map((product) => ({
        ...product,
        product_img:
          product.product_img.length > 0 ? product.product_img[0].img_src : '',
      }));
    }
    if (processedProductDetailList.length < 1) {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Product', null)
      );
    }
    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        processedProductDetailList,
        'Product',
        null
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Good Invoice Master', error)
    );
  }
}
