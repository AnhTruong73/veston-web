import { NextResponse } from 'next/server';

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function GET(req, { params }) {
  console.log(params);
  try {
    const returnProductDetailList = await prisma.product.findMany({
      where: params,
      select: {
        product_id: true,
        product_name: true,
        price: true,
        category: true,
        description: true,

        product_img: true,
        _count: true,
      },
      orderBy: [{ cre_dt: 'asc' }],
    });
    const getProductRating = await prisma.feedbacks.aggregate({
      where: {
        product_id: params.product_id,
      },
      _avg: {
        rate: true,
      },
      _count: {
        rate: true,
      },
    });

    const getProductSales = await prisma.sewingticket.aggregate({
      where: {
        productId: params.product_id,
        Orders: {
          status: 'DONE',
        },
      },
      _count: {
        productId: true,
      },
    });

    const processedProductDetailList = returnProductDetailList.map(
      (product) => ({
        ...product,
        rating: getProductRating._avg.rate || 0,
        feedback_quantity: getProductRating._count.rate || 0,
        sold: getProductSales._count.productId || 0,
      })
    );

    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        processedProductDetailList,
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
