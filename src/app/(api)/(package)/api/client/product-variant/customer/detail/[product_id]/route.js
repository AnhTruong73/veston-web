import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function GET(req, { params }) {
  console.log(params);
  const productId_areaId_branchId = params.product_id.split('&');
  const productId = productId_areaId_branchId[0];
  const areaId = productId_areaId_branchId[1];
  const branchId = productId_areaId_branchId[2];
  try {
    const returnProductDetail = await prisma.product.findMany({
      where: {
        AND: {
          product_id: productId,
        },
      },
      select: {
        product_id: true,
        product_name: true,
        category: true,
        description: true,
        product_img: true,
      },
    });
    const getStoreProductPrice = await prisma.storeProduct.findFirst({
      where: {
        AND: {
          branchId: branchId,
          productId: productId,
        },
      },
      select: {
        price: true,
      },
    });

    const processedProductDetail = returnProductDetail.map((product) => ({
      ...product,
      price: getStoreProductPrice ? getStoreProductPrice.price : 0,
    }));

    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        processedProductDetail,
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
