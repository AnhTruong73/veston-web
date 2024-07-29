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
      const { paramsSearch } = body;

      if (paramsSearch.product_id) {
        searchOtp.push({ product_id: paramsSearch.product_id });
      } else {
        return NextResponse.json(
          ResponseObject(
            0,
            LOGIN_MESSAGE.MISSING_PARAMETER,
            [],
            'Product',
            null
          )
        );
      }
    }
    var processedProductDetail = [];
    const tokenInfor = CheckSessionToken(sessionToken);

    if (tokenInfor) {
      const returnProductDetail = await prisma.product.findMany({
        where: {
          AND: searchOtp,
        },
        select: {
          product_id: true,
          product_name: true,
          price: true,
          category: true,
          description: true,
          ProductDetail: {
            include: {
              costcode: true,
            },
          },
          product_img: true,
        },
        orderBy: [{ cre_dt: 'asc' }],
      });
      const getStoreProductPrice = await prisma.storeProduct.findFirst({
        where: {
          AND: {
            branchId: body.branchId,
            productId: body.paramsSearch.product_id,
          },
        },
        select: {
          price: true,
        },
      });
      processedProductDetail = returnProductDetail.map((product) => ({
        ...product,
        storeProductPrice: getStoreProductPrice
          ? getStoreProductPrice.price
          : 0,
      }));
    }
    if (processedProductDetail.length == 0) {
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.SEARCH_FAILED, [], 'Product', null)
      );
    }
    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        processedProductDetail,
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
