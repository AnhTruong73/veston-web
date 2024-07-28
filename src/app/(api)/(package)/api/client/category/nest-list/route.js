import { NextResponse } from 'next/server';
export const maxDuration = 60;

import { LOGIN_MESSAGE } from '@/message';
import prisma from '@/app/(api)/db/db';
import ResponseObject from '@/app/(api)/(package)/api/resource/responseObject';

export async function GET(req) {
  try {
    const categoryArray = await prisma.categories.findMany({
      select: {
        id: true,
        title: true,
        code: true,
        children: true,
      },
    });

    return NextResponse.json(
      ResponseObject(
        1,
        LOGIN_MESSAGE.SEARCH_SUCCESS,
        transformData(categoryArray),
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
const transformData = (data) => {
  return data.map((item) => ({
    category_id: item.id,
    title: item.title,
    code: item.code,
    children: item.children.map((child) => ({
      category_id: child.id,
      title: child.title,
    })),
  }));
};
