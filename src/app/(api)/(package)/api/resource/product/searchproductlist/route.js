import { NextResponse } from 'next/server';
export const maxDuration = 300;

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '../../responseObject';
import CheckSessionToken from '../../account/CheckSessionToken';

export async function POST(req) {
  try {
    const body = await req.json();

    const sessionToken = req.cookies.get('token')?.value;
    const transactionTest = await prisma.$transaction(async (tx) => {
      var searchOtp = [];
      if (Object.keys(body).length > 0) {
        const { product_id, product_name } = body;

        if (product_id) {
          searchOtp.push({ product_id: { equals: product_id } });
        }
        if (product_name) {
          searchOtp.push({ product_name: { contains: product_name } });
        }
      }
      const tokenInfor = CheckSessionToken(sessionToken);
      if (tokenInfor) {
        const returnProductDetailList = await tx.product.findMany({
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
        const processedProductDetailList = returnProductDetailList.map(
          (product) => ({
            ...product,
            product_img: product.product_img
              ? product.product_img.split(';')[0]
              : '',
          })
        );
        return processedProductDetailList;
      }
    });
    console.log(transactionTest);
    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        transactionTest,
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
