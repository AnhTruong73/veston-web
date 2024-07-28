import { NextResponse } from 'next/server';
export const maxDuration = 60;
import { useRouter } from 'next/navigation';
import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function GET(req, { params }) {
  try {
    const searchParam = params.productId;

    const returnFeedbackList = await prisma.feedbacks.findMany({
      where: { product_id: searchParam },
      select: {
        customer_id: true,
        product_id: true,
        rate: true,
        content: true,
        cre_dt: true,
        customer: true,
      },
      orderBy: [{ cre_dt: 'asc' }],
    });

    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        returnFeedbackList,
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
