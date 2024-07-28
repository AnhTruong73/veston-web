import { NextResponse } from 'next/server';
export const maxDuration = 300;
import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '../../resource/responseObject';

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const product_name = searchParams.get('product_name');
    const product_id = searchParams.get('product_id');

    let query = undefined;

    if (category) {
      query = { ...query, category };
    }

    if (product_name) {
      query = { ...query, product_name: { contains: product_name } };
    }

    if (product_id) {
      query = { ...query, product_id };
    }

    const returnProductDetailList = await prisma.product.findMany({
      where: query,
      select: {
        product_id: true,
        product_name: true,
        price: true,
        category: true,
        description: true,
        ProductDetail: true,

        product_img: true,
        _count: true,
      },
      orderBy: [{ cre_dt: 'asc' }],
    });

    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        returnProductDetailList,
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
