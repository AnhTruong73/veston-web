import { NextResponse } from 'next/server';

import { useRouter } from 'next/navigation';
import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function GET(req, { params }) {
  try {
    const returnProductDetailList = await prisma.product.findMany({
      select: {
        product_id: true,
        product_name: true,
        category: true,
        description: true,

        product_img: true,
        _count: true,
      },
      orderBy: [{ cre_dt: 'asc' }],
    });

    // const processedProductDetailList = await Promise.all(
    //   returnProductDetailList.map(async (product) => {
    //     const getProductRating = await prisma.feedbacks.aggregate({
    //       where: {
    //         product_id: product.product_id,
    //       },
    //       _avg: {
    //         rate: true,
    //       },
    //       _count: {
    //         rate: true,
    //       },
    //     });

    //     return {
    //       ...product,
    //       rating: getProductRating._avg.rate || 0,
    //       feedback_quantity: getProductRating._count.rate || 0,
    //     };
    //   })
    // );
    var processedProductDetailList = [];
    for (let i = 0; i < returnProductDetailList.length; i++) {
      const getProductRating = await prisma.feedbacks.aggregate({
        where: {
          product_id: returnProductDetailList[i].product_id,
        },
        _avg: {
          rate: true,
        },
        _count: {
          rate: true,
        },
      });
      if (getProductRating) {
        processedProductDetailList.push({
          ...returnProductDetailList[i],
          rating: getProductRating._avg.rate || 0,
          feedback_quantity: getProductRating._count.rate || 0,
        });
      }
    }

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
